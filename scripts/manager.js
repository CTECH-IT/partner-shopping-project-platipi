

(function (window) {
    'use strict'

    const FORM_SELECTOR = '[data-shopping-order="form"]';
    const CHECKLIST_SELECTOR = '[data-shopping-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org:8080/json';
    let $ = window.jQuery;




    let App = window.App;
    let Cart = App.Cart;
    let DataStore = App.DataStore;
    //let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let RemoteDataStore = App.RemoteDataStore;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myCart = remoteDS
    let checkList = new CheckList(CHECKLIST_SELECTOR);

    window.myCart = myCart;

    

    RemoteDataStore.prototype.getAll = function (cb) {
        // make a "get" call to the server URL
        // pass in an anonymous function that calls the "cb" callback function
        $.get(serverUrl, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) {
        // make a get call to the server, but pass an email address
        // so that it returns just one order
        // then call the function "cb" on the response
        $.get(serverUrl + '?emailAddress=' + key, function (serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    };

    

   //let formHandler = new FormHandler(FORM_SELECTOR);

   //ScheckList.addClickHandler(myCart.deliverOrder.bind(myCart));

   RemoteDataStore(SERVER_URL);

})(window);