/* User Auth Services */

APP.user = {
    find: function (email) {

        function findClassroom(id) {

            var classroom;
            for (var i = 0; i < APP.classroomsArray.length; i++) {
                classroom = APP.classroomsArray[i];
                if (classroom.cohort == id) {
                    //console.log(i, classroom.cohort, id);
                    APP.classroomNumber = i;
                    APP.currentDeskArray = classroom.deskArray;
                    //refreshClassroom();
                    break;
                }
            }
        }

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
                    APP.cohortNumber = i;
                    findClassroom(classroomid);

                    /* Help Status check */
                    help_status = APP.cohortsArray[APP.cohortNumber].personArray[j].help_status;

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

/* Classroom API */
APP.classrooms = {
    add: function () {
        $.ajax({
            url: '/classrooms/',
            data: APP.classroomsArray[APP.classroomNumber],
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
    delete: function (number) {
        $.ajax({
            url: '/classrooms/' + APP.classroomsArray[number]._id,
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
    update: function (number) {
        // Set current desk array into classrooms array before updating.
        APP.classroomsArray[APP.classroomNumber].deskArray = APP.currentDeskArray;

        $.ajax({
            url: '/classrooms/' + APP.classroomsArray[number]._id,
            data: APP.classroomsArray[number],
            method: 'put',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                // get new data and update
                APP.classroomsArray = data;
                APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;
                APP.DOM.classroom();
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

/* Cohorts API */

APP.cohorts = {
    add: function () {
        APP.cohortNumber = APP.cohortsArray.length;
        APP.cohortsArray.push(new Cohort(APP.cohortNumber, "Bloomington", "defaultName"));
        $.ajax({
            url: '/cohorts/',
            data: APP.cohortsArray[APP.cohortNumber],
            method: 'post',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                console.log('DBSuccess');
                // get new data and update
                APP.cohorts.get();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown, jqXHR);
            },
            complete: function (jqXHR, textStatus) {
                console.log("createCohortInDB() Ajax POST Complete:", textStatus, jqXHR);
            }
        });
    },
    delete: function (id) {
        $.ajax({
            url: '/cohorts/' + id,
            data: {},
            method: 'delete',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                APP.cohortNumber = 0;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("deleteClassroomFromDB() Ajax Get Complete:", textStatus);
            }
        });
    },
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
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("Cohort GET Complete:", textStatus);
            }
        });
    },
    update: function (number) {
        $.ajax({
            url: '/cohorts/' + APP.cohortsArray[number]._id,
            data: APP.cohortsArray[number],
            method: 'put',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                // get new data and update
                APP.cohorts.get();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                console.log("updateCohorts() Ajax PUT Complete:", textStatus);
            }
        });
    }
};

/* DOM DRAWING Services */

APP.DOM = {
    authenticate: function () {
        /* Hide stuff based on user authentication */
        if (APP.authenticated) {
            $('.userNameDom').empty();
            $('.userImageDom').empty();
            $('.userNameDom').append(APP.userName);
            $('.userImageDom').append('<img src=" ' + APP.userImage + ' "id="userImageDom">');
            $('.signOutButton').removeClass('hidden');
            $('.g-signin2').addClass('hidden');
            $('.helpModalButton').removeClass('hidden');
            $('.label').removeClass('hidden');
            if (help_status.flag == 'red') {
                redStatus();
            } else if (help_status.flag == 'yellow') {
                yellowStatus();
            } else {
                greenStatus();
            }
            if (APP.admin) {
                $('.newClassroomButton').removeClass('hidden');
                $('.lastpipe').removeClass('hidden');
                $('.cohortLink').removeClass('hidden');
                $('.closeX').removeClass('hidden');
                $('.classroomShit').removeClass('hidden');
            }
        } else {
            //signOut();
        }
    },
    classroom: function () {
        /* Load Fresh Classroom Template. */
        $('.classroom').load('classroom.html', function () {
            /* If logged in, find your room and cohort */
            if (APP.authenticated) {
                names();
            }
            /* Draw NAVBAR */
            APP.DOM.navbar();
            /* Draw COHORT DROPDOWN */
            APP.DOM.dropdown();
            /* Store currently selected desk array in currentDeskArray */
            APP.currentDeskArray = APP.classroomsArray[APP.classroomNumber].deskArray;
            /* Classroom Name Draw (Teacher) */
            $('.classRoomName').text(APP.classroomsArray[APP.classroomNumber].name);
            /* Hide stuff depending on logged in or admin*/
            APP.DOM.authenticate();
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

