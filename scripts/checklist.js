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

        let description = shoppingOrder.order + ' ';

        if (shoppingOrder.aSock) {
            description += shoppingOrder.aSock + ' ';
        }
        if (shoppingOrder.aRock) {
            description += shoppingOrder.aLock + ' ';
        }
        if (shoppingOrder.aLock) {
            description += shoppingOrder.aLock + ' ';
        }
        
        description += ' (' + shoppingOrder.emailAddress + ')';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    // Add the Checklist to the App namespace
    App.CheckList = CheckList;
    window.App = App;
})(window);