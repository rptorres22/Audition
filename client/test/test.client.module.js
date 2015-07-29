// client/test/test.client.module.js
var mainApplicationModuleName = 'audition';

// Create the 'test' module
angular.module('test', []);

var mainApplicationModule = angular.module(mainApplicationModuleName,
    ['ngResource', 'ngRoute', 'test']);


// Configure the hashbang URLs using the $locationProvider services
/*
 This is to help search engine crawlers to mark the application
 as a single-page application.  That way, the search engine crawlers know
 your application is using AJAX to render new paths and can wait for the result
 before it leaves your page.
 To mark your app routes as single-page app routes, you will need to use a
 routing scheme called Hashbangs.  These are implemented like:
 http://localhost:3000/#!/example.
 AngularJS supports Hasbangs by using $locationProvider
 */
mainApplicationModule.config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);


// Manually bootstrap the AngularJS application
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});