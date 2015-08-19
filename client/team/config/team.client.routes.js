// client/team/config/team.client.routes.js

// Configure the 'team' module routes
angular.module('team').config(['$routeProvider',

    function ($routeProvider) {

        $routeProvider
            .when('/team/', {
                templateUrl: 'team/views/list-team.client.view.html'
            })
            .when('/team/create', {
                templateUrl: 'team/views/create-team.client.view.html'
            })
            .when('/team/:teamName/edit', {
                templateUrl: 'team/views/edit-team.client.view.html'
            });
        //.otherwise({
        //	redirectTo: '/'
        //});

    }

]);
