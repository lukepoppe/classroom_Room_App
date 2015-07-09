
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
                APP.classrooms.get();
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
                return data;
                //APP.user.find(userEmail);
                //APP.DOM.classroom();
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