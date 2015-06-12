console.log('hi');

$(document).ready(function(){
    $('body').on('click', '.block', function() {
        console.log($(this).attr('id'));
        $(this).toggleClass('occupied');
    });
});