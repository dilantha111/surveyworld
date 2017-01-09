var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* Handle requests to make a new survey */
router.get('/', function(req, res, next) {
    var uid = firebase.auth().currentUser.uid;
    var survey = req.query.surveyName.trim();

    firebase.database().ref('public/'+uid+'/structure/'+survey).once('value').then(function (val) {
        if(val.val() == null){
            firebase.database().ref('public/'+uid+'/structure/'+survey+'/')
                .set(req.query);
            var result = JSON.stringify({success:true,msg:"Okay Survey has been successfully added"});
            res.send(result);
        }else{
            var result =
                JSON.stringify({success:false,msg:"Sorry But survey name already exists. Choose a different name"});
            res.send(result);
        }
    },function (err) {
        res.send("something went wrong Error msg : "+err);
    });
});

module.exports = router;
