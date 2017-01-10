var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET thank you page.*/
router.get('/thankYouPage', function(req, res, next) {
  res.render("thankYouPage");
});

/*Log out page*/
router.get('/logout', function(req, res, next) {
  firebase.auth().signOut().then(function () {
    res.redirect("/");
  },function (err) {
    console.log(err);
    res.redirect("/");
  });

});


module.exports = router;
