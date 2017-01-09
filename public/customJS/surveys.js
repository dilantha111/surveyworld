/* This file is correspond to the survey.ejs file*/

/*war begins here*/
$(document).ready(function () {
    /* It would be better if a model dialog introduced at the click event - Low priority*/
    $("#submit").click(function (e) {
        e.preventDefault();
        var metadata = JSON.parse($("#metadata").val());
        var questions = metadata.questions;



        for(var i = 0 ; i < questions.length ; i++){
            console.log("printing value");
            console.log($("#"+i).val());
        }
    });
});