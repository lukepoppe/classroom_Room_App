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