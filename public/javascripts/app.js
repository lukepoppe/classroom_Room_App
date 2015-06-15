console.log('hi');


var classroom=1;

$(document).ready(function(){
    $('body').on('click', '.block', function() {
        console.log($(this).attr('id'));
        $(this).toggleClass('occupied');
    });

    $('.classroom').load('classroom.html');

    $('body').on('click', '.classroomSelector', function() {
        //console.log($(this).data('classroom'));
        classroom = $(this).data('classroom');
        $('.classroom').load('classroom.html');
    } );
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

