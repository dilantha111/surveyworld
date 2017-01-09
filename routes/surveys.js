var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET survey page. */
/* display the survey to be filled*/
router.get('/', function(req, res, next) {
    var uid = req.query.user;
    var surveyName = req.query.survey.split('%').join(' ');

    firebase.database().ref('public/'+uid+'/structure/'+surveyName).once('value').then(function (val) {
        var data = null;
        if(val.val() !== null){
            data = val.val();
            res.render("surveys",{surveyName:surveyName,metadata:data,uid:uid});
        }else{
            res.render("surveys",{surveyName:surveyName,metadata:data,uid:uid});
        }
    });

});

module.exports = router;
