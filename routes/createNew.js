var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET createNew page. */
router.get('/', function(req, res, next) {
    if(firebase.auth().currentUser != null){
        var email = firebase.auth().currentUser.email;
        res.render("createNew",{title:"dashboard",surveys:['aa','aa'],email:email});
    }else{
        res.redirect("/");
    }
});

module.exports = router;
