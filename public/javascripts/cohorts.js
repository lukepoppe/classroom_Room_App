//console.log('cohorts.js is loaded');

// INIT VARS //
var cohortNumber = 0;
var cohortsArray, currentPersonArray;
var cohortID;

// Get current cohort array from DB
getAllCohorts();

function getAllCohorts() {
    console.log('getAllCohorts');
    $.ajax({
        url: '/cohorts/',
        data: {},
        method: 'get',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            cohortsArray = data;
            currentPersonArray = cohortsArray[cohortNumber].personArray;
            drawList();
            console.log("get all success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("getAllCohorts() Ajax GET Complete:", textStatus);
        }
    });
}

function createCohortInDB() {
    console.log("createCohortInDB");
    $.ajax({
        url: '/cohorts/',
        data: cohortsArray[cohortNumber],
        method: 'post',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log('DBSuccess');
            // get new data and update
            getAllCohorts();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown, jqXHR);
        },
        complete: function (jqXHR, textStatus) {
            console.log("createCohortInDB() Ajax POST Complete:", textStatus, jqXHR);
        }
    });
}

function createCohort() {
    console.log("createCohort");
    cohortNumber = cohortsArray.length;
    cohortsArray.push(new Cohort(cohortNumber, "Bloomington", "defaultName"));
    createCohortInDB();
}

function updateCohortInDB(){
    $.ajax({
        url: '/cohorts/' + cohortsArray[cohortNumber]._id,
        data: cohortsArray[cohortNumber],
        method: 'put',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log("updateCohorts success");
            // get new data and update
            getAllCohorts();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("updateCohorts() Ajax PUT Complete:", textStatus);
        }
    });
}

function submitPerson() {
    cohortsArray[cohortNumber].personArray.push(new Person($('#firstName').val(), $('#lastName').val(), $('#email').val(), "student"));
    updateCohortInDB();
}

function drawList(){
    console.log("drawList()");
    $('.showList').children('ul').empty();
    for(var i = 0; i < currentPersonArray.length; i++) {
        $('.showList').children('ul').append("<li>" + currentPersonArray[i].firstName + "</li>");
    };
}

function cohortPageInit(){
    $('.entryList').hide();
    $('.showList').hide();
    var click = 0;

    for(var i=0; i < cohortsArray.length; i++) {
        $('.cohortList').append("<li class ='cohortID' id ='"+ cohortsArray[i]._id + "' data-cohortnumber="+i+">" + cohortsArray[i].name + "</li>");
    };

    $('.cohortID').on("click", function(){
        $('.entryList').show();
        $('.showList').show();
        cohortNumber = $(this).data('cohortnumber');
        $('.headline').empty().append("<h1>"+cohortsArray[cohortNumber].name+"</h1>");
        cohortID = $(this).attr('id');
        currentPersonArray = cohortsArray[cohortNumber].personArray;
        drawList();
    });

    $('.createCohort').on("click", function(){
        console.log("createCohort clicked");
        createCohort();
    });

    $('.submitPerson').on("click", function(){
        console.log('submitPerson clicked');
        submitPerson();
        $('.showList').show();
        $('.showList').append("<li>" + cohortsArray[cohortNumber].personArray[click].firstName + " " + cohortsArray[cohortNumber].personArray[click].lastName + " | " + cohortsArray[cohortNumber].personArray[click].email +  "   <button class='deletePerson'>Delete</button></li>");
        click++;
    });
}