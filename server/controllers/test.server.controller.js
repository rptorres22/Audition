// server/controllers/test.server.controller.js

// Load the module dependencies
var mongoose = require('mongoose'),
	TestModel = mongoose.model('Test');





// Create a new error handling controller method
// accepts a Mongoose error object
var getErrorMessage = function(err) { 
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) 
				// only return first error as to not overwhelm user
				return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};






// Create a new controller method that creates a new test
exports.create = function (req, res) {

	// Create a new test object
	var test = new TestModel(req.body);

	// Try saving the article
	test.save(function (err) {

		if (err) {
			// If an error occurs send the error message
			return res.status(400)
				.send({
					message: getErrorMessage(err)
				});
		} else {
			// Send a JSON representation of the test
			res.json(test);
		}
	});

};


// Create a new controller method that retrieves a list of tests
exports.list = function (req, res) {

	// Use the model's 'find' method to get a list of tests
	TestModel.find()
			.sort('-created')
			.exec(function (err, tests) {

				if (err) {
					// If an error occurs send the error message
					return res.status(400)
						.send({
							message: getErrorMessage(err)
						});
				} else {
					// Send a JSON representation of the articles
					res.json(tests);
				}

			});

};