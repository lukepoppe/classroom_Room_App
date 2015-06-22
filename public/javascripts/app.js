console.log('app.js is loaded');

// INIT VARS //

// Set Default Cohort and Classrooms to 0 (first in array)
var cohortNumber = 0;
var classroomNumber = 0;
var currentDeskArray, classroomsArray, cohortArray,i;

// Edit Ability Toggle
var toggleEditing = false;

// Initialize Arrays of all data (DUMMY data for now, will be from DB)
getAllClassrooms();

// DUMMY DATA //
//classroomsArray = [dummyClassroom, dummyClassroom2];
cohortArray = [dummyCohort, dummyCohort2];

// Load deskArray from classroomsArray in memory
function updateCurrentDeskArray(){
    currentDeskArray = classroomsArray[classroomNumber].deskArray;
}

// DOM DRAWING FUNCTIONS //

// Load Fresh Classroom Template Function, callback colors the desks.
function refreshClassroom() {
    $('.classroom').load('classroom.html', function () {
        // Draw navbar based on # of Classrooms
        drawNav();
        // Load deskArray from classroomsArray in memory
        currentDeskArray = classroomsArray[classroomNumber].deskArray;
        paintDesks();
        names();
    });
}

// Color desks based on current deskArray data
function paintDesks() {
    for (var i = 0; i < currentDeskArray.length; i++) {
        $('#' + currentDeskArray[i].position).toggleClass('occupied');
    }
}

// DB FUNCTIONS //

function getAllClassrooms(){
    $.ajax({
        url: '/classrooms/',
        data: {},
        method: 'get',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            classroomsArray= data;
            // update current desk array in memory
            updateCurrentDeskArray();
            refreshClassroom();
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("getClassroom() Ajax Get Complete:", textStatus);
        }
    });
}

function getClassroom(number){
    $.ajax({
        url: '/classrooms/' + number,
        data: {},
        method: 'get',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            classroomsArray[classroomNumber]= data[0];
            //updateCurrentDeskArray();
            //refreshClassroom();
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("getClassroom() Ajax Get Complete:", textStatus);
        }
    });
}

function updateClassroom(data){
    $.ajax({
        url: '/classrooms/' + data.number,
        data: data,
        method: 'post',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            // get new data and update
            getClassroom(data.number);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("updateClassroom() Ajax Get Complete:", textStatus);
        }
    });
}

function drawNav(){
    navBar="";
    for(i=0; i<classroomsArray.length;i++){
        navBar += "<li>" + "<a href='#' class='classroomSelector' data-classroom='"+i+"'>Classroom "+ (i+1) +"</a><span class='divider'>|</span></li>";
    }
    navBar += "<li><a href='#' class='newClassroomButton'>+</a><span class='divider'>|</span></li><li><a href='#' class='cohort'>Cohorts</a></li>";
    $('.navBar').children('ul').empty().append(navBar);
}

// jQuery, On Clicks //

$(document).ready(function () {

    // Load Fresh Classroom Template (now called in callback of getAllClassrooms();)
    //refreshClassroom();

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
    $('body').on('click', '.block', function () {

        if (toggleEditing == true) {
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
            // Refresh Classroom with new data.
            refreshClassroom();
        } else {
            console.log("editing disabled");
        }
    });

    // Save Button
    $('body').on('click', '.block', function () {
        updateClassroom();
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
        classroomNumber = classroomsArray.length;
        classroomsArray.push(new Classroom(classroomNumber, cohortNumber));
        currentDeskArray = classroomsArray[classroomNumber].deskArray;
    });

    // Set On Click of Save Button (toggle?)
    $('body').on('click', '.saveButton', function () {
        save();
    });
});
