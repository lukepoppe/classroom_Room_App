/* User Auth Services */

APP.user = {
    find: function (email) {
        var cohort;
        var person;
        var classroomid;
        var name;
        for (var i = 0; i < APP.cohortsArray.length; i++) {
            cohort = APP.cohortsArray[i];
            classroomid = cohort._id;
            name = cohort.name;
            for (var j = 0; j < cohort.personArray.length; j++) {
                person = cohort.personArray[j];
                if (person.email.toLowerCase() == email) {
                    userCohortNumber = i;
                    cohortNumber = userCohortNumber;
                    findclassroom(classroomid);

                    /* Help Status check */
                    help_status = cohortsArray[userCohortNumber].personArray[j].help_status;

                    authenticated = true;
                    if (name == "ADMIN") {
                        admin = true;
                    }
                    break;
                }
            }
        }
    }
};

/* API Services */

APP.classrooms = {
    add: function () {
        $.ajax({
            url: '/classrooms/',
            data: classroomsArray[classroomNumber],
            method: 'post',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                //APP.classroomNumber = 0;
                // get new data and update
                getAllClassrooms();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("POST Complete:", textStatus);
            }
        });
    },
    delete: function () {
        $.ajax({
            url: '/classrooms/' + classroomsArray[number]._id,
            data: {},
            method: 'delete',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                APP.classroomNumber = 0;
                // Get updated classroomArray from DB and refresh
                APP.classrooms.get();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("DELETE Complete:", textStatus);
            }
        });
    },
    get: function () {
        $.ajax({
            url: '/classrooms/',
            data: {},
            method: 'get',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                APP.classroomsArray = data;
                APP.currentDeskArray = APP.classroomsArray[classroomNumber].deskArray;
                //APP.user.find(userEmail);
                APP.DOM.classroom();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("GET Complete:", textStatus);
            }
        });
    },
    update: function () {
        // Set current desk array into classrooms array before updating.
        APP.classroomsArray[APP.classroomNumber].deskArray = APP.currentDeskArray;

        $.ajax({
            url: '/classrooms/' + classroomsArray[number]._id,
            data: classroomsArray[number],
            method: 'put',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                // get new data and update
                APP.classroomsArray = data;
                APP.currentDeskArray = classroomsArray[APP.classroomNumber].deskArray;
                refreshClassroom();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("PUT Complete:", textStatus);
            }
        });
    }
};

APP.cohorts = {
    get: function () {
        $.ajax({
            url: '/cohorts/',
            data: {},
            method: 'get',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                APP.cohortsArray = data;
                APP.currentPersonArray = APP.cohortsArray[APP.cohortNumber].personArray;
                drawList();
                paintStatuses();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("Cohort GET Complete:", textStatus);
            }
        });
    }
};

/* DOM DRAWING Services */

APP.DOM = {
    classroom: function () {
        /* Load Fresh Classroom Template. */
        $('.classroom').load('classroom.html', function () {
            /* If logged in, find your room and cohort */
            if (authenticated) {
                names();
            }
            /* Draw NAVBAR */
            drawNav();
            /* Draw COHORT DROPDOWN */
            draw_dropdown();
            /* Store currently selected desk array in currentDeskArray */
            currentDeskArray = classroomsArray[classroomNumber].deskArray;
            /* Classroom Name Draw (Teacher) */
            $('.classRoomName').text(classroomsArray[classroomNumber].name);
            /* Hide stuff depending on logged in or admin*/
            hideSignInButton();
            $('.cohortTitle').text(cohortsArray[cohortNumber].name);
            /*Color desks that are desks, also draw statuses and people in desks */
            paintDesks();
        });
    }
};

/* Color statuses based on data-status attribute */
function color_desks(flag, position) {
    switch (flag) {
        case "green":
            $(position).css('background-color', '#009933');
            break;
        case "yellow":
            $(position).css('background-color', '#FFFF66');
            break;
        case "red":
            $(position).css('background-color', '#FF0000');
            break;
    }
}
// Color desks
function paintDesks() {
    var div;
    var savedToDesk;

    /* Draw people names both on desks and in cohort list */
    cohortsArray[cohortNumber].personArray.forEach(function (thisRoomPerson) {
        savedToDesk = false;
        for (var i = 0; i < currentDeskArray.length; i++) {

            /* If person is found in currentDeskArray, append <p> tag to that desk div*/
            if (currentDeskArray[i].person == thisRoomPerson._id) {
                var div = '#' + currentDeskArray[i].position;
                $(div).append('<p data-id="' + thisRoomPerson._id + '" data-flag="' + thisRoomPerson.help_status.flag + '"class="assignedPerson person">' + thisRoomPerson.firstName + '</p>');
                color_desks(thisRoomPerson.help_status.flag, div);
                saved = true;
            }
        }
        /* Draw the list of cohort people yet to be dragged into desks */
        if (savedToDesk == false) {
            console.log('here');
            $('.cohort_list').append('<li class="unassignedPerson person" data-id="' + thisRoomPerson._id + '">' + thisRoomPerson.firstName + '</li>');
        }
    });

    /* Draw a desk if there should be one there */
    for (var i = 0; i < currentDeskArray.length; i++) {
        div = $('#' + currentDeskArray[i].position);
        div.toggleClass('occupied');

        /* If a person is assigned to a desk, color it based on attribute */
        if (currentDeskArray[i].person) {
            console.log(currentDeskArray[i].person);
            console.log(div.children('p').data('flag'));
        }
    }
}

function drawNav() {
    navBar = "";
    for (i = 0; i < classroomsArray.length; i++) {
        navBar += "<li>" + "<a href='#' class='classroomSelector' data-classroom='" + i + "'>" + classroomsArray[i].name + "</a><a href='#' class='closeX hidden' data-toggle='modal' data-target='#confirm-delete' data-classroom='" + i + "'>" + " X</a><span class='divider'>|</span></li>";
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

function draw_dropdown() {
    $('.dropdown-menu').children().empty();
    if (cohortsArray != undefined) {
        console.log(cohortsArray);
        cohortsArray.forEach(function (cohort) {
            var cohortname = cohort.name;
            var cohortid = cohort._id;
            var el = "<li><a id='" + cohortid + "' href='#'>" + cohortname + "</a></li>";
            $('.dropdown-menu').append(el);
        })
    }
}
