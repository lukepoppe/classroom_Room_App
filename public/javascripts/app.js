console.log('hi');

// Initialize Array of Cohorts
cohortArray = []; // TO DO: Ajax Call to DB

// QUESTION: CohortArray contains cohort Objects or Arrays? (Which then contains Person Objects.)

// Set Default Cohort Number
var cohortNumber = 0;

// Initialize Array of Classrooms
// TO DO: Ajax Call to DB
// DUMMY data for now.
classroomArray = [new Classroom(1,1)];

// Set Default Classroom Number to 0
var classroomNumber=0;

// Initialize Array of Desks from Classroom Number 1
currentDeskArray = classroomArray[classroomNumber].deskArray;

// Desk Constructor Function
function Desk(number, position, person, classroom){
    this.number = number;
    this.position = position;
    this.person = person;
    this.classroom = classroom;
}

// Load Fresh Classroom Template Function
function refreshClassroom() {
    $('.classroom').load('classroom.html');
}

// Classroom Constructor Function
function Classroom(number, cohort){
    this.number = number;
    this.deskArray = []; // TO DO: Set up a default desk array
    this.cohort = cohort;
    this.city = "Bloomington"; // TO DO: Option to change City?
}

function save(){
    console.log("Saves everything to db");
}
$(document).ready(function(){

    // Load Fresh Classroom Template
    refreshClassroom();

    // On Click of Grid Blocks
    $('body').on('click', '.block', function() {

        var clickedPosition = $(this).attr('id');

        if($(this).hasClass('occupied')){
            // Erase a desk
            currentDeskArray = currentDeskArray.filter(function( obj ) {
                return obj.position !== clickedPosition;
            });

        } else {
            // Create a desk with .block ID as position attribute.
            currentDeskArray.push(new Desk(currentDeskArray.length, clickedPosition, "", classroomNumber));
        }

        // Toggle .occupied Class
        $(this).toggleClass('occupied');
    });

    // On Click of Classroom Selector Links
    $('body').on('click', '.classroomSelector', function() {
        refreshClassroom();
        classroomNumber = $(this).data('classroom');
        // To do: Load data for classroom

    } );

    // On Click of Plus Button (Create New Classroom)
    $('body').on('click', '.newClassroomButton', function(){
        refreshClassroom();
        classroomNumber = classroomArray.length+1;
        classroomArray.push(new Classroom(classroomNumber, cohortNumber));
        currentDeskArray = [];
    });

    // On Click of Save Button
    $('body').on('click', '.saveButton', function(){
        save();
    });
});

// Google Login Authorization Function
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

// Google Signout
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}