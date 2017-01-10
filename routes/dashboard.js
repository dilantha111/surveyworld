var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET dashboard page. */
/* The list of survyes fetched from firebase correspond to the user and these data
* send to the front end to be displayed*/
router.get('/', function(req, res, next) {
    if(firebase.auth().currentUser != null){
        var uid = firebase.auth().currentUser.uid;
        var email = firebase.auth().currentUser.email;

        firebase.database().ref('public/'+uid+'/structure').once('value').then(function (val) {
            if(val.val() !== null){
                var dataValue = val.val();
                var keyValues = Object.keys(val.val());
                /*note that here we have to prepare a list of href s because the node name
                 * can contain empty spaces but in a href it cannot. So we use each node name
                 * but replaced spaces with '%' */
                var hrefs = [];
                keyValues.forEach(function (key) {
                    key = key.split(' ').join('%');
                    hrefs.push(key);
                });
                res.render("dashboard",{data:dataValue,keys:keyValues,href:hrefs,email:email});
            }else{
                res.render("dashboard",{keys:[],email:email});
            }

        });
    }else{
        res.redirect("/");
    }
});

module.exports = router;
