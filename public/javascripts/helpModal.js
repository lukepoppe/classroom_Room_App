console.log("helpModal.js.ready!");

function helpModal() {
    $(".modalQuestionText").hide();
    //$("#statusModal").modal({}).draggable();

    $('.yellow').click(function () {
        console.log("yellow Click");
        $(".modalQuestionText").show();
        $(this).css("background", "yellow");
        $('.btn-primary').css("background", "yellow");
        $('.btn-primary').css("color", "black");
        $('.red').css("background", "white");
        $('.green').css("background", "white");
        $('.modal-header').css("background", "yellow");
        $('.helpModalButton').css("background", "yellow");
        $('#userImageDom').css("border-color", "yellow");
    });

    $('.red').click(function () {
        console.log("redClick");
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
    });

    $('.green').click(function () {
        console.log("greenClick");
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
    });

    $('.helpModalFooter').on('click', '.btn-primary', function () {
        console.log("submitButtonClick");
        $('#statusModal').modal('hide');
    });
}




