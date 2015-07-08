// Get class and cohorts array from DB
APP.classrooms.get();
APP.cohorts.get();

$(document).ready(function () {

    // Status Modal
    loadModal();

    //click function for dropdown
    //add cohort id to classroom cohort property
    $('.dropdown').on('click', '.dropdown-menu li a', function () {
        APP.classroomsArray[APP.classroomNumber].cohort = $(this).attr("id");
        APP.classrooms.update(APP.classroomNumber);
        var cohortTitle = $(this).text();
        $('.cohortTitle').text(cohortTitle);
    });
    // Close Button On Click (Delete Classroom Modal)
    $('.navBar').on('click', '.closeX', function () {
        var classroomNumberToDelete = $(this).data('classroom');
        $('.warnOfClassName').empty().append(APP.classroomsArray[classroomNumberToDelete].name);
        $('.deleteButton').on('click', function () {
            APP.classrooms.delete(classroomNumberToDelete);
        })
    });
    // Edit Classroom Name On Click
    $('.editClassroomNameButton').on('click', function () {
        $('#newClassName').val(APP.classroomsArray[APP.classroomNumber].name);
        $('.confirmEditButton').on('click', function () {
            APP.classroomsArray[APP.classroomNumber].name = $('#newClassName').val();
            APP.classrooms.update(APP.classroomNumber);
        });
    });
    // Checkbox
    $('.onoffswitch-label').click(function () {
        $(this).parent().toggleClass('onoffswitch-checked');
        if ($(this).parent().hasClass('onoffswitch-checked')) {
            APP.toggleEditing = false;
        } else {
            APP.toggleEditing = true;
        }
    });
    // Set On Click of Grid Blocks
    $('.classroom').on('click', '.block', function () {
        console.log('click');
        // IF editing is enabled
        if (APP.toggleEditing === true) {
            var clickedPosition = $(this).attr('id');

            if ($(this).hasClass('occupied')) {
                // Erase a desk from client-side array
                APP.currentDeskArray = currentDeskArray.filter(function (obj) {
                    return obj.position !== clickedPosition;
                });
            } else {
                // Create a desk with .block ID as position attribute.
                APP.currentDeskArray.push(new Desk(APP.currentDeskArray.length, clickedPosition, "", classroomNumber));
            }
            // Refresh Classroom with new data. Why this doesn't repaint desks? not sure..
            APP.DOM.classroom();
        }
        if (APP.toggleEditing === false) {
            console.log("editing disabled");
        }
    });
    // Set On Click of Classroom Selector Links
    $('.navBar').on('click', '.classroomSelector', function () {
        $('.classroomShit').show();
        APP.classroomNumber = $(this).data('classroom');
        APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;
        APP.DOM.classroom();
        $('.adminViews').show();
        $('.cohortListDiv').show();
    });
    // Set On Click of Plus Button (Create New Classroom)
    $('.navBar').on('click', '.newClassroomButton', function () {
        APP.classroomNumber = APP.classroomsArray.length;
        APP.classroomsArray.push(new Classroom(APP.cohortNumber, "Bloomington", "defaultName"));
        APP.classrooms.add();
    });
    // Set On Click of Save Button (toggle?)
    $('.saveButton').on('click', function () {
        APP.classrooms.update(APP.classroomNumber);
    });
});
