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
            }
        } else {
            /* If user is not in our DB, sign them out with message */
            signOut();
            console.log("Sorry, you are not in the classroom db");
        }

//        var shuffled;
//
//        /* Loop through cohorts array, find cohort that matches the cohort id which is assigned to classroom
//         * Assign that cohort index to GLOBAL VAR cohortNumber */
//        for (var i = 0; i < APP.cohortsArray.length; i++) {
//            if (APP.cohortsArray[i]._id == APP.classroomsArray[APP.classroomNumber].cohort) {
//                APP.cohortNumber = i;
//            }
//        }
//
//        /* Empty cohort list
//         * Cycle through classnames Array, which contains everyone in this cohort
//         * So for each person, we will then go through the entire desk array searching for them.
//         * Probably more logical just to go through all the desks.
//         * In fact, isn't that already done somewhere else?
//         */
//        //$(".cohort_list").children().remove();
//        //var savedToDesk;
//        //
//        //classnames = APP.cohortsArray[APP.cohortNumber].personArray;
//        //
//        //classnames.forEach(function (thisRoomPerson) {
//        //    savedToDesk = false;
//        //    for (var i = 0; i < APP.currentDeskArray.length; i++) {
//        //        /* If person is found in currentDeskArray,
//        //         * append <p> tag to that desk div*/
//        //        if (APP.currentDeskArray[i].person == thisRoomPerson._id) {
//        //            var currentDiv = '#' + APP.currentDeskArray[i].position;
//        //            $(currentDiv).append('<p data-id="' + thisRoomPerson._id + '" data-flag="' + thisRoomPerson.help_status.flag + '"class="assignedPerson person">' + thisRoomPerson.firstName + '</p>');
//        //            //console.log(thisRoomPerson.firstName, thisRoomPerson.help_status.flag);
//        //            //color_desks(thisRoomPerson.help_status.flag, currentDiv);
//        //            saved = true;
//        //        }
//        //    }
//        //    /* Draw the list of cohort people yet to be dragged into desks */
//        //    if (savedToDesk == false) {
//        //        $('.cohort_list').append('<li class="unassignedPerson person" data-id="' + thisRoomPerson._id + '">' + thisRoomPerson.firstName + '</li>');
//        //    }
//        //});
//
//        /* Make both assigned and unassigned names draggable */
//        init_drag('.unassignedPerson');
//        init_drag('.assignedPerson');
//
//        $('.clearButton').click(function () {
//            $('.assignedPerson').text('');
//            appendnames();
//            clear_desks();
//            init_drag('.unassignedPerson');
//        });
//
//        $(".randomizeButton").click(function () {
//            $('.assignedPerson').text('');
//            clear_desks();
//            shuffled = shuffle(APP.cohortsArray[APP.cohortNumber].personArray);
//            APP.currentDeskArray = shuffle(APP.currentDeskArray);
//            for (var i = 0; i < shuffled.length; i++) {
//                var select = currentDeskArray[i];
//                var id = $('#' + select);
//                var randomname = shuffled[i].firstName;
//
//                if (id.children().length == 0) {
//                    id.append('<p class="assignedPerson"></p>');
//                }
//
//                id.find('p').text(randomname);
//
//                fill_desk(shuffled[i].id, select);
//            }
//
//            $(".cohort_list").children().remove();
//            init_drag('.assignedPerson');
//        });
//
//
//        if (APP.admin) {
//            console.log('here');
//            $(function () {
//                init_drag('.unassignedPerson');
//
//                $('.occupied').droppable({
//                    drop: function (event, ui) {
//
//                        /* Get attributes of dragged and dropped items */
//                        var targetDiv = $(this);
//                        var desk_id = targetDiv.attr('id');
//                        var personId = ui.draggable.data('id');
//                        var name = ui.draggable.text();
//
//                        /* Take person out of old deskArray, put in new deskArray */
//                        empty_desk(personId);
//                        fill_desk(personId, desk_id);
//
//                        /* If target div is empty, append an empty label */
//                        if (targetDiv.children().length == 0) {
//                            targetDiv.append('<p class="assignedPerson" data-id="' + personId + '"></p>');
//                        }
//
//                        /* Find the empty label in the target div */
//                        var targetLabel = targetDiv.find('p');
//                        //var text = title.data('id');
//
//                        /* IF RETURNING TO COHORT LIST */
//                        //if (text != "" && text != name) {
//                        //    $('.cohort_list').append('<li class="unassignedPerson">' + text + '</li>');
//                        //    init_drag('.unassignedPerson');
//                        //}
//
//                        ui.draggable.remove();
//
//                        /* IF dropping on desk where name already was ? */
//                        //if (name == text) {
//                        //    targetDiv.append('<p class="assignedPerson"></p>');
//                        //    title = targetDiv.find("p");
//                        //}
//
//                        init_drag('.assignedPerson');
//                        /* Write the name on the target label */
//                        targetLabel.text(name);
//
//                    },
//                    tolerance: "pointer"
//                });
//
//                $(".cohort_list").droppable({
//                    accept: ".assignedPerson",
//                    drop: function (event, ui) {
//                        var item = ui.draggable.html();
//
//                        empty_desk(item);
//
//                        $(this).append('<li class="unassignedPerson">' + item + '</li>');
//                        init_drag(".unassignedPerson");
//                        ui.draggable.remove();
//                    }
//                })
//            });
//        }
//
//        //add cohort names to list
//        function appendnames() {
//            $(".cohort_list").children().remove();
//            APP.cohortsArray[APP.cohortNumber].personArray.forEach(function (value) {
//                $('.cohort_list').append('<li class="unassignedPerson">' + value.firstName + '</li>');
//            });
//        }
//
//        //clear out person attribute in all desk objects
//        function clear_desks() {
//            for (var i = 0; i < APP.currentDeskArray.length; i++) {
//                APP.currentDeskArray[i].person = '';
//            }
//        }
//
//        //empty desk on drag event
//        function empty_desk(personId) {
//            for (var i = 0; i < APP.currentDeskArray.length; i++) {
//                if (APP.currentDeskArray[i].person == personId) {
//                    APP.currentDeskArray[i].person = '';
//                    break;
//                }
//            }
//        }
//
//        //add student to the current desk array
//        function fill_desk(personId, deskId) {
//            for (var i = 0; i < APP.currentDeskArray.length; i++) {
//                if (APP.currentDeskArray[i].position == deskId) {
//                    APP.currentDeskArray[i].person = personId;
//                    break;
//                }
//            }
//        }
//
//
//        // initialize draggable item
//        function init_drag(el) {
//            if (APP.admin) {
//                $(el).draggable({
//                    cursor: "move",
//                    revert: "invalid",
//                    stack: el
//                });
//            }
//        }
//
        ////shuffle the array
//        function shuffle(array) {
//            var currentIndex = array.length, temporaryValue, randomIndex;
//
//            // While there remain elements to shuffle...
//            while (0 !== currentIndex) {
//
//                // Pick a remaining element...
//                randomIndex = Math.floor(Math.random() * currentIndex);
//                currentIndex -= 1;
//
//                // And swap it with the current element.
//                temporaryValue = array[currentIndex];
//                array[currentIndex] = array[randomIndex];
//                array[randomIndex] = temporaryValue;
//            }
//            return array;
//        }
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
