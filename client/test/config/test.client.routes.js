// client/test/config/test.client.routes.js

// Configure the 'test' module routes
angular.module('test').config(['$routeProvider',
	
	function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'test/views/list-test.client.view.html'
			})
			.when('/test/create', {
				templateUrl: 'test/views/create-test.client.view.html'
			})
			.otherwise({
				redirectTo: '/'
			});

	}

]);
