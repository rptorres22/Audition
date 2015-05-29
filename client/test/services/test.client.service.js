// client/test/services/test.client.service.js

// Create the 'test' service
angular.module('test').factory('TestService', ['$resource', 

	// Use the '$resource' service to return an article '$resource' object
	function ($resource) {

		return $resource('api/test');

	}
]);