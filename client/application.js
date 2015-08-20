// client/application.js
var mainApplicationModuleName = 'audition';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'user', 'team']);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});