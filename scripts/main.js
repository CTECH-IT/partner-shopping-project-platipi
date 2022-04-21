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
    

    window.myCart = myCart;

    // let checkList = new CheckList(CHECKLIST_SELECTOR);



   

   
  
    if (FormHandler !== undefined) {
        let formHandler = new FormHandler(FORM_SELECTOR);

        formHandler.addSubmitHandler(function (data) {
            myCart.createOrder.call(myCart, data);
        });    
    //} else if (CheckList !== undefined) {
    //    let checkList = new CheckList(CHECKLIST_SELECTOR);

    //    remoteDS.getAll((orders) => {
    //        for (let order of Object.values(orders)) {
    //            checkList.addRow(order);
    //        }
    //    })
    }

    //checkList.addClickHandler(remoteDS.remove.bind(remoteDS));

})(window);