
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
                //drawList();
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