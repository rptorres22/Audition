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
	require('../models/users.server.model');
	require('../models/comments.server.model');
	require('../models/files.server.model');
	require('../models/request.server.model');
	require('../models/requesttype.server.model');
	require('../models/reviews.server.model');
	require('../models/roles.server.model');
	require('../models/team.server.model');
	require('../models/teammembers.server.model');
	require('../models/viewstatus.server.model');

	// Return the Mongoose connection instance
	return db;
};