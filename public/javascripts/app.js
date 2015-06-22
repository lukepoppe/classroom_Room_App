console.log('app.js is loaded');

// Set Default Cohort and Classrooms to 0 (first in array)
var cohortNumber = 0;
var classroomNumber = 0;

// Initialize Arrays of all data (DUMMY data for now, will be from DB)
classroomArray = [dummyClassroom, dummyClassroom2];
cohortArray = [dummyCohort, dummyCohort2];

// Initialize variables holding the currently being viewed data
currentDeskArray = classroomArray[classroomNumber].deskArray;

// Load Fresh Classroom Template Function, callback colors the desks.
function refreshClassroom() {
    $('.classroom').load('classroom.html', function () {
        paintDesks();
    });
}


// Color desks based on current deskArray data
function paintDesks() {
    for (var i = 0; i < currentDeskArray.length; i++) {
        $('#' + currentDeskArray[i].position).toggleClass('occupied');
    }
}

// Save Function
function save() {
    console.log("Saves everything to db?");
}

// jQuery
$(document).ready(function () {

    // Load Fresh Classroom Template
    refreshClassroom();
    loadModal();

    // Set On Click of Grid Blocks
    $('body').on('click', '.block', function () {

        var clickedPosition = $(this).attr('id');

        if ($(this).hasClass('occupied')) {
            // Erase a desk
            currentDeskArray = currentDeskArray.filter(function (obj) {
                return obj.position !== clickedPosition;
            });

        } else {
            // Create a desk with .block ID as position attribute.
            currentDeskArray.push(new Desk(currentDeskArray.length, clickedPosition, "", classroomNumber));
        }

        // Toggle .occupied Class
        $(this).toggleClass('occupied');
    });

    // Set On Click of Classroom Selector Links
    $('body').on('click', '.classroomSelector', function () {
        refreshClassroom();
        classroomNumber = $(this).data('classroom');
        // TO DO: Load data for classroom

    });

    // Set On Click of Plus Button (Create New Classroom)
    $('body').on('click', '.newClassroomButton', function () {
        refreshClassroom();
        classroomNumber = classroomArray.length;
        classroomArray.push(new Classroom(classroomNumber, cohortNumber));
        currentDeskArray = classroomArray[classroomNumber].deskArray;
    });

    // Set On Click of Save Button (toggle?)
    $('body').on('click', '.saveButton', function () {
        save();
    });
});
