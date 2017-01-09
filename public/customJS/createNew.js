/*This js file corresponds to createNew.ejs file */

/*Using the html5 local storage ... Bye cookies now you are old school !!!*/
var localStore = {
    set: function(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    destroy: function(key) {
        return localStorage.removeItem(key);
    }
};

/*Getting local object in our case that is survey object*/
var getLocalObject = function () {
  if(localStore.get("survey")){
    var survey = localStore.get("survey");
    return survey;
  }else{
      var survey = {
          questions : []
      };
      localStore.set("survey",survey);
      return survey;
  }
};

/*Setting local object*/
var setLocalObject = function (value) {
    return localStore.set("survey",value); // this is no use man it dos not return anything
};

/*Set survey Name and Survey Description*/
var setSurveyDetails = function (surveyName,surveyDescription) {
    var object = getLocalObject();
    object.surveyName = surveyName;
    object.surveyDescription = surveyDescription;
    setLocalObject(object);
    return getLocalObject();
};

/*Generating the template form*/
var generateDisplayForm = function () {
    $("#displayForm").empty();
    if(getLocalObject().surveyName){
        $("#surveyName").val(getLocalObject().surveyName);
    }
    if(getLocalObject().surveyDescription){
        $("#SurveyDescription").val(getLocalObject().surveyDescription);
    }
    var questions = getLocalObject().questions;
    questions.forEach(function (question) {
        var html = "<div><label>"+question.questionName+"<span>"+question.questionDescription+
            "</span></label>";

        switch(question.questionType){
            case "RADIO" :
                question.optionList.forEach(function (option) {
                    html += "<input type='radio'><label>"+option+"</label>";
                });
                break;
            case "SELECT" :
                html += "<select>";
                question.optionList.forEach(function (option) {
                    html += "<option>"+option+"</option>";
                });
                html += "</select>";
                break;
            case "CHECKBOX" :
                question.optionList.forEach(function (option) {
                    html += "<input type='checkbox'><label>"+option+"</label>";
                });
                break;
            case "TEXT":
            case "NUMBER":
                html += "<input type='"+question.questionType.toLowerCase()+"'>";
                break;
        }

        html += "</div>";

        $("#displayForm").append(html);
    });

};

/*function to clear the adding form*/
var clearForm = function () {
    $("#description").val("");
    $("#questionName").val("");
    $("#questionDescription").val("");
    $("#option-list ul").html("");
};

/*function to clear the template form*/
var clearTemplate = function () {
    $("#surveyName").val("");
    $("#SurveyDescription").val("");
    $("#displayForm").empty();
    localStore.destroy("survey");
};

/*well war begins here*/
$(document).ready(function () {
    generateDisplayForm();


    $(".optional").css("display","none");

    /*According to the question type the necessary fields are displayed*/
    $("#questionType").change(function () {
        var option = $("#questionType option:selected").text();
        if(option.toUpperCase() === "TEXT" || option.toUpperCase() === "NUMBER"){
            $(".optional").css("display","none");
        }else{
            $(".optional").css("display","");
        }
    });

    /*If the question type has options adding'em */
    $("#add-option").click(function (e) {
        e.preventDefault();
        var optionName = $("#optionName").val();
        if(optionName.length > 0){
            $("#option-list ul").append("<li>"+optionName+"</li>");
            $("#displayText").val("");
            $("#optionName").val("");
        }else{
            alert("you have to fill option name..");
        }
    });

    /*If a user double click on an option it will be removed- that has to be implemented*/
    $("#option-list").dblclick(function (e) {
        alert("well you want to remove that item ? it's not yet implemented...");
    });

    /*Adding a question to the survey*/
    $("#add-question").click(function (e) {
        e.preventDefault();
        var description = $("#description").val();
        var questionType = $("#questionType option:selected").text().toUpperCase();
        var questionName = $("#questionName").val();
        var questionDescription = $("#questionDescription").val();

        var object = getLocalObject();
        var question = {
            'description':description,
            'questionType':questionType,
            'questionName':questionName,
            'questionDescription':questionDescription
        };

        if(description.length > 0 && questionName.length > 0){
            var objectReady = false;
            if(questionType === "TEXT" || questionType === "NUMBER"){
                object.questions.push(question);
                objectReady = true;
            }else{
                question.optionList = [];
                $("#option-list ul li").each(function () {
                    question.optionList.push($(this).text());
                });
                if(question.optionList.length > 0){
                    object.questions.push(question);
                    objectReady = true;
                }else{
                    alert("No options defined !!!");
                }
            }
            if(objectReady){
                setLocalObject(object);
                generateDisplayForm(); // updating the form
                clearForm(); // clear the form after adding the question
            }
        }else{
            alert("You have to assign a question name and a description first");
        }

    });
    /*/adding a question to the survey*/

    /*Clear the survey*/
    $("#clearSurvey").click(function () {
        localStore.destroy("survey");
        $("#displayForm").html("");
    });


    /*Add survey */
    $("#addSurvey").click(function () {
        var object = getLocalObject();
        var surveyName = $("#surveyName").val();
        var surveyDescription = $("#SurveyDescription").val();

        if(surveyName.length > 0 && object.questions.length > 0){
            object = setSurveyDetails(surveyName,surveyDescription);
            object.published = false;
            $.get("/createNewSurvey",object).done(function (data) {
                data = JSON.parse(data);
                alert(data.msg); // this may need to be redirected to the survey page
                if(data.success){ // let's implement that in the next step
                    clearTemplate();
                }
            });
        }else{
            alert("You must have a survey name and some questions in it");
        }

    });

    /*survey Name and description fields auto save*/
    $("#surveyName").keyup(function () {
        var surveyName = $("#surveyName").val();
        var surveyDescription = $("#SurveyDescription").val();
        setSurveyDetails(surveyName,surveyDescription);
    });
    $("#SurveyDescription").keyup(function () {
        var surveyName = $("#surveyName").val();
        var surveyDescription = $("#SurveyDescription").val();
        setSurveyDetails(surveyName,surveyDescription);
    });

});