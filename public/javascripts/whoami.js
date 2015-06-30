//find human in a cohort
function findhuman(email) {
    var cohort;
    var person;
    var classroomid;
    console.log(cohortsArray);
    for (var i = 0; i < cohortsArray.length; i++){
            cohort = cohortsArray[i];
            classroomid = cohort._id;
                for (var j = 0; j < cohort.personArray.length; j++) {
                    person = cohort.personArray[j];
                    console.log(person);
                    if (person.email.toLowerCase() == email) {
                        userCohortNumber = i;
                        findclassroom(classroomid);
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