// server/routes/test.server.routes.js


// Load the module dependencies
var testController = require('../controllers/test.server.controller');

// Define the routes module method
module.exports = function (app) {

	// Set up the 'test' base routes
	app.route('/api/test')
		.get(testController.list)
		.post(testController.create);



	app.route('/api/test/:testId')
		.get(testController.read)
		.put(testController.update)
		.delete(testController.delete);



	// Set up the 'testId' parameter middleware   
	// to make sure every route that has the testId parameter
	// to first call the testController.testByID() middleware
	app.param('testId', testController.testByID);

};