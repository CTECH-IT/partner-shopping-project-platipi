(function (window) {
    'use strict';

    let App = window.App || {};

    function Cart(cartId, db) {
        this.cartId = cartId;
        this.db = db;
    }

    Cart.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    }

    Cart.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    }

    Cart.prototype.printOrder = function() {

        //get all (keys), emails
        let customerIdArray = Object.keys(this.db.getAll());

        console.log('Cart #' + this.cartId + ' has pending orders:');
        // look through emaisl and get associated order
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    }

    App.Cart = Cart;
    window.App = App;
}) (window);