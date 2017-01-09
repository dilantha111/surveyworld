var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* Handle requests to make a new survey */
router.get('/', function(req, res, next) {
    var uid = firebase.auth().currentUser.uid;
    var survey = req.query.surveyName.trim();

    var updates = {};
    updates['public/'+uid+'/structure/'+survey+'/published'] = "true";

    firebase.database().ref().update(updates).then(function (result) {
        res.send(result);
    });

});

module.exports = router;
