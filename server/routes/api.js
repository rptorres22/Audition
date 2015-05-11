// api.js

var express = require('express');
var router = express.Router();

// Get the home page
router.get('/', function(req, res, next) {
	res.send('this be the api page');
});


module.exports = router;