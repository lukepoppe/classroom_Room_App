//console.log('app.js is loaded');

// INIT VARS //
var help_status = {};

// Set Default Cohort and Classrooms to 0 (first in array)
var cohortNumber = 0;
var classroomNumber = 0;
var userCohortNumber;
var currentDeskArray, classroomsArray, i;

// Edit Ability Toggle
var toggleEditing = false;


// DUMMY DATA //
// classroomsArray = [dummyClassroom, dummyClassroom2];
// var cohortArray = [dummyCohort, dummyCohort2];

// DOM DRAWING FUNCTIONS //

// Load Fresh Classroom Template Function, callback colors the desks.
function refreshClassroom() {
    $('.classroom').load('classroom.html', function () {
        //console.log("load was performed");
        // Draw navbar based on # of Classrooms
        drawNav();
        //draw dropdown based on all cohorts
        draw_dropdown();

        // Load deskArray from classroomsArray in memory
        currentDeskArray = classroomsArray[classroomNumber].deskArray;
        paintDesks();
        appendName();
        hideSignInButton();

        if (authenticated) {
            names();
        }
        $('.cohortTitle').text(cohortsArray[cohortNumber].name);
    });
}

// Add classroom name to title of classroom.html
function appendName() {
    $('.classRoomName').text(classroomsArray[classroomNumber].name);
}

// Delete Classroom
function deleteClassroom(number) {
    deleteClassroomFromDB(number);
};

// Color desks based on current deskArray data
function paintDesks() {
    for (var i = 0; i < currentDeskArray.length; i++) {
        $('#' + currentDeskArray[i].position).toggleClass('occupied');
    }
}

// DB FUNCTIONS //

function deleteClassroomFromDB(number) {
    $.ajax({
        url: '/classrooms/' + classroomsArray[number]._id,
        data: {},
        method: 'delete',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            classroomNumber = 0;
            // Get updated classroomArray from DB and refresh
            getAllClassrooms();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("deleteClassroomFromDB() Ajax Get Complete:", textStatus);
        }
    });
}
function getAllClassrooms() {
    $.ajax({
        url: '/classrooms/',
        data: {},
        method: 'get',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            classroomsArray = data;
            currentDeskArray = classroomsArray[classroomNumber].deskArray;
            // update current desk array in memory
            findhuman(userEmail);
            refreshClassroom();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("getAllClassroom() Ajax GET Complete:", textStatus);
        }
    });
}

function updateClassroom(number) {
    // Set current desk array into classrooms array before updating.
    classroomsArray[classroomNumber].deskArray = currentDeskArray;

    $.ajax({
        url: '/classrooms/' + classroomsArray[number]._id,
        data: classroomsArray[number],
        method: 'put',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log("updateClassroom success");
            // get new data and update
            classroomsArray = data;
            currentDeskArray = classroomsArray[classroomNumber].deskArray;
            refreshClassroom();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("updateClassroom() Ajax PUT Complete:", textStatus);
        }
    });
}

function createClassroomInDB() {
    $.ajax({
        url: '/classrooms/',
        data: classroomsArray[classroomNumber],
        method: 'post',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            classroomNumber = 0;
            // get new data and update
            getAllClassrooms();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("createClassroomInDB() Ajax POST Complete:", textStatus);
        }
    });
}

function drawNav() {
    navBar = "";
    for (i = 0; i < classroomsArray.length; i++) {
        navBar += "<li>" + "<a href='#' class='classroomSelector' data-classroom='" + i + "'>" + classroomsArray[i].name + "</a><a href='#' class='closeX hidden' data-toggle='modal' data-target='#confirm-delete' data-classroom='" + i + "'>" + " X</a><span class='divider'>|</span></li>";
    }
    navBar += "<li><a href='#' class='newClassroomButton hidden'>+</a><span class='divider lastpipe hidden'>|</span></li><li class='adminViews'><a href='#' class='cohortLink hidden'>Cohorts</a></li>";
    $('.navBar').children('ul').empty().append(navBar);

    // Cohorts on Click
    $('.cohortLink').click(function () {
        console.log("cohort link click");
        $('.classroom').load("people/cohorts.html", function () {
            console.log("cohort load");
            cohortPageInit();
        });
        //$('.helpModal').hide();
        $('.adminViews').hide();
    });
}

