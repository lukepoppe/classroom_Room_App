//console.log("helpModal.js.ready!");
function loadModal() {
    $('.helpModal').load('helpModal.html', function () {
        //console.log('helpModal.html is loaded');
        helpModal();
    });
}


var help_status = {};

function helpModal() {
    $(".modalQuestionText").hide();
    //$("#statusModal").modal({}).draggable();

    $('.yellow').click(function () {
        //console.log("yellow Click");
        $(".modalQuestionText").show();
        $(this).css("background", "yellow");
        $('.btn-primary').css("background", "yellow");
        $('.btn-primary').css("color", "black");
        $('.red').css("background", "white");
        $('.green').css("background", "white");
        $('.modal-header').css("background", "yellow");
        $('.helpModalButton').css("background", "yellow");
        $('#userImageDom').css("border-color", "yellow");
        help_status.flag = "yellow";
        //$('.classRoomName').css("background", "yellow");
    });

    $('.red').click(function () {
        //console.log("redClick");
        $(".modalQuestionText").show();
        $(this).css("background", "red");
        $('.btn-primary').css("background", "red");
        $('.btn-primary').css("color", "black");
        $('.yellow').css("background", "white");
        $('.green').css("background", "white");
        $('.modal-header').css("background", "red");
        $('.helpModalButton').css("background", "red");
        $('.helpLevel').css("border-color", "red");
        $('#userImageDom').css("border-color", "red");
        help_status.flag = "red";
        //$('.classRoomName').css("background", "red");
    });

    $('.green').click(function () {
        //console.log("greenClick");
        $(".modalQuestionText").hide();
        $('.btn-primary').css("background", "green");
        $('.btn-primary').css("color", "black");
        $(this).css("background", "green");
        $('.yellow').css("background", "white");
        $('.red').css("background", "white");
        $('.modal-header').css("background", "green");
        $('.helpModalButton').css("background", "green");
        $('.helpLevel').css("border-color", "green");
        $('#userImageDom').css("border-color", "green");
        help_status.flag = "green";
        help_status.question = "";
        //$('.classRoomName').css("background", "green");
    });

    $('.helpModalFooter').on('click', '.btn-primary', function () {
        console.log("submitButtonClick");
        help_status.question = $('.helpModalTextbox').val();
        help_status.timestamp = new Date;
        console.log(help_status);
        for (var i = 0; i < cohortsArray[userCohortNumber].personArray.length; i++) {
            console.log(userCohortNumber);
            console.log(cohortsArray[userCohortNumber]);
            if (cohortsArray[userCohortNumber].personArray[i].email == userEmail) {

                // Push old help_status into help_history
                cohortsArray[userCohortNumber].personArray[i].push(cohortsArray[userCohortNumber].personArray[i].help_status);
                // Set new help_status in array if there was a help_status before.
                cohortsArray[userCohortNumber].personArray[i].help_status = help_status;
                // Update cohort DB
                updateCohortInDB(userCohortNumber);

            }
        }


        $('#statusModal').modal('hide');
    });
}





