// client/test/services/test.client.service.js

// Create the 'test' service
angular.module('user').factory('Authentication', [
    function () {
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);