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

    $("#generalStatCal").click(function (e) {
        var metadata = JSON.parse($("#metadata").val());
        var data = JSON.parse($("#data").val());
        var keys = Object.keys(data);

        var quantitatives = [];
        var analyseData = [];
        var means = [];
        var medians = [];
        var standardDev = [];

        for(var i = 0 ; i < metadata.questions.length ; i++){
            if(metadata.questions[i].questionType == "NUMBER"){
                quantitatives.push(metadata.questions[i].questionName);
                analyseData[metadata.questions[i].questionName] = [];
            }
        }

        for(i = 0 ; i < keys.length ; i++){
            data[keys[i]].forEach(function (val) {
                quantitatives.forEach(function (q) {
                    if(val.questionName == q){
                        analyseData[q].push(parseFloat(val.value));
                    }
                });
            });
        }

        /* calculating mean and median*/
        quantitatives.forEach(function (q) {
            var temp = analyseData[q];
            var total = 0;
            var items = 0;
            for(i = 0 ; i < temp.length;i++){
                if(temp[i]){
                    total += temp[i];
                    items++;
                }
            }
            means[q] = total/items;
            medians[q] = temp[(items + 1)/2];
        });

        /* calculating standard deviation*/
        quantitatives.forEach(function (q) {
            var temp = analyseData[q];
            var totalSqaures = 0;
            var items = 0;
            for(i = 0 ; i < temp.length;i++){
                if(temp[i]){
                    var temp1 = temp[i] - means[q];
                    totalSqaures += temp1*temp1;
                    items++;
                }
            }
            standardDev[q] = Math.sqrt(totalSqaures/items);

        });

        var html = "";

        /*preparing html string*/
        quantitatives.forEach(function (q) {
            var temp = "<li><ul><h2>"+q+"</h2>";
            temp += "<li> Mean :" + means[q]+ "</li>";
            temp += "<li> Median :" + medians[q]+ "</li>";
            temp += "<li> Standard Deviation :" + standardDev[q]+ "</li>";
            temp += "</ul></li>";
            html += temp;
        });

        $("#generalStat").html(html);

    });
});