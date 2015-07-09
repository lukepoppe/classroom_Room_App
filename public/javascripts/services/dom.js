
/* DOM DRAWING Services */

APP.DOM = {
    classroom: function () {
        /* Load Fresh Classroom Template. */
        $('.classroom').load('classroom.html', function () {
            /* If logged in, find your room and cohort */
            //if (APP.authenticated) {
            //    APP.user.adminAuth();
            //}
            /* Draw NAVBAR */
            APP.DOM.navbar();
            /* Draw COHORT DROPDOWN */
            APP.DOM.dropdown();
            /* Store currently selected desk array in currentDeskArray */
            APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;
            /* Classroom Name Draw (Teacher) */
            $('.classRoomName').text(APP.classroomsArray[APP.classroomNumber].name);
            /* Hide stuff depending on logged in or admin*/
            //APP.user.adminAuth();
            //$('.cohortTitle').text(APP.cohortsArray[APP.cohortNumber].name);
            /*Color desks that are desks, also draw statuses and people in desks */
            APP.DOM.colorDesks();
        });
    },
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
                console.log(APP.currentDeskArray[i].person);
                console.log(div.children('p').data('flag'));
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
    }
};

