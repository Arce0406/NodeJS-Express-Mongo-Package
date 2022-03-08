var router = require('express').Router();

// router.get('/', function (req, res, next) {
//   res.render('dashboard', {user: req.user});
// });

router.get('/', isAuthorized, function (req, res, next) {
  res.render('dashboard', {user: req.user});
});

function isAuthorized(req, res, next) {
    if (req.user) {
      console.log('user is logged in.', req.user);
      next();
    } else {
      console.log('user is not logged in.');
      res.redirect('/');
    }
  }
  

module.exports = router;