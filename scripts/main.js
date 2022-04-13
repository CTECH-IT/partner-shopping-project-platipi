(function (window) {
    'use strict'

    const FORM_SELECTOR = '[data-shopping-order="form"]';
    const CHECKLIST_SELECTOR = '[data-shopping-order="checklist"]';



    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;

   let myTruck = new Truck('12345', new DataStore());
    let checkList = new CheckList(CHECKLIST_SELECTOR);

    window.myTruck = myTruck;

    let formHandler = new FormHandler(FORM_SELECTOR);

    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });

})(window);