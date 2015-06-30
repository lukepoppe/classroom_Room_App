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

function updateCohortInDB() {
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

function deleteCohortFromDB(id) {
    $.ajax({
        url: '/cohorts/' + id,
        data: {},
        method: 'delete',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            cohortNumber = 0;
            // Get updated classroomArray from DB and refresh
            getAllCohorts();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("deleteClassroomFromDB() Ajax Get Complete:", textStatus);
        }
    });
}


function submitPerson() {
    cohortsArray[cohortNumber].personArray.push(new Person($('#firstName').val(), $('#lastName').val(), $('#email').val(), "student"));
    drawList();
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    updateCohortInDB();
}

function drawList() {
    // Redraw list of cohorts on left
    $('.cohortList').empty();
    for (var i = 0; i < cohortsArray.length; i++) {
        $('.cohortList').append("<li><a href='#' class ='cohortID' id ='" + cohortsArray[i]._id + "' data-cohortnumber=" + i + ">" + cohortsArray[i].name + "</a><button class='editCohortName btn btn-primary' data-target='#editCohortName' data-toggle='modal'>Edit</button><button class='btn btn-danger deleteCohort' data-target='#deleteCohort' data-toggle='modal'>Delete</button></li>");
    };

    // On Click of Delete Cohort
    $('.deleteCohort').click(function () {
        var cohortIdToDelete = ($(this).siblings('a').attr('id'));
        $('.warnOfCohortName').empty().append($(this).siblings('a').text());
        $('.deleteCohortButton').on('click', function () {
            deleteCohortFromDB(cohortIdToDelete);
        });
    });

    // On Click of Edit Cohort
    $('.editCohortName').on('click', function () {
        //var coh = ($(this).siblings('a').attr('id'));
        $('#newCohortName').val($(this).siblings('a').text());
        $('.confirmCohortEditButton').on('click', function () {
            cohortsArray[cohortNumber].name = $('#newCohortName').val();
            updateCohortInDB();
        });
    });

    // Create New Cohort Button
    $('.cohortList').append('<li><button class="createCohort">Create a New Cohort</button></li>');
    // Draw title of cohort on right
    $('.headline').empty().append("<h1>" + cohortsArray[cohortNumber].name + "</h1>");

    // Draw list of people from cohort
    $('.showList').children('ul').empty();
    for (var i = 0; i < currentPersonArray.length; i++) {
        $('.showList').children('ul').append("<li data-number='" + i + "'>" + currentPersonArray[i].firstName + "<button class='editName btn btn-primary' data-target='#editPersonName' data-toggle='modal'>Edit</button>   <button class='btn btn-danger deleteName' data-target='#deletePerson' data-toggle='modal'>Delete</button></li>");
    };

    // On Click of Edit Name
    $('.editName').click(function () {
        var nameNumber = $(this).parent('li').data('number');
        $('#newPersonFirstName').val(cohortsArray[cohortNumber].personArray[nameNumber].firstName);
        $('#newPersonLastName').val(cohortsArray[cohortNumber].personArray[nameNumber].lastName);
        $('#newPersonEmail').val(cohortsArray[cohortNumber].personArray[nameNumber].email);
        $('.confirmPersonEditButton').on('click', function () {
            console.log('click');
            cohortsArray[cohortNumber].personArray[nameNumber].firstName = $('#newPersonFirstName').val();
            cohortsArray[cohortNumber].personArray[nameNumber].lastName = $('#newPersonLastName').val();
            cohortsArray[cohortNumber].personArray[nameNumber].email = $('#newPersonEmail').val();
            updateCohortInDB();
        });
    });

    // On Click of Delete Name
    $('.deleteName').click(function () {
        var nameNumber = $(this).parent('li').data('number');
        $('.warnOfPersonName').empty().append(cohortsArray[cohortNumber].personArray[nameNumber].firstName + " " + cohortsArray[cohortNumber].personArray[nameNumber].lastName);
        $('.deleteNameButton').on('click', function () {
            cohortsArray[cohortNumber].personArray.splice(nameNumber,1);
            updateCohortInDB();
        });
    });
}

function cohortPageInit() {
    $('.entryList').hide();
    $('.showList').hide();
    $('.cohortListDiv').hide();

    drawList();

    $('.cohortList').on('click', '.cohortID', function () {
        $('.entryList').show();
        $('.showList').show();
        cohortNumber = $(this).data('cohortnumber');
        cohortID = $(this).attr('id');
        currentPersonArray = cohortsArray[cohortNumber].personArray;
        drawList();
    });

    $('.createCohort').on("click", function () {
        console.log("createCohort clicked");
        createCohort();
    });

    $('.submitPerson').on("click", function () {
        console.log('submitPerson clicked');
        submitPerson();
    });
}
