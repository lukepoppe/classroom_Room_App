function findhuman(email) {
    var cohort;
    var person;
    var classroomid;
    if (cohortsArray != undefined) {
        for (var i = 0; i < cohortsArray.length; i++){
            cohort = cohortsArray[i];
            classroomid = cohort.classroom;
            if (cohort.personArray != undefined) {
                for (var j = 0; j < cohort.personArray.length; j++) {
                    person = cohort.personArray[i];
                    if (person.hasOwnProperty('email')) {
                        if (person.email == email) {
                            return classroomid;
                        }
                    }
                }
            }
        }
    }
}

//find classroom for current user
function findclassroom(id) {
    var classroom;
    for (var i = 0; i < classroomsArray.length; i++) {
        classroom = classroomsArray[i];
        if (classroom[_id] == id) {
            currentDeskArray = classroomsArray[i].deskArray;
            refreshClassroom();
        }
    }
}