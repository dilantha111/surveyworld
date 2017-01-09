/* This file is correspond to the survey.ejs file*/

/*war begins here*/
$(document).ready(function () {
    /* It would be better if a model dialog introduced at the click event - Low priority*/
    $("#submit").click(function (e) {
        e.preventDefault();
        var metadata = JSON.parse($("#metadata").val());
        var questions = metadata.questions;
        var answers = [];

        for(var i = 0 ; i < questions.length ; i++){
            var temp = "";
            if(questions[i].questionType == "RADIO"){
                var selector = "input[name='"+i+"']:checked";
                temp = $(selector+"").val();
            }else{
                temp = $("#"+i).val();
            }
            answers.push({questionName:questions[i].questionName,value:temp});
        }

        console.log(answers);
    });
});