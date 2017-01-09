/*This js file correspond to mysurveys.ejs file*/


/*war begins here*/
$(document).ready(function () {
    $("#publish").click(function (e) {
        var surveyName = $("#surveyName").text();

        $.get("/publishSurvey",{"surveyName":surveyName}).done(function (data) {
            alert(data);
            location.reload();
        });
    });
});