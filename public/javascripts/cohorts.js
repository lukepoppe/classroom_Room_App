console.log('cohorts.js is loaded');

// INIT VARS //
var cohortNumber = 0;
var cohortsArray, currentPersonArray;

// Get current cohort array from DB
getAllCohorts();

function getAllCohorts() {
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
    $.ajax({
        url: '/cohorts/',
        data: cohortsArray[cohortNumber],
        method: 'post',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
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
    cohortNumber = cohortsArray.length;
    cohortsArray.push(new Cohort(cohortNumber, "Bloomington", "defaultName"));
    createCohortInDB();
}

function cohortPageInit(){

    $('.entryList').hide();
    $('body').find('.showList').hide();

    $('body').on("click", '.create',function(){
        console.log("yes");
        createCohort();
        $('.entryList').show();
        $('.headline').text("Students of Cohort #" + cohortNumber);
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