function draw_dropdown() {
    $('.dropdown-menu').children().empty();
    if (cohortsArray != undefined) {
        cohortsArray.forEach(function (cohort) {
            var cohortname = cohort.name;
            var cohortid = cohort._id;
            var el = "<li><a id='" + cohortid + "' href='#'>" + cohortname + "</a></li>";
            $('.dropdown-menu').append(el);
        })
    }
}

// jQuery, On Clicks //

$(document).ready(function () {

    //
    getAllClassrooms();

    // Status Modal
    loadModal();

    //click function for dropdown
    //add cohort id to classroom cohort property
    $('.dropdown').on('click', '.dropdown-menu li a', function () {
        classroomsArray[classroomNumber].cohort = $(this).attr("id");
        console.log(classroomsArray, classroomsArray[classroomNumber].cohort);
        updateClassroom(classroomNumber);
        var cohortTitle = $(this).text();
        $('.cohortTitle').text(cohortTitle);
    });

    // Close Button On Click (Delete Classroom Modal)
    $('.navBar').on('click', '.closeX', function () {
        var classroomNumberToDelete = $(this).data('classroom');
        $('.warnOfClassName').empty().append(classroomsArray[classroomNumberToDelete].name);
        $('.deleteButton').on('click', function () {
            console.log(classroomNumberToDelete);
            deleteClassroom(classroomNumberToDelete);
        })
    });

    // Edit Classroom Name On Click
    $('.editClassroomNameButton').on('click', function () {
        $('#newClassName').val(classroomsArray[classroomNumber].name);
        $('.confirmEditButton').on('click', function () {
            classroomsArray[classroomNumber].name = $('#newClassName').val();
            updateClassroom(classroomNumber);
        });
    });

    // Checkbox
    $('.onoffswitch-label').click(function () {
        $(this).parent().toggleClass('onoffswitch-checked');

        if ($(this).parent().hasClass('onoffswitch-checked')) {
            toggleEditing = false;
        } else {
            toggleEditing = true;
        }
    });

    // Set On Click of Grid Blocks
    $('.classroom').on('click', '.block', function () {
        console.log('click');
        // IF editing is enabled
        if (toggleEditing === true) {
            var clickedPosition = $(this).attr('id');

            if ($(this).hasClass('occupied')) {

                // Erase a desk from client-side array
                for (var i = 0; i < currentDeskArray.length; i++) {
                    currentDeskArray[i].position == clickedPosition ? currentDeskArray.splice(i, 1) : null;
                }
            } else {
                // Create a desk with .block ID as position attribute.
                currentDeskArray.push(new Desk(currentDeskArray.length, clickedPosition, "", classroomNumber));
            }
            // Refresh Classroom with new data. Why this doesn't repaint desks? not sure..
            refreshClassroom();
        }
        if (toggleEditing === false) {
            console.log("editing disabled");
        }
    });

    // Set On Click of Classroom Selector Links
    $('.navBar').on('click', '.classroomSelector', function () {
        $('.classroomShit').show();
        classroomNumber = $(this).data('classroom');
        currentDeskArray = classroomsArray[classroomNumber].deskArray;
        refreshClassroom();
        $('.adminViews').show();
        $('.cohortListDiv').show();
    });

    // Set On Click of Plus Button (Create New Classroom)
    $('.navBar').on('click', '.newClassroomButton', function () {
        classroomNumber = classroomsArray.length;
        classroomsArray.push(new Classroom(cohortNumber, "Bloomington", "defaultName"));
        createClassroomInDB();
    });

    // Set On Click of Save Button (toggle?)
    $('.saveButton').on('click', function () {
        updateClassroom(classroomNumber);
    });

});
