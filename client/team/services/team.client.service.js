// client/test/services/test.client.service.js

// Create the 'test' service
angular.module('team').factory('TeamService', ['$resource',

    function ($resource) {
        return $resource('/api/team/:teamName', {
                teamId: '@id', teamName: '@teamName'
            }, {
                update: {method: 'PUT'},
                query: {method: 'GET', params: {}, isArray: true}
            }
        );

    }
]);