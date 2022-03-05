const express = require('express');
const passport = require('passport');
require('../../../middlewares/strategies/discordstrategy')

var router = express.Router();

router.get('/', passport.authenticate('discord'), function (req, res, next) {
    res.send(200);
});

router.get('/logout', function (req, res, next) {
    if (req.user) {
        req.logOut();
        res.redirect('/');
    }
    else {
        res.render('/');
    }
});

// this oauth2 callback url must be to set in discord application oauth2 redirects
router.get('/oauthcallback', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}));

// router.get('/oauthcallback', function (req, res, next) {
//     // res.send(200);
//     res.send(req.user);
// });


module.exports = router;