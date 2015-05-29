// server.js

/*
	This is the main file that you will run
*/

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';




// Load the module dependencies
var mongoose 	= require('./server/config/mongoose'), 
	express		= require('./server/config/express');



// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();




// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;





