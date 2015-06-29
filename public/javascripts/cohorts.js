//console.log('cohorts.js is loaded');

// INIT VARS //
var cohortNumber = 0;
var cohortsArray, currentPersonArray;

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

function cohortPageInit(){
    $('.entryList').hide();
    $('.showList').hide();
    var click = 0;

    for(var i=0; i < cohortsArray.length; i++) {
        $('.cohortList').append("<li>" + cohortsArray[i]._id + "</li>");
    };

    $('.createCohort').on("click", function(){
        click = 0;
        $('.showList').empty();
        console.log("createCohort clicked");
        createCohort();
        $('.cohortList').append("<li>Cohort # " + (cohortNumber+1) + "</li>");

        $('.entryList').show();
        $('.headline').text("Students of Cohort #" + (cohortNumber+1));
    });

    $('.submitPerson').on("click", function(){
        console.log('submitPerson clicked');
        submitPerson();
        $('.showList').show();
        $('.showList').append("<li>" + cohortsArray[cohortNumber].personArray[click].firstName + "</li>");
        click++;
    });

    //$('body').on("click", '.submit', function(){
    //    console.log("THIS BUTTON WORKS");
    //    $('body').find('.showList').show();
    //    firstName = $('.firstName').val();
    //    lastName = $('.lastName').val();
    //    email = $('.email').val();
    //    console.log(firstName);
    //    console.log(cohortArray);
    //
    //
    //    $('body').find(".showList").append("<li>Testing Testing<button class='edit'>Edit</button></li>");
    //});
}
