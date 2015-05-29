// server/routes/test.server.routes.js


// Load the module dependencies
var testController = require('../controllers/test.server.controller');

// Define the routes module method
module.exports = function (app) {

	// Set up the 'test' base routes
	app.route('/api/test')
		.get(testController.list)
		.post(testController.create);

};