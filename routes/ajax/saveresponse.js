var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* Handle requests to save a response to the survey */
router.get('/', function(req, res, next) {
    var answers = req.query.answers;
    var uid = req.query.uid;
    var survey = req.query.surveyName;

    var newResponseKey = firebase.database().ref().child('survey').push().key;

    var updates = {};
    updates['public/'+uid+'/responses/'+survey+'/'+newResponseKey] = answers;

    firebase.database().ref().update(updates);
    res.send("true");
});

module.exports = router;
