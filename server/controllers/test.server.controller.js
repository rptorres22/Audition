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

	//console.log(req.body);

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


// Create a new controller middleware that retrieves a single existing test
exports.testByID = function (req, res, next, id) {
	// Use the model 'findById' method to find a single test
	TestModel.findById(id)
		.exec(function (err, test) {
			if (err)
				return next(err);
			if (!test)
				return next(new Error('Failed to load test ' + id));

			req.test = test;

			// Call the next middleware
			next();
		});
};



// req.test should already be populated by testByID
// when a user hits a route that contains an test ID
exports.read = function (req, res) {
	//console.log(req.test);
	res.json(req.test);
};


// to update a test
// this assumes that you already obtained the test object
// in the testByID() middleware.
exports.update = function (req, res) {
	console.log(test);
	// Get the test from the 'request' object
	var test = req.test;

	// Update the test fields
	test.message = req.body.message;

	// try saving the updated test
	test.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(test);
		}
	});
};


// to delete a test
// this also assumes that you already obtained the test object
// in the testByID() middleware.  Just need to invoke the mongoose
// remove() method.
exports.delete = function (req, res) {
	// Get the article from the 'request' object
	var test = req.test;

	// Use the model 'remove' method to delete the test
	test.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(test);
		}
	});
};

