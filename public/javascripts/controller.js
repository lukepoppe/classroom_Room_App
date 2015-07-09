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

            APP.cohortsArray = data;
            APP.currentPersonArray = APP.cohortsArray[APP.cohortNumber].personArray;

            /* 2. Find LOGGED-IN USER'S COHORT & CLASSROOM */
            APP.user.find(APP.user.email);

            /* 3. Draw DOM */
            //APP.DOM.init();
            /* Only run this one-time on page load */

            /* Load Status Modal */
            loadModal();

            /* MAKE THIS A PROMISE */
            var promise3 = APP.DOM.refresh();
            promise3.done(function (data) {
                APP.classTemplate = data;
                APP.DOM.refreshCallback(APP.classTemplate);
                APP.DOM.onClicks();

            });

        });

        /* 4. Hide stuff depending on admin or not happens inside of refresh/init (APP.user.authenticate)*/
    });
    //});
}

/* INITIALIZATION: NOT LOGGED-IN */


/* INITIALIZATION FOR ALL USERS */