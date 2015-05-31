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


		// Create a new controller method for creating new articles
		$scope.create = function () {
			
			console.log(this.usermessage);

			// Use the form fields to create a new TestService $resource object
			var test = new TestService({
				//comes from message form field in $scope
				//this will get passed to req.body in the server's test controller
				message: this.usermessage
			});

			// use test resource $save() method to send the new test object
			// to the corresponding RESTful endpoint along with two callbacks.
			// first callback will be executed when the server responds with a success (200) status code
			//	then will use the $location service to navigate to the route
			// second callback will be executed when the server responds with an error status code 
			test.$save(
				function (response) {
					$location.path('articles/' + response._id);
				}, 
				function (errorResponse) {
					$scope.error = errorResponse.data.message;
				}
			);

		};
	}

]);