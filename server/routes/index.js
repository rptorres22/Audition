// index.js

var express = require('express'); 	//to get the Router from express
var router 	= express.Router();		//setting the router variable


var path 	= require('path');		//to help with directory navigation



// Get the home page
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../../client/views/index.html'));
});


router.get('/shittest', function(req, res) {
	res.send('this be the shit page cuz');
});

module.exports = router;