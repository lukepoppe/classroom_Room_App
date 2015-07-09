/* User Auth Services */

APP.user = {
    authenticate: function () {

        /* UNHIDE stuff based on user authentication */
        if (APP.user.authenticated) {

            /* Draw logged-in user name and image at top*/
            $('.userNameDom').empty();
            $('.userImageDom').empty();
            $('.userNameDom').append(APP.user.name);
            $('.userImageDom').append('<img src=" ' + APP.user.image + ' "id="userImageDom">');
            /* show sign out button, hide sign-in */
            $('.signOutButton').removeClass('hidden');
            $('.g-signin2').addClass('hidden');

            APP.DOM.statusColor();

            /* If admin, remove hidden from many things.*/
            if (APP.user.admin) {
                $('.newClassroomButton').removeClass('hidden');
                $('.lastpipe').removeClass('hidden');
                $('.cohortLink').removeClass('hidden');
                $('.closeX').removeClass('hidden');
                $('.classroomShit').removeClass('hidden');

                /* Gives ability to move people in and out of desks */
                APP.DOM.assignPeople();
            }
        } else {
            /* If user is not in our DB, sign them out with message */
            signOut();
            console.log("Sorry, you are not in the classroom db");
        }
    },
    changeStatus: function () {
        /* get status message and timestamp*/
        APP.user.help_status.question = $('.helpModalTextbox').val();
        APP.user.help_status.timestamp = new Date;

        /* THIS IS DUPLICATION OF FINDHUMAN, so don't do it. Find cohort there.*/

        ///* Loop through array of people, find the matching email.
        // * Mistake: must search all people, not just the current cohort.*/
        //for (var i = 0; i < APP.cohortsArray[i].length; i++) {
        //    for (var j = 0; j < APP.cohortsArray[i].personArray[j].length; j++) {
        //
        //        if (APP.cohortsArray[i].personArray[j].email == APP.userEmail) {
        //            console.log('runs');
        //
        //            /* Push old help_status into help_history */
        //            APP.cohortsArray[APP.cohortNumber].personArray[i].help_history.push(APP.cohortsArray[APP.cohortNumber].personArray[i].help_status);
        //
        //            /* Set new help_status in array if there was a help_status before. */
        //            APP.cohortsArray[APP.cohortNumber].personArray[i].help_status = help_status;
        //
        //            /* Update cohort DB */
        //            APP.cohorts.update(APP.cohortNumber);
        //
        //        }
        //
        //    }
        //}
    },
    find: function (userEmail) {

        /* INPUT : USER'S EMAIL
         * OUTPUT: USER'S COHORT AND CLASSROOM
         */

        /* FIND USER'S COHORT */

        /* LOOP THROUGH COHORTS ARRAY */
        for (var i = 0; i < APP.cohortsArray.length; i++) {

            /* LOOP THROUGH PEOPLE IN EACH COHORT*/

            for (var j = 0; j < APP.cohortsArray[i].personArray.length; j++) {

                if (APP.cohortsArray[i].personArray[j].email.toLowerCase() == userEmail) {

                    /* Set both cohort index and id in APP.user */
                    APP.user.cohort = i;
                    APP.user.cohortId = APP.cohortsArray[i]._id;

                    /* Help Status check and set */
                    APP.user.help_status = APP.cohortsArray[i].personArray[j].help_status;
                    APP.DOM.statusColor();

                    /* If user is in ADMIN cohort, set APP.user.admin to true */
                    APP.user.authenticated = true;
                    if (APP.cohortsArray[i].name == "ADMIN") {
                        APP.user.admin = true;
                    }
                    break;
                }
            }
        }

        /* Find Classroom User is in */
        for (var i = 0; i < APP.classroomsArray.length; i++) {
            if (APP.classroomsArray[i].cohort == APP.user.cohortId) {

                /* Set user's classroom */
                APP.user.classroom = i;

                /* Set classroom in view */
                APP.classroomNumber = i;
                APP.currentDeskArray = APP.classroomsArray[i].deskArray;
                break;
            }
        }
    }
};
