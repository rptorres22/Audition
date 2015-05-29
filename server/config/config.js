// server/config/config.js

/*
	This will load the appropriate configuration file inside the /config/env/ 
	folder based on the environment 'NODE_ENV' variable.
*/
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
