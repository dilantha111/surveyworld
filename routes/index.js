var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET thank you page.*/
router.get('/thankYouPage', function(req, res, next) {
  res.render("thankYouPage");
});

module.exports = router;
