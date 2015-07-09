/* INITIALIZATION: SIGNED IN USER (any google account!)
 * Order of actions:
 * 1. Get user data from Google
 * 2. Find LOGGED-IN USER'S COHORT & CLASSROOM
 * 3. Draw DOM
 * 4. Hide stuff depending on authentication
 */
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    APP.user.name = profile.getName();
    APP.user.image = profile.getImageUrl();
    APP.user.email = profile.getEmail().toLowerCase();

    /* Get class and cohorts array from DB, then paint desks.*/
    var promise1 = APP.classrooms.get();
    promise1.done(function (data) {
        console.log(data);
        APP.classroomsArray = data;
        APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;

        var promise2 = APP.cohorts.get();
        promise2.done(function (data) {
            console.log(data);

            APP.cohortsArray = data;
            APP.currentPersonArray = APP.cohortsArray[APP.cohortNumber].personArray;

            /* 2. Find LOGGED-IN USER'S COHORT & CLASSROOM */
            APP.user.find(APP.user.email);

            /* 3. Draw DOM */
            APP.DOM.init();
            /* 4. Hide stuff depending on admin or not happens inside of refresh/init (APP.user.authenticate)*/
        });
    });
}

/* INITIALIZATION: NOT LOGGED-IN */


/* INITIALIZATION FOR ALL USERS */

$(document).ready(function () {

    /* Draws the cohort dropdown contents on click */
    $('.dropdown').off('click').on('click', '.dropdown-menu li a', function () {
        // Id of the thing you click on is the cohort id. That gets assigned to the classroom, then sent to API.
        APP.classroomsArray[APP.classroomNumber].cohort = $(this).attr("id");
        APP.classrooms.update(APP.classroomNumber);
        /* The large text naming the chort gets updated.*/
        $('.cohortTitle').text($(this).text());
    });
    // Close Button On Click (Delete Classroom Modal)
    $('.navBar').off('click').on('click', '.closeX', function () {
        var classroomNumberToDelete = $(this).data('classroom');
        $('.warnOfClassName').empty().append(APP.classroomsArray[classroomNumberToDelete].name);
        $('.deleteButton').off('click').on('click', function () {
            APP.classrooms.delete(classroomNumberToDelete);
        })
    });
    // Edit Classroom Name On Click
    $('.editClassroomNameButton').off('click').on('click', function () {
        $('#newClassName').val(APP.classroomsArray[APP.classroomNumber].name);
        $('.confirmEditButton').off('click').on('click', function () {
            APP.classroomsArray[APP.classroomNumber].name = $('#newClassName').val();
            APP.classrooms.update(APP.classroomNumber);
        });
    });
    // Checkbox
    $('.onoffswitch-label').off('click').click(function () {
        $(this).parent().toggleClass('onoffswitch-checked');
        if ($(this).parent().hasClass('onoffswitch-checked')) {
            APP.toggleEditing = false;
        } else {
            APP.toggleEditing = true;
        }
    });
    // Set On Click of Grid Blocks
    $('.classroom').off('click').on('click', '.block', function () {
        console.log('click');
        // IF editing is enabled
        if (APP.toggleEditing === true) {
            var clickedPosition = $(this).attr('id');

            if ($(this).hasClass('occupied')) {
                // Erase a desk from client-side array
                APP.currentDeskArray = APP.currentDeskArray.filter(function (obj) {
                    return obj.position !== clickedPosition;
                });
            } else {
                // Create a desk with .block ID as position attribute.
                APP.currentDeskArray.push(new Desk(APP.currentDeskArray.length, clickedPosition, "", classroomNumber));
            }
            // Refresh Classroom with new data. Why this doesn't repaint desks? not sure..
            APP.DOM.refresh();
        }
        if (APP.toggleEditing === false) {
            console.log("editing disabled");
        }
    });
    // Set On Click of Classroom Selector Links
    $('.navBar').off('click').on('click', '.classroomSelector', function () {
        $('.classroomShit').show();
        console.log('click');
        APP.classroomNumber = $(this).data('classroom');
        APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;
        APP.DOM.refresh();
        $('.adminViews').show();
        $('.cohortListDiv').show();
    });
    // Set On Click of Plus Button (Create New Classroom)
    $('.navBar').off('click').on('click', '.newClassroomButton', function () {
        APP.classroomNumber = APP.classroomsArray.length;
        APP.classroomsArray.push(new Classroom(APP.cohortNumber, "Bloomington", "defaultName"));
        APP.classrooms.add();
    });
    // Set On Click of Save Button (toggle?)
    $('.saveButton').off('click').on('click', function () {
        APP.classrooms.update(APP.classroomNumber);
    });
});