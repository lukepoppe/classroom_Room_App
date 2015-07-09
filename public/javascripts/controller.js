/* Order of things:
 * 1. Get data / login to get user data
 * 2. Find YOUR user/cohort
 * 3. draw DOM
 * 4. Hide stuff depending on authentication
 */

/* MAKE GOOGLE A PROMISE, EXECUTE ALL STUFF THAT NEEDS USER AFTER THAT! */

///* Google signin, then authenticate */
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    APP.user.name = profile.getName();
    APP.user.image = profile.getImageUrl();
    APP.user.email = profile.getEmail().toLowerCase();

    APP.user.authenticate();
    APP.user.find(APP.userEmail);
}

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

        /* Draw the DOM */
        APP.DOM.init();
        //drawList();
    });

});

$(document).ready(function () {

    /* Draws the cohort dropdown contents on click */
    $('.dropdown').on('click', '.dropdown-menu li a', function () {
        // Id of the thing you click on is the cohort id. That gets assigned to the classroom, then sent to API.
        APP.classroomsArray[APP.classroomNumber].cohort = $(this).attr("id");
        APP.classrooms.update(APP.classroomNumber);
        /* The large text naming the chort gets updated.*/
        $('.cohortTitle').text($(this).text());
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
            APP.DOM.refresh();
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
        APP.DOM.refresh();
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
