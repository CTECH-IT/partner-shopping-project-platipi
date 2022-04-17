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

(function (window) {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    // remove a row identified by an email address
    CheckList.prototype.removeRow = function (email) {
        this.$element
        .find('[value="' + email + '"]')
        .closest('[data-shopping-order="checkbox"]')
        .remove();
    };

    // when the checkbox is clicked, get the email address from the row
    // and then call the function (func) that is passed in with the email as a parameter
    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    // the method that adds a new row to the checklist
    CheckList.prototype.addRow = function (shoppingOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(shoppingOrder.emailAddress);
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(shoppingOrder);
        // Add the new row instance's $element propterty to the checklist
        this.$element.append(rowElement.$element);
    };

    // Each row is one outstanding order
    function Row(shoppingOrder) {
        let $div = $('<div></div>', {
            'data-shopping-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');

        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: shoppingOrder.emailAddress
        });

        $label.append($checkbox);
        //$label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    // Add the Checklist to the App namespace
    App.CheckList = CheckList;
    window.App = App;
})(window);

(function (window) {
    'use strict';
   
    let App = window.App || {};

    function DataStore() {
        //console.log('Running the DataStore function...')
        this.data = {};
    }

    DataStore.prototype.add = function (key, val) {
        this.data[key] = val;
    };

    DataStore.prototype.get = function (key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function () {
        return this.data;
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key];
    }

    App.DataStore = DataStore;
    window.App = App;

})(window);

(function (window) {
    'use strict';

    let App = window.App || {};
    let $ = window.jQuery;

    function FormHandler(selector) {
        //do
        if (!selector) {
            throw new Error('No selector provided!');
        }


    //find the "selector" and assign to this.formElement
    this.$formElement = $(selector);
    if (this.$formElement.length == 0) {
        throw new Error('Could not find element with selector: ' + selector);
    }
    }

    FormHandler.prototype.addSubmitHandler = function (func) {
        console.log('Setting the submit handler for the form...');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            let data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
                func(data);
            });
            console.log(data);
            func(data); //call function passed down in data from form

           // this.reset(); //reset form
            //this.elements[0].focus(); //focus on the first field
        });

        FormHandler.prototype.addInputHandler = function (func) {
            console.log('Setting input handler for form');
            this.$formElement.on('input', '[name="emailAddress"]', function (event) {
                let emailAddress = event.target.value;
                console.log(func(emailAddress));
                if (func(emailAddress) == true) {
                    event.target.setCustomValidity('');
                } else {
                    event.target.setCustomValidity(emailAddress + ' is not an authorized email address!');
                }
            });
        };
    }

    App.FormHandler = FormHandler;
    window.App = App;

    })(window); 

(function (window) {
        'use strict';
        var App = window.App || {};
        var $ = window.jQuery;
        function RemoteDataStore(url) {
            if (!url) {
                throw new Error('No remote URL supplied.');
            }
            this.serverUrl = url;
        }
    
        RemoteDataStore.prototype.add = function (key, val) {
            // Call jQuery's $.post method to send the value to the serverUrl
            // When the server responds, call an anonymous function with serverResponse
            $.post(this.serverUrl, val, function (serverResponse) {
                console.log(serverResponse);
            });
        };
    
        RemoteDataStore.prototype.getAll = function (cb) {
            // make a "get" call to the server URL
            // pass in an anonymous function that calls the "cb" callback function
            $.get(this.serverUrl, function (serverResponse) {
                console.log(serverResponse);
                cb(serverResponse);
            });
        };
    
        RemoteDataStore.prototype.get = function (key, cb) {
            // make a get call to the server, but pass an email address
            // so that it returns just one order
            // then call the function "cb" on the response
            $.get(this.serverUrl + '?emailAddress=' + key, function (serverResponse) {
                console.log(serverResponse);
                cb(serverResponse);
            });
        };
    
        RemoteDataStore.prototype.remove = function (key) {
            // call the server url using the ajax 'DELETE' command
            $.ajax(this.serverUrl + '?emailAddress=' + key, { type: 'DELETE' });
        };
    
        App.RemoteDataStore = RemoteDataStore;
        window.App = App;
    })(window); 
    
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
        let checkList = new CheckList(CHECKLIST_SELECTOR);
    
        window.myCart = myCart;
    
       let formHandler = new FormHandler(FORM_SELECTOR);
    
       checkList.addClickHandler(myCart.deliverOrder.bind(myCart));
    
       formHandler.addSubmitHandler(function (data) {
            myCart.createOrder.call(myCart, data);
            checkList.addRow.call(checkList, data);
        });
    
    })(window);