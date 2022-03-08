var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { user: req.user });
});


/* GET login page. */
router.get('/login', isAuthorized, function (req, res, next) {
  res.render('login', { user: req.user });
});

function isAuthorized(req, res, next) {
  if (req.user) {
      console.log('user is logged in.', req.user);
      res.redirect('/dashboard')
  } else {
      console.log('user is not logged in.');
      next();
  }
}

module.exports = router;
