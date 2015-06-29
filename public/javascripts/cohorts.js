//console.log('cohorts.js is loaded');

// INIT VARS //
var cohortNumber = 0;
var cohortsArray, currentPersonArray;
var cohortID;
var currentCohortArray = [];
var currentStudentArray = [];

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

function submitPerson() {
    cohortsArray[cohortNumber].personArray.push(new Person($('#firstName').val(), $('#lastName').val(), $('#email').val(), "student"));

    // Update cohort in DB
    $.ajax({
        url: '/cohorts/' + cohortsArray[cohortNumber]._id,
        data: cohortsArray[cohortNumber],
        method: 'put',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log("updateCohorts success");
            // get new data and update
            getAllCohorts();
            drawList();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("updateCohorts() Ajax PUT Complete:", textStatus);
        }
    });
}

function drawList(){
    console.log(cohortsArray[cohortNumber].personArray);
}

function getStudents() {
    console.log('getStudents');
    $.ajax({
        url: '/cohorts/' + cohortID,
        data: {},
        method: 'get',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            currentCohortArray = data;
            currentStudentArray = currentCohortArray.personArray;

                console.log("get students worked " + currentStudentArray[1].firstName);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("getAllCohorts() Ajax GET Complete:", textStatus);
        }
    });
}

function cohortPageInit(){
    $('.entryList').hide();
    $('.showList').hide();
    var click = 0;

    for(var i=0; i < cohortsArray.length; i++) {
        $('.cohortList').append("<li class ='cohortID' id ='"+ cohortsArray[i]._id + "'>" + cohortsArray[i]._id + "</li>");
    };

    $('.cohortID').on("click", function(){
        $('.showList').empty();
        $('.entryList').show();
        $('.showList').show();
        console.log($(this).attr('id'));
        cohortID = $(this).text();
        console.log(cohortID);
        getStudents();
        $('.headline').text("Students of Cohort " + cohortID);
        for(var i = 0; i < currentStudentArray.length; i++) {
            $('.showList').append("<li>" + currentStudentArray[i].firstName + "</li>");
        };
    });

    $('.createCohort').on("click", function(){
        click = 0;
        $('.showList').empty();
        console.log("createCohort clicked");
        createCohort();
        $('.cohortList').append("<li>Cohort # " + (cohortNumber+1) + "</li>");

        $('.entryList').show();
        $('.headline').text("Add Students to Cohort #" + (cohortNumber+1));
    });

    $('.submitPerson').on("click", function(){
        console.log('submitPerson clicked');
        submitPerson();
        $('.showList').show();
        //$('.showList').append("<li>" + cohortsArray[cohortNumber].personArray[click].firstName + " " + cohortsArray[cohortNumber].personArray[click].lastName + " | " + cohortsArray[cohortNumber].personArray[click].email +  "   <button class='deletePerson'>Delete</button></li>");
        click++;
    });
}

