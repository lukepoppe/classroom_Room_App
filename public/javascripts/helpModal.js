function loadModal() {
    $('.helpModal').load('helpModal.html', function () {
        helpModal();
    });
}

function greenStatus() {
    $(".modalQuestionText").hide();
    //$('.btn-primary').css("background", "green");
    //$('.btn-primary').css("color", "black");
    $(this).css("background", "green");
    $('.yellow').css("background", "white");
    $('.red').css("background", "white");
    $('.status-modal-header').css("background", "green");
    $('.helpModalButton').css("background", "green");
    $('.helpLevel').css("border-color", "green");
    $('#userImageDom').css("border-color", "green");
    help_status.flag = "green";
    help_status.question = "";
    //$('.classRoomName').css("background", "green");
}

function yellowStatus() {
    $(".modalQuestionText").show();
    $(this).css("background", "yellow");
    //$('.btn-primary').css("background", "yellow");
    //$('.btn-primary').css("color", "black");
    $('.red').css("background", "white");
    $('.green').css("background", "white");
    $('.status-modal-header').css("background", "yellow");
    $('.helpModalButton').css("background", "yellow");
    $('#userImageDom').css("border-color", "yellow");
    help_status.flag = "yellow";
    //$('.classRoomName').css("background", "yellow");
}

function redStatus() {
    $(".modalQuestionText").show();
    $(this).css("background", "red");
    //$('.btn-primary').css("background", "red");
    //$('.btn-primary').css("color", "black");
    $('.yellow').css("background", "white");
    $('.green').css("background", "white");
    $('.status-modal-header').css("background", "red");
    $('.helpModalButton').css("background", "red");
    $('.helpLevel').css("border-color", "red");
    $('#userImageDom').css("border-color", "red");
    help_status.flag = "red";
    //$('.classRoomName').css("background", "red");
}

function changeStatus() {
    help_status.question = $('.helpModalTextbox').val();
    console.log(help_status.question);

    help_status.timestamp = new Date;
    for (var i = 0; i < cohortsArray[userCohortNumber].personArray.length; i++) {
        if (cohortsArray[userCohortNumber].personArray[i].email == userEmail) {

            /* Push old help_status into help_history */
            cohortsArray[userCohortNumber].personArray[i].help_history.push(cohortsArray[userCohortNumber].personArray[i].help_status);

            /* Set new help_status in array if there was a help_status before. */
            cohortsArray[userCohortNumber].personArray[i].help_status = help_status;
            thisDiv = cohortsArray[userCohortNumber].personArray[i].help_status;
            console.log(cohortsArray[userCohortNumber].personArray[i]);
            console.log("thisDiv AAAAAAAAAHHHHHHHH", thisDiv.question);

            $("#div13").append(thisDiv.question);

            /* Update cohort DB */
            updateCohortInDB(userCohortNumber);

        }
    }
    refreshClassroom();
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