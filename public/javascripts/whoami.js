//find human in a cohort
var authenticated = false;
var admin = false;

function findhuman(email) {
    var cohort;
    var person;
    var classroomid;
    var name;
    for (var i = 0; i < cohortsArray.length; i++) {
        cohort = cohortsArray[i];
        classroomid = cohort._id;
        name = cohort.name;
        for (var j = 0; j < cohort.personArray.length; j++) {
            person = cohort.personArray[j];
            if (person.email.toLowerCase() == email) {
                userCohortNumber = i;
                cohortNumber = userCohortNumber;
                findclassroom(classroomid);

                /* Help Status check */
                help_status = cohortsArray[userCohortNumber].personArray[j].help_status;

                authenticated = true;
                if (name == "ADMIN") {
                    admin = true;
                }
                break;
            }
        }
    }
    //names();
}

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
        $('.hideMe').removeClass('hidden');
        $('.newClassroomButton').removeClass('hidden');
        $('.lastpipe').removeClass('hidden');
        $('.classroomShit').removeClass('hidden');
        $('.navBar').addClass('hidden');
        $('.navBar1').removeClass('hidden');
        $('.adminViews').addClass('hidden');
        $('.editButtons').addClass('hidden');
        if (help_status.flag == 'red') {
            redStatus();
        } else if (help_status.flag == 'yellow') {
            yellowStatus();
        } else {
            greenStatus();
        }

        if (admin) {
            $('.editClassroomNameButton').removeClass('hidden');
            $('.adminViews').removeClass('hidden');
            $('.editButtons').removeClass('hidden');
            $('.navBar1').addClass('hidden');
            $('.navBar').removeClass('hidden');
        }

    } else {
        //signOut();
        $('.helpModalButton').removeClass('hidden');
        $('.label').removeClass('hidden');
        $('.hideMe').removeClass('hidden');
        $('.newClassroomButton').removeClass('hidden');
        $('.lastpipe').removeClass('hidden');
        $('.classroomShit').removeClass('hidden');
        $('.navBar').addClass('hidden');
        $('.navBar1').removeClass('hidden');
        $('.adminViews').addClass('hidden');
        $('.editButtons').addClass('hidden');
        if (help_status.flag == 'red') {
            redStatus();
        } else if (help_status.flag == 'yellow') {
            yellowStatus();
        } else {
            greenStatus();
        }

    }
}

//
//
//
//$('.showClassroomH1').hide();
//$('.helpModalButton').removeClass('hidden');
//$('.label').removeClass('hidden');
//if (help_status.flag == 'red') {
//    redStatus();
//} else if (help_status.flag == 'yellow') {
//    yellowStatus();
//} else {
//    greenStatus();
//}
