(function (window) {
    'use strict';
    let App = window.App || {};
    function DataStore() {
        this.data = {};
    }
    DataStore.prototype.add = function (key, val) {
        this.data[key] = val;
    }

    App.DataStore = DataStore;
    window.App = App;
})(window);