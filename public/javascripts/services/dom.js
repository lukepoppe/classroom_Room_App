/* DOM DRAWING Services */

APP.DOM = {
    colorDesks: function () {

        //switch (flag) {
        //    case "green":
        //        $(position).css('background-color', '#009933');
        //        break;
        //    case "yellow":
        //        $(position).css('background-color', '#FFFF66');
        //        break;
        //    case "red":
        //        $(position).css('background-color', '#FF0000');
        //        break;
        //}
        var div;
        var savedToDesk;

        /* Draw people names both on desks and in cohort list */
        APP.cohortsArray[APP.cohortNumber].personArray.forEach(function (thisRoomPerson) {
            savedToDesk = false;
            for (var i = 0; i < APP.currentDeskArray.length; i++) {

                /* If person is found in currentDeskArray, append <p> tag to that desk div*/
                if (APP.currentDeskArray[i].person == thisRoomPerson._id) {
                    //console.log(thisRoomPerson);
                    var div = '#' + APP.currentDeskArray[i].position;
                    $(div).append('<p data-id="' + thisRoomPerson._id + '" data-flag="' + thisRoomPerson.help_status.flag + '"class="assignedPerson person">' + thisRoomPerson.firstName + '</p>');
                    APP.DOM.colorDesks(thisRoomPerson.help_status.flag, div);
                    saved = true;
                }
            }
            /* Draw the list of cohort people yet to be dragged into desks */
            if (savedToDesk == false) {
                $('.cohort_list').append('<li class="unassignedPerson person" data-id="' + thisRoomPerson._id + '">' + thisRoomPerson.firstName + '</li>');
            }
        });

        /* Draw a desk if there should be one there */
        for (var i = 0; i < APP.currentDeskArray.length; i++) {
            div = $('#' + APP.currentDeskArray[i].position);
            div.toggleClass('occupied');

            /* If a person is assigned to a desk, color it based on attribute */
            if (APP.currentDeskArray[i].person) {
                //console.log(APP.currentDeskArray[i].person);
                //console.log(div.children('p').data('flag'));
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
    },
    init: function () {
        /* Only run this one-time on page load */

        /* Load Status Modal */
        loadModal();

        APP.DOM.refresh();
        
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

    },
    navbar: function () {
        navBar = "";
        for (i = 0; i < APP.classroomsArray.length; i++) {
            navBar += "<li>" + "<a href='#' class='classroomSelector' data-classroom='" + i + "'>" + APP.classroomsArray[i].name + "</a><a href='#' class='closeX hidden' data-toggle='modal' data-target='#confirm-delete' data-classroom='" + i + "'>" + " X</a><span class='divider'>|</span></li>";
        }
        navBar += "<li><a href='#' class='newClassroomButton hidden'>+</a><span class='divider lastpipe hidden'>|</span></li><li class='adminViews'><a href='#' class='cohortLink hidden'>Cohorts</a></li>";
        $('.navBar').children('ul').empty().append(navBar);

        // Cohorts on Click
        $('.cohortLink').click(function () {
            console.log("cohort link click");
            $('.classroom').load("people/cohorts.html", function () {
                console.log("cohort load");
                cohortPageInit();
            });
            //$('.helpModal').hide();
            $('.adminViews').hide();
        });
    },
    refresh: function () {
        /* Refresh the DOM */
        $('.classroom').load('classroom.html', function () {

            /* Draw NAVBAR */
            APP.DOM.navbar();
            /* Draw COHORT DROPDOWN */
            APP.DOM.dropdown();
            /* Classroom Name Draw (Teacher) */
            $('.classRoomName').text(APP.classroomsArray[APP.classroomNumber].name);
            /* Cohort title draw */
            $('.cohortTitle').text(APP.cohortsArray[APP.cohortNumber].name);
            /*Color desks that are desks, also draw statuses and people in desks */
            APP.DOM.colorDesks();
        });
    }
};

