// server/routes/index.server.routes.js

module.exports = function (app) {
	// Load the 'index' controller
	var indexController = require('../controllers/index.server.controller');

	// Mount the 'index' controller's 'render' method
	app.get('/', indexController.render);
};