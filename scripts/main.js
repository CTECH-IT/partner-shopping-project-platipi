(function (window) {
    'use strict'

    const FORM_SELECTOR = '[data-shopping-order="form"]';
    const CHECKLIST_SELECTOR = '[data-shopping-order="checklist"]';



    let App = window.App;
    let Cart = App.Cart;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;

    let myCart = new Cart('12345', new DataStore());
    let checkList = new CheckList(CHECKLIST_SELECTOR);

    window.myCart = myCart;

   let formHandler = new FormHandler(FORM_SELECTOR);

   checkList.addClickHandler(myCart.deliverOrder.bind(myCart));

   formHandler.addSubmitHandler(myCart.createOrder.bind(myCart)); {
        myCart.createOrder.call(myCart, data);
        checkList.addRow.call(checkList, data);
    };

})(window);