// server/config/mongoose.js

// Load the module dependencies
var config 		= require('./config'),
	mongoose 	= require('mongoose');


// Define the Mongoose configuration method
module.exports = function () {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(config.db);

	// Load the application models
	require('../models/test.server.model');

	// Return the Mongoose connection instance
	return db;
};