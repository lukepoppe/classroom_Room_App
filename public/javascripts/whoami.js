//find human in a cohort
var authenticated = false;
var admin = false;

function findhuman(email) {
    var cohort;
    var person;
    var classroomid;
    var name;
    for (var i = 0; i < cohortsArray.length; i++){
            cohort = cohortsArray[i];
            classroomid = cohort._id;
            name = cohort.name;
                for (var j = 0; j < cohort.personArray.length; j++) {
                    person = cohort.personArray[j];
                    console.log(person);
                    if (person.email.toLowerCase() == email) {
                        findclassroom(classroomid);
                        authenticated = true;
                        //console.log(name);
                        //hideSignInButton(name);
                        if (name == "ADMIN") {
                            admin = true;
                        }
                        break;
            }
        }
    }
}

//find classroom for current user
function findclassroom(id) {
    var classroom;
    for (var i = 0; i < classroomsArray.length; i++) {
        classroom = classroomsArray[i];
        if (classroom.cohort == id) {
            console.log(i, classroom.cohort, id);
            classroomNumber = i;
            currentDeskArray = classroom.deskArray;
            refreshClassroom();
            break;
        }
    }

}

function hideSignInButton() {
    console.log(authenticated, admin);
    if (authenticated) {
        $('.signOutButton').removeClass('hidden');
        $('.g-signin2').addClass('hidden');
        $('helpModalButton').removeClass('hidden');
        if (admin) {
            $('.newClassroomButton').removeClass('hidden');
            $('.lastpipe').removeClass('hidden');
            $('.cohortLink').removeClass('hidden');
            $('.closeX').removeClass('hidden');
            $('.adminViews').removeClass('hidden');
        }
    }
}
