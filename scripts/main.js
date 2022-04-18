(function (window) {
    'use strict'

    const FORM_SELECTOR = '[data-shopping-order="form"]';
    const CHECKLIST_SELECTOR = '[data-shopping-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';



    let App = window.App;
    let Cart = App.Cart;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let RemoteDataStore = App.RemoteDataStore;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myCart = new Cart('12345', remoteDS);
    //let checkList = new CheckList(CHECKLIST_SELECTOR);

    window.myCart = myCart;

   let formHandler = new FormHandler(FORM_SELECTOR);

   //checkList.addClickHandler(myCart.deliverOrder.bind(myCart));

   formHandler.addSubmitHandler(function (data) {
        myCart.createOrder.call(myCart, data);
        //checkList.addRow.call(checkList, data);
    });

})(window);