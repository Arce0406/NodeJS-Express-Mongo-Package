var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isAuthorized, function (req, res, next) {
  res.render('home', { user: req.user });
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
