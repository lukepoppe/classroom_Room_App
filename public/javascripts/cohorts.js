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
    // Redraw list of cohorts on left
    $('.cohortList').empty();
    for(var i=0; i < cohortsArray.length; i++) {
        $('.cohortList').append("<li class ='cohortID' id ='"+ cohortsArray[i]._id + "' data-cohortnumber="+i+">" + cohortsArray[i].name + "</li>");
    };

    // Draw title of cohort on right
    $('.headline').empty().append("<h1>"+cohortsArray[cohortNumber].name+"</h1>");

    // Draw list of people from cohort
    $('.showList').children('ul').empty();
    for(var i = 0; i < currentPersonArray.length; i++) {
        $('.showList').children('ul').append("<li data-number='"+i+"'>" + currentPersonArray[i].firstName + "<button class='editName btn btn-primary'>Edit</button><button class='btn btn-danger deleteName'>Delete</button></li>");
    };

    // On Click of edit and delete buttons
    $('.editName').click(function(){
        console.log($(this).parent('li').data('number'));
    });
    $('.deleteName').click(function(){
        console.log($(this).parent('li').data('number'));
    });
}

function cohortPageInit(){
    $('.entryList').hide();
    $('.showList').hide();
    var click = 0;

    drawList();

    // Edit Cohort Name On Click
    $('.editCohortNameButton').on('click', function () {
        $('#newCohortName').val(cohortsArray[cohortNumber].name);
        $('.confirmCohortEditButton').on('click', function () {
            cohortsArray[cohortNumber].name = $('#newCohortName').val();
            updateCohortInDB();
        });
    });

    $('.cohortList').on('click','.cohortID', function(){
        $('.entryList').show();
        $('.showList').show();
        cohortNumber = $(this).data('cohortnumber');
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