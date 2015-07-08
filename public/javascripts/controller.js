// Get class and cohorts array from DB
APP.classrooms.get();
APP.cohorts.get();

$(document).ready(function () {
    // Status Modal
    loadModal();
    //click function for dropdown
    //add cohort id to classroom cohort property
    $('.dropdown').on('click', '.dropdown-menu li a', function () {
        classroomsArray[classroomNumber].cohort = $(this).attr("id");
        console.log(classroomsArray, classroomsArray[classroomNumber].cohort);
        updateClassroom(classroomNumber);
        var cohortTitle = $(this).text();
        $('.cohortTitle').text(cohortTitle);
    });
    // Close Button On Click (Delete Classroom Modal)
    $('.navBar').on('click', '.closeX', function () {
        var classroomNumberToDelete = $(this).data('classroom');
        $('.warnOfClassName').empty().append(classroomsArray[classroomNumberToDelete].name);
        $('.deleteButton').on('click', function () {
            console.log(classroomNumberToDelete);
            deleteClassroomFromDB(classroomNumberToDelete);
        })
    });
    // Edit Classroom Name On Click
    $('.editClassroomNameButton').on('click', function () {
        $('#newClassName').val(classroomsArray[classroomNumber].name);
        $('.confirmEditButton').on('click', function () {
            classroomsArray[classroomNumber].name = $('#newClassName').val();
            updateClassroom(classroomNumber);
        });
    });
    // Checkbox
    $('.onoffswitch-label').click(function () {
        $(this).parent().toggleClass('onoffswitch-checked');
        if ($(this).parent().hasClass('onoffswitch-checked')) {
            toggleEditing = false;
        } else {
            toggleEditing = true;
        }
    });
    // Set On Click of Grid Blocks
    $('.classroom').on('click', '.block', function () {
        console.log('click');
        // IF editing is enabled
        if (toggleEditing === true) {
            var clickedPosition = $(this).attr('id');

            if ($(this).hasClass('occupied')) {
                // Erase a desk from client-side array
                currentDeskArray = currentDeskArray.filter(function (obj) {
                    return obj.position !== clickedPosition;
                });
            } else {
                // Create a desk with .block ID as position attribute.
                currentDeskArray.push(new Desk(currentDeskArray.length, clickedPosition, "", classroomNumber));
            }
            // Refresh Classroom with new data. Why this doesn't repaint desks? not sure..
            refreshClassroom();
        }
        if (toggleEditing === false) {
            console.log("editing disabled");
        }
    });
    // Set On Click of Classroom Selector Links
    $('.navBar').on('click', '.classroomSelector', function () {
        $('.classroomShit').show();
        classroomNumber = $(this).data('classroom');
        currentDeskArray = classroomsArray[classroomNumber].deskArray;
        refreshClassroom();
        $('.adminViews').show();
        $('.cohortListDiv').show();
    });
    // Set On Click of Plus Button (Create New Classroom)
    $('.navBar').on('click', '.newClassroomButton', function () {
        classroomNumber = classroomsArray.length;
        classroomsArray.push(new Classroom(cohortNumber, "Bloomington", "defaultName"));
        createClassroomInDB();
    });
    // Set On Click of Save Button (toggle?)
    $('.saveButton').on('click', function () {
        updateClassroom(classroomNumber);
    });
});
