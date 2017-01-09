var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET createNew page. */
router.get('/', function(req, res, next) {
    if(firebase.auth().currentUser != null){
        res.render("createNew",{title:"dashboard",surveys:['fuck','shit']});
    }else{
        res.redirect("/");
    }
});

module.exports = router;
