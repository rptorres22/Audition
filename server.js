

// setup ================================================================
var express 	= require('express');
var app 		= express();

var bodyParser 	= require('body-parser');	// parse res/req objects for use
var mongoose	= require('mongoose');		// mongoose for mongodb

var port 		= process.env.PORT || 8080;	//set the port

var routeIndex 	= require('./server/routes/index');    // route file for index
var routeApi	= require('./server/routes/api');		// route file for api


// configuration =========================================================
mongoose.connect('mongodb://localhost:27017/audition');

app.use(bodyParser.json());




// routes ================================================================
//app.get('*', function(req, res) {
//	res.sendFile(__dirname + '/client/views/index.html');
//});

app.use('/', routeIndex);
app.use('/api', routeApi);




// listen on specified port defined above
app.listen(port, function() {
	console.log("listening on port " + port + " ..." );
});




