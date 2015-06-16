console.log('hi');

// Set Default Classroom Number to 1
var classroomNumber=1;

// Desk Constructor Function
function Desk(number, position, person, classroom){
    this.number = number;
    this.position = position;
    this.person = person;
    this.classroom = classroom;
}

// Initialize Array of Desks
deskArray = [];

// Load Fresh Classroom Template Function
function refreshClassroom() {
    $('.classroom').load('classroom.html');
}

$(document).ready(function(){

    // On Click of Grid Blocks
    $('body').on('click', '.block', function() {

        // Create a desk with .block ID as position attribute.
        deskArray.push(new Desk(deskArray.length+1, $(this).attr('id'), "", classroomNumber));

        // Erase a desk?

        // Toggle .occupied Class
        $(this).toggleClass('occupied');


    });

    // Load Fresh Classroom Template
    refreshClassroom();

    // On Click of Classroom Selector Links
    $('body').on('click', '.classroomSelector', function() {
        refreshClassroom();
        classroomNumber = $(this).data('classroom');
        // To do: Load data for classroom

    } );
});

// Google Login Authorization Function
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

