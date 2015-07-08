//find human in a cohort
var authenticated = false;
var admin = false;

//find classroom for current user
function findclassroom(id) {
    var classroom;
    for (var i = 0; i < classroomsArray.length; i++) {
        classroom = classroomsArray[i];
        if (classroom.cohort == id) {
            //console.log(i, classroom.cohort, id);
            classroomNumber = i;
            currentDeskArray = classroom.deskArray;
            //refreshClassroom();
            break;
        }
    }
}

//still need to make this a lil nicer
function hideSignInButton() {
    if (authenticated) {
        $('.userNameDom').empty();
        $('.userImageDom').empty();
        $('.userNameDom').append(userName);
        $('.userImageDom').append('<img src=" ' + userImage + ' "id="userImageDom">');
        $('.signOutButton').removeClass('hidden');
        $('.g-signin2').addClass('hidden');
        $('.helpModalButton').removeClass('hidden');
        $('.label').removeClass('hidden');
        if (help_status.flag == 'red') {
            redStatus();
        } else if (help_status.flag == 'yellow') {
            yellowStatus();
        } else {
            greenStatus();
        }
        if (admin) {
            $('.newClassroomButton').removeClass('hidden');
            $('.lastpipe').removeClass('hidden');
            $('.cohortLink').removeClass('hidden');
            $('.closeX').removeClass('hidden');
            $('.classroomShit').removeClass('hidden');
        }
    } else {
        signOut();
    }
}
