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
        APP.user.changeStatus();
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
    $('.helpLevel').css("border-color", "green");
    $('#userImageDom').css("border-color", "green");
    APP.user.help_status.flag = "green";
    APP.user.help_status.question = "";
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
    $('#userImageDom').css("border-color", "yellow");
    APP.user.help_status.flag = "yellow";
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
    $('.helpLevel').css("border-color", "red");
    $('#userImageDom').css("border-color", "red");
    APP.user.help_status.flag = "red";
    //$('.classRoomName').css("background", "red");
}