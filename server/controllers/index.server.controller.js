// server/controllers/index.server.controller.js

// Create a new 'render' controller method
exports.render = function (req, res) {
	// Use the 'response' object to render the 'index' view 
	//res.send('hello index controller works');

	res.render('index', {
		title: "Welcome to Audition"
	});

};