// client/test/controllers/test.client.controller.js

// Create the 'test' controller
angular.module('test').controller('TestController', 
	['$scope', '$routeParams', '$location', 'TestService',

	function ($scope, $routeParams, $location, TestService) {

		// Create a new controller method for retrieving a list of test
		$scope.find = function () {
			// Use the TestService 'query' method to send an appropriate GET request
			$scope.tests = new TestService.query();
		};

		// Create a new controller method for creating a new test
		$scope.create = function () {

		};
	}

]);