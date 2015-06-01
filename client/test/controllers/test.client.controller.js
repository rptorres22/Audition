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


		// Create a new controller method for retrieving a single test
		// retreive a single test based on the TestId route parameter
		// 	which the function obtains directly from the URL
		// 	expects a single document
		$scope.findOne = function() {
			// Use the test 'get' method to send an appropriate GET request
			//console.log('i got here');
			$scope.test = TestService.get({
				testId: $routeParams.testId
			});
		};


		// Create a new controller method for creating new articles
		$scope.create = function () {
			
			//console.log(this.usermessage);

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
					//$location.path('/' + response._id);
					$location.path('/');
				}, 
				function (errorResponse) {
					$scope.error = errorResponse.data.message;
				}
			);

		};


		$scope.update = function () {
			// Use the test '$update' method to send an appropriate PUT request
			$scope.test.$update(
				function () {
					// If an article was updated successfully, redirect the user to the home page
					//$location.path('/' + $scope.test._id);
					$location.path('/');
				},
				function () {
					// Otherwise, present the user with the error message
					$scope.error = errorResponse.data.message;
				}
			);

		};


		// Create a new controller method for deleting a single test
		// First figure out whether the user is deleting a test from
		// 	a list or directly from the test view.  It will then use
		// 	the test's $remove() method to call the corresponding RESTful endpoint
		// 	if the user deleted the test from a list view, it will then remove the 
		// 	deleted object from the tests collection; otherwise, it will
		// 	delete the test then redirect the user back to the list view
		$scope.delete = function (test) {

			// If a test was sent to the method, delete it
			if (test) {
				// Use the test '$remove' method to delete the test
				test.$remove(function () {
					// Remove the test from the tests list
					for (var i in $scope.tests) {
						if ($scope.tests[i] === test) {
							$scope.tests.splice(i, 1);
						}
					}
				});


			} else {
				// Otherwise, use the test '$remove' method to delete the test
				$scope.test.$remove(function () {
					$location.path('/');
				});
			}
		};

	}

]);