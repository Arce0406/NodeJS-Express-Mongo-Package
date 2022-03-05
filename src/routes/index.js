// routes/index.js

var express = require('express');
var router = express.Router();

// include all moudle routes here, then app.js only need include this file
var home = require('./modules/home');
var dashboard = require('./modules/dashboard');
var oauth2_discord = require('./modules/oauth2/discord');
/* set */

/* use */
router.use('/', home);
router.use('/dashboard', dashboard);
router.use('/oauth2/discord', oauth2_discord);

module.exports = router;