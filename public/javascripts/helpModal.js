function loadModal() {
    $('.helpModal').load('helpModal.html', function () {
        helpModal();
    });
}

function helpModal() {
    $(".modalQuestionText").hide();
    $("#statusModal").draggable();

    $('.yellow').click(function () {
        yellowStatus();
    });

    $('.red').click(function () {
        redStatus();
    });

    $('.green').click(function () {
        greenStatus();
    });

    $('.helpModalFooter').on('click', '.btn-primary', function () {
        changeStatus();
        $('#statusModal').modal('hide');
    });
}

function greenStatus() {
    $(".modalQuestionText").hide();
    //$('.btn-primary').css("background", "green");
    //$('.btn-primary').css("color", "black");
    $(this).css("background", "green");
    $('.yellow').css("background", "white");
    $('.red').css("background", "white");
    $('.modal-header').css("background", "green");
    $('.helpModalButton').css("background", "green");
    $('.helpLevel').css("border-color", "green");
    $('#userImageDom').css("border-color", "green");
    APP.help_status.flag = "green";
    APP.help_status.question = "";
    //$('.classRoomName').css("background", "green");
}

function yellowStatus() {
    $(".modalQuestionText").show();
    $(this).css("background", "yellow");
    //$('.btn-primary').css("background", "yellow");
    //$('.btn-primary').css("color", "black");
    $('.red').css("background", "white");
    $('.green').css("background", "white");
    $('.modal-header').css("background", "yellow");
    $('.helpModalButton').css("background", "yellow");
    $('#userImageDom').css("border-color", "yellow");
    APP.help_status.flag = "yellow";
    //$('.classRoomName').css("background", "yellow");
}

function redStatus() {
    $(".modalQuestionText").show();
    $(this).css("background", "red");
    //$('.btn-primary').css("background", "red");
    //$('.btn-primary').css("color", "black");
    $('.yellow').css("background", "white");
    $('.green').css("background", "white");
    $('.modal-header').css("background", "red");
    $('.helpModalButton').css("background", "red");
    $('.helpLevel').css("border-color", "red");
    $('#userImageDom').css("border-color", "red");
    APP.help_status.flag = "red";
    //$('.classRoomName').css("background", "red");
}

function changeStatus() {
    /* get status message and timestamp*/
    APP.help_status.question = $('.helpModalTextbox').val();
    APP.help_status.timestamp = new Date;
    console.log('runs1');

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
}