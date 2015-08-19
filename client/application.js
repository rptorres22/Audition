// client/application.js
var mainApplicationModuleName = 'audition';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'team']);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});