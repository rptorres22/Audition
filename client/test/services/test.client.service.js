// client/test/services/test.client.service.js

// Create the 'test' service
angular.module('test').factory('TestService', ['$resource', 

	function ($resource) {
		// Use the '$resource' service to return an article '$resource' object
		return $resource('api/test/:testId', {
			testId: '@_id'
		},{
			update: {
				method: 'PUT'
			}
		}
		);

	}
]);