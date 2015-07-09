/* User Auth Services */

APP.user = {
    authenticate: function () {

        /* UNHIDE stuff based on user authentication */
        if (APP.user.authenticated) {
            $('.userNameDom').empty();
            $('.userImageDom').empty();
            $('.userNameDom').append(APP.userName);
            $('.userImageDom').append('<img src=" ' + APP.userImage + ' "id="userImageDom">');
            $('.signOutButton').removeClass('hidden');
            $('.g-signin2').addClass('hidden');
            $('.helpModalButton').removeClass('hidden');
            $('.label').removeClass('hidden');
            if (APP.user.help_status.flag == 'red') {
                redStatus();
            } else if (APP.user.help_status.flag == 'yellow') {
                yellowStatus();
            } else {
                greenStatus();
            }
            if (APP.user.admin) {
                $('.newClassroomButton').removeClass('hidden');
                $('.lastpipe').removeClass('hidden');
                $('.cohortLink').removeClass('hidden');
                $('.closeX').removeClass('hidden');
                $('.classroomShit').removeClass('hidden');
            }
        } else {
            //signOut();
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
    find: function (userEmail) {

        /* INPUT : USER'S EMAIL
         * OUTPUT: USER'S COHORT AND CLASSROOM
         */

        /* FIND USER'S COHORT */

        /* LOOP THROUGH COHORTS ARRAY */
        for (var i = 0; i < APP.cohortsArray.length; i++) {

            //classroomid = cohort._id;
            //name = cohort.name;

            /* LOOP THROUGH PEOPLE IN EACH COHORT*/

            for (var j = 0; j < APP.cohortsArray[i].personArray.length; j++) {

                if (APP.cohortsArray[i].personArray[j].email.toLowerCase() == userEmail) {
                    console.log(APP.cohortsArray[i].personArray[j]);

                    APP.user.cohort = i;

                    /* Help Status check */
                    APP.user.help_status = APP.cohortsArray[i].personArray[j].help_status;

                    APP.user.authenticated = true;
                    if (APP.cohortsArray[i].name == "ADMIN") {
                        APP.user.admin = true;
                    }
                    break;
                }
            }
        }

        /* Find Classroom User is in */
        //for (var i = 0; i < APP.classroomsArray.length; i++) {
        //    if (APP.classroomsArray[i].cohort == id) {
        //        //console.log(i, classroom.cohort, id);
        //        APP.classroomNumber = i;
        //        APP.currentDeskArray = classroom.deskArray;
        //        //refreshClassroom();
        //        break;
        //    }
        //}
        //
    }
};
