/* DOM DRAWING Services */

APP.DOM = {
    assignPeople: function () {

        var shuffled;

        /* If classroom has changed... find the cohort for that classroom. */
        for (var i = 0; i < APP.cohortsArray.length; i++) {
            if (APP.cohortsArray[i]._id == APP.classroomsArray[APP.classroomNumber].cohort) {
                APP.cohortNumber = i;
            }
        }

        /* Empty cohort list
         * Cycle through classnames Array, which contains everyone in this cohort
         * So for each person, we will then go through the entire desk array searching for them.
         * Probably more logical just to go through all the desks.
         * In fact, isn't that already done somewhere else?
         */
        $(".cohort_list").children().remove();
        var savedToDesk;

        APP.cohortsArray[APP.cohortNumber].personArray.forEach(function (thisRoomPerson) {
            savedToDesk = false;
            for (var i = 0; i < APP.currentDeskArray.length; i++) {
                /* If person is found in currentDeskArray,
                 * append <p> tag to that desk div*/
                if (APP.currentDeskArray[i].person == thisRoomPerson._id) {
                    var currentDiv = '#' + APP.currentDeskArray[i].position;
                    $(currentDiv).append('<p data-id="' + thisRoomPerson._id + '" data-flag="' + thisRoomPerson.help_status.flag + '"class="assignedPerson person">' + thisRoomPerson.firstName + '</p>');
                    //console.log(thisRoomPerson.firstName, thisRoomPerson.help_status.flag);
                    //color_desks(thisRoomPerson.help_status.flag, currentDiv);
                    saved = true;
                }
            }
            /* Draw the list of cohort people yet to be dragged into desks */
            if (savedToDesk == false) {
                $('.cohort_list').append('<li class="unassignedPerson person" data-id="' + thisRoomPerson._id + '">' + thisRoomPerson.firstName + '</li>');
            }
        });

        ///* Make both assigned and unassigned names draggable */
        //init_drag('.unassignedPerson');
        //init_drag('.assignedPerson');
        //
        //$('.clearButton').click(function () {
        //    $('.assignedPerson').text('');
        //    appendnames();
        //    clear_desks();
        //    init_drag('.unassignedPerson');
        //});
        //
        //$(".randomizeButton").click(function () {
        //    $('.assignedPerson').text('');
        //    clear_desks();
        //    shuffled = shuffle(APP.cohortsArray[APP.cohortNumber].personArray);
        //    APP.currentDeskArray = shuffle(APP.currentDeskArray);
        //    for (var i = 0; i < shuffled.length; i++) {
        //        var select = currentDeskArray[i];
        //        var id = $('#' + select);
        //        var randomname = shuffled[i].firstName;
        //
        //        if (id.children().length == 0) {
        //            id.append('<p class="assignedPerson"></p>');
        //        }
        //
        //        id.find('p').text(randomname);
        //
        //        fill_desk(shuffled[i].id, select);
        //    }
        //
        //    $(".cohort_list").children().remove();
        //    init_drag('.assignedPerson');
        //});
        //
        //
        //if (APP.admin) {
        //    console.log('here');
        //    $(function () {
        //        init_drag('.unassignedPerson');
        //
        //        $('.occupied').droppable({
        //            drop: function (event, ui) {
        //
        //                /* Get attributes of dragged and dropped items */
        //                var targetDiv = $(this);
        //                var desk_id = targetDiv.attr('id');
        //                var personId = ui.draggable.data('id');
        //                var name = ui.draggable.text();
        //
        //                /* Take person out of old deskArray, put in new deskArray */
        //                empty_desk(personId);
        //                fill_desk(personId, desk_id);
        //
        //                /* If target div is empty, append an empty label */
        //                if (targetDiv.children().length == 0) {
        //                    targetDiv.append('<p class="assignedPerson" data-id="' + personId + '"></p>');
        //                }
        //
        //                /* Find the empty label in the target div */
        //                var targetLabel = targetDiv.find('p');
        //                //var text = title.data('id');
        //
        //                /* IF RETURNING TO COHORT LIST */
        //                //if (text != "" && text != name) {
        //                //    $('.cohort_list').append('<li class="unassignedPerson">' + text + '</li>');
        //                //    init_drag('.unassignedPerson');
        //                //}
        //
        //                ui.draggable.remove();
        //
        //                /* IF dropping on desk where name already was ? */
        //                //if (name == text) {
        //                //    targetDiv.append('<p class="assignedPerson"></p>');
        //                //    title = targetDiv.find("p");
        //                //}
        //
        //                init_drag('.assignedPerson');
        //                /* Write the name on the target label */
        //                targetLabel.text(name);
        //
        //            },
        //            tolerance: "pointer"
        //        });
        //
        //        $(".cohort_list").droppable({
        //            accept: ".assignedPerson",
        //            drop: function (event, ui) {
        //                var item = ui.draggable.html();
        //
        //                empty_desk(item);
        //
        //                $(this).append('<li class="unassignedPerson">' + item + '</li>');
        //                init_drag(".unassignedPerson");
        //                ui.draggable.remove();
        //            }
        //        })
        //    });
        //}
        //
        ////add cohort names to list
        //function appendnames() {
        //    $(".cohort_list").children().remove();
        //    APP.cohortsArray[APP.cohortNumber].personArray.forEach(function (value) {
        //        $('.cohort_list').append('<li class="unassignedPerson">' + value.firstName + '</li>');
        //    });
        //}
        //
        ////clear out person attribute in all desk objects
        //function clear_desks() {
        //    for (var i = 0; i < APP.currentDeskArray.length; i++) {
        //        APP.currentDeskArray[i].person = '';
        //    }
        //}
        //
        ////empty desk on drag event
        //function empty_desk(personId) {
        //    for (var i = 0; i < APP.currentDeskArray.length; i++) {
        //        if (APP.currentDeskArray[i].person == personId) {
        //            APP.currentDeskArray[i].person = '';
        //            break;
        //        }
        //    }
        //}
        //
        ////add student to the current desk array
        //function fill_desk(personId, deskId) {
        //    for (var i = 0; i < APP.currentDeskArray.length; i++) {
        //        if (APP.currentDeskArray[i].position == deskId) {
        //            APP.currentDeskArray[i].person = personId;
        //            break;
        //        }
        //    }
        //}
        //
        //
        //// initialize draggable item
        //function init_drag(el) {
        //    if (APP.admin) {
        //        $(el).draggable({
        //            cursor: "move",
        //            revert: "invalid",
        //            stack: el
        //        });
        //    }
        //}

        ////shuffle the array
        //function shuffle(array) {
        //    var currentIndex = array.length, temporaryValue, randomIndex;
        //
        //    // While there remain elements to shuffle...
        //    while (0 !== currentIndex) {
        //
        //        // Pick a remaining element...
        //        randomIndex = Math.floor(Math.random() * currentIndex);
        //        currentIndex -= 1;
        //
        //        // And swap it with the current element.
        //        temporaryValue = array[currentIndex];
        //        array[currentIndex] = array[randomIndex];
        //        array[randomIndex] = temporaryValue;
        //    }
        //    return array;
        //}
    },
    cohortPage: function () {
        $('.classroomShit').hide();
        $('.cohort_list').empty();
        $('.entryList').hide();
        $('.showList').hide();
        $('.cohortListDiv').hide();

        drawList();

        $('.submitPerson').on("click", function () {
            console.log('submitPerson clicked');
            submitPerson();
            $('.showList').show();
        });


        function submitPerson() {
            APP.cohortsArray[APP.cohortNumber].personArray.push(new Person($('#firstName').val(), $('#lastName').val(), $('#email').val(), "student"));
            drawList();
            $('#firstName').val("");
            $('#lastName').val("");
            $('#email').val("");
            APP.cohorts.update(APP.cohortNumber);
        }

        function drawList() {
            // Redraw list of cohorts on left
            $('.cohortList').empty();
            for (var i = 0; i < APP.cohortsArray.length; i++) {
                $('.cohortList').append("<li class='cohortListClass'><a href='#' class ='cohortID' id ='" + APP.cohortsArray[i]._id + "' data-cohortnumber=" + i + ">" + APP.cohortsArray[i].name + "</a><button class='btn btn-danger deleteCohort' data-target='#deleteCohort' data-toggle='modal'>Delete</button><button class='editCohortName btn btn-primary' data-target='#editCohortName' data-toggle='modal'>Edit Name</button></li>");
            }

            // On Click of cohort list
            $('.cohortList').on('click', '.cohortID', function () {
                $('.entryList').show();
                $('.showList').show();
                APP.cohortNumber = $(this).data('cohortnumber');
                //cohortID = $(this).attr('id');
                APP.currentPersonArray = APP.cohortsArray[APP.cohortNumber].personArray;
                drawList();
            });

            // On Click of Delete Cohort
            $('.deleteCohort').click(function () {
                var cohortIdToDelete = ($(this).siblings('a').attr('id'));
                $('.warnOfCohortName').empty().append($(this).siblings('a').text());
                $('.deleteCohortButton').on('click', function () {
                    APP.cohorts.delete(cohortIdToDelete);
                });
            });

            // On Click of Edit Cohort
            $('.editCohortName').on('click', function () {
                //var coh = ($(this).siblings('a').attr('id'));
                APP.cohortNumber = $(this).siblings('a').data('cohortnumber');
                $('#newCohortName').val($(this).siblings('a').text());
                $('.confirmCohortEditButton').on('click', function () {
                    APP.cohortsArray[APP.cohortNumber].name = $('#newCohortName').val();
                    APP.cohorts.update(APP.cohortNumber);
                });
            });
            // Create New Cohort Button
            $('.cohortList').append('<li><button class="createCohort btn btn-success">Create a New Cohort</button></li>');

            // On Click of New Cohort Button
            $('.createCohort').on("click", function () {
                console.log("createCohort clicked");
                APP.cohorts.add();
            });

            // Draw title of cohort on right
            $('.headline').empty().append("<h1>" + APP.cohortsArray[APP.cohortNumber].name + "</h1>");

            // Draw list of people from cohort
            $('.showList').children('ul').empty();
            for (var i = 0; i < APP.currentPersonArray.length; i++) {
                $('.showList').children('ul').append("<li class='studentList' data-number='" + i + "'>" + APP.currentPersonArray[i].firstName + " " + APP.currentPersonArray[i].lastName + " | " + APP.currentPersonArray[i].email + "    <button class='btn btn-danger deleteName' data-target='#deletePerson' data-toggle='modal'>Delete</button><button class='editName btn btn-primary' data-target='#editPersonName' data-toggle='modal'>Edit</button></li>");
            }

            // On Click of Edit Name
            $('.editName').click(function () {
                var nameNumber = $(this).parent('li').data('number');
                $('#newPersonFirstName').val(APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].firstName);
                $('#newPersonLastName').val(APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].lastName);
                $('#newPersonEmail').val(APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].email);
                $('.confirmPersonEditButton').on('click', function () {
                    console.log('click');
                    APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].firstName = $('#newPersonFirstName').val();
                    APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].lastName = $('#newPersonLastName').val();
                    APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].email = $('#newPersonEmail').val();
                    APP.cohorts.update(APP.cohortNumber);
                });
            });

            // On Click of Delete Name
            $('.deleteName').click(function () {
                var nameNumber = $(this).parent('li').data('number');
                $('.warnOfPersonName').empty().append(APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].firstName + " " + APP.cohortsArray[APP.cohortNumber].personArray[nameNumber].lastName);
                $('.deleteNameButton').on('click', function () {
                    APP.cohortsArray[APP.cohortNumber].personArray.splice(nameNumber, 1);
                    APP.cohorts.update(APP.cohortNumber);
                });
            });
        }
    },
    colorDesks: function () {

        var div;
        var savedToDesk;

        /* Draw people names both on desks and in cohort list */
        //APP.cohortsArray[APP.cohortNumber].personArray.forEach(function (thisRoomPerson) {
        //    savedToDesk = false;
        //    for (var i = 0; i < APP.currentDeskArray.length; i++) {
        //
        //        /* If person is found in currentDeskArray, append <p> tag to that desk div*/
        //        if (APP.currentDeskArray[i].person == thisRoomPerson._id) {
        //            //console.log(thisRoomPerson);
        //            var div = '#' + APP.currentDeskArray[i].position;
        //            $(div).append('<p data-id="' + thisRoomPerson._id + '" data-flag="' + thisRoomPerson.help_status.flag + '"class="assignedPerson person">' + thisRoomPerson.firstName + '</p>');
        //            APP.DOM.colorDesks(thisRoomPerson.help_status.flag, div);
        //            saved = true;
        //        }
        //    }
        //    /* Draw the list of cohort people yet to be dragged into desks */
        //    if (savedToDesk == false) {
        //        $('.cohort_list').append('<li class="unassignedPerson person" data-id="' + thisRoomPerson._id + '">' + thisRoomPerson.firstName + '</li>');
        //    }
        //});

        /* Draw a desk if there should be one there */
        for (var i = 0; i < APP.currentDeskArray.length; i++) {

            div = $('#' + APP.currentDeskArray[i].position);

            div.toggleClass('occupied');

            /* If a person is assigned to a desk, color it based on data-flag attribute */

            if (APP.currentDeskArray[i].person) {

                switch (div.children('p').data('flag')) {
                    case "green":
                        $(div).css('background-color', '#009933');
                        break;
                    case "yellow":
                        $(div).css('background-color', '#FFFF66');
                        break;
                    case "red":
                        $(div).css('background-color', '#FF0000');
                        break;
                }
            }
        }
    },
    dropdown: function () {
        $('.dropdown-menu').children().empty();
        if (APP.cohortsArray != undefined) {
            APP.cohortsArray.forEach(function (cohort) {
                var cohortname = cohort.name;
                var cohortid = cohort._id;
                var el = "<li><a id='" + cohortid + "' href='#'>" + cohortname + "</a></li>";
                $('.dropdown-menu').append(el);
            })
        }
    }
    ,
    init: function () {
        /* Only run this one-time on page load */

        /* Load Status Modal */
        loadModal();

        APP.DOM.refresh();
    },
    navbar: function () {
        navBar = "";
        for (i = 0; i < APP.classroomsArray.length; i++) {
            navBar += "<li>" + "<a href='#' class='classroomSelector' data-classroom='" + i + "'>" + APP.classroomsArray[i].name + "</a><a href='#' class='closeX hidden' data-toggle='modal' data-target='#confirm-delete' data-classroom='" + i + "'>" + " X</a><span class='divider'>|</span></li>";
        }
        navBar += "<li><a href='#' class='newClassroomButton hidden'>+</a><span class='divider lastpipe hidden'>|</span></li><li class='adminViews'><a href='#' class='cohortLink hidden'>Cohorts</a></li>";
        $('.navBar').children('ul').empty().append(navBar);

        // Cohorts on Click
        $('.cohortLink').off('click').click(function () {
            $('.classroom').load("people/cohorts.html", function () {
                APP.DOM.cohortPage();
            });
            $('.adminViews').hide();
        });
        // Set On Click of Classroom Selector Links
        $('.classroomSelector').off('click').on('click', function () {
            $('.classroomShit').show();
            APP.classroomNumber = $(this).data('classroom');
            APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;
            APP.DOM.refreshCallback(APP.classTemplate);
            $('.adminViews').show();
            $('.cohortListDiv').show();
        });
        // Set On Click of Plus Button (Create New Classroom)
        $('.newClassroomButton').off('click').on('click', function () {
            APP.classroomNumber = APP.classroomsArray.length;
            APP.classroomsArray.push(new Classroom(APP.cohortNumber, "Bloomington", "defaultName"));
            APP.classrooms.add();
        });

    },
    onClicks: function(){

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
                APP.DOM.refreshCallback(APP.classTemplate);
            }
            if (APP.toggleEditing === false) {
                console.log("editing disabled");
            }
        });
        // Set On Click of Save Button (toggle?)
        $('.saveButton').off('click').on('click', function () {
            APP.classrooms.update(APP.classroomNumber);
        });
    },
    refresh: function () {
        /* AJAX LOAD OF CLASSROOM GRID */
        return $.get('classroom.html', function (data) {
            return data;
        });
    },
    refreshCallback: function (page) {
        $('.classroom').empty().append(page);

        /* Cohort title draw */
        $('.cohortTitle').text(APP.cohortsArray[APP.cohortNumber].name);
        /* Classroom Name Draw (Teacher) */
        $('.classRoomName').text(APP.classroomsArray[APP.classroomNumber].name);

        /* Draw NAVBAR */
        APP.DOM.navbar();
        /* Draw COHORT DROPDOWN */
        APP.DOM.dropdown();
        /* HIDE STUFF BASED ON USER ADMIN OR NOT */
        APP.user.authenticate();
        /*Color desks that are desks, also draw statuses and people in desks */
        APP.DOM.colorDesks();
    },
    statusColor: function () {
        if (APP.user.help_status.flag == 'red') {
            redStatus();
        } else if (APP.user.help_status.flag == 'yellow') {
            yellowStatus();
        } else {
            greenStatus();
        }

    }
};
