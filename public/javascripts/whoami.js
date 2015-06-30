//find human in a cohort
function findhuman(email) {
    var cohort;
    var person;
    var classroomid;
    var name;
    console.log(cohortsArray);
    for (var i = 0; i < cohortsArray.length; i++){
            cohort = cohortsArray[i];
            classroomid = cohort._id;
            name = cohort.name;
                for (var j = 0; j < cohort.personArray.length; j++) {
                    person = cohort.personArray[j];
                    console.log(person);
                    if (person.email.toLowerCase() == email) {
                        findclassroom(classroomid);
                        console.log(name);
                        hideSignInButton(name);
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
            console.log(currentDeskArray);
            refreshClassroom();
            break;
        }
    }

}

function hideSignInButton(name) {
    $('.signOutButton').show();
    $('.g-signin2').hide();
    $('.helpModal').show();

        //if admin- show everything
    if ( name == "ADMIN" ) {
        console.log('yes admin');
        $('.navBar').children('ul').show();
        $('.adminViews').show();
    }  else {
        $('.navBar').children('ul').hide();
        $('.adminViews').hide();
    }
}
