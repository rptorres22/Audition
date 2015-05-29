// server/routes/index.server.routes.js

module.exports = function (app) {
	// Load the 'index' controller
	var index = require('../controllers/index.server.controller');

	// Mount hte 'index' controller's 'render' method
	app.get('/', index.render);
}