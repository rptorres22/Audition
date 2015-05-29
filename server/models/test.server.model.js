// server/models/test.js

// Load the module dependencies
var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;



// Define a new 'TestSchema'
var TestSchema = new Schema({
	
	message: {
		type: String,
		default: ''
	},

	created: {
		type: Date,
		default: Date.now
	}
	
});

mongoose.model('Test', TestSchema);

