
    console.log("helpModal.js.ready!");


   function helpModal(){
        $(".modalQuestionText").hide();


    $('body').on('click', '.yellow', function () {
        console.log("greenClick");
        $(".modalQuestionText").show();
        $(this).css("background", "yellow");
        $('.btn-primary').css("background", "yellow");
        $('.btn-primary').css("color", "black");
        $('.red').css("background", "white");
        $('.green').css("background", "white");
        $('.modal-header').css("background", "yellow");



    });

    $('body').on('click', '.red', function () {
        console.log("yellowClick");
        $(".modalQuestionText").show();
        $(this).css("background", "red");
        $('.btn-primary').css("background", "red");
        $('.btn-primary').css("color", "black");
        $('.yellow').css("background", "white");
        $('.green').css("background", "white");
        $('.modal-header').css("background", "red");
    });

    $('body').on('click', '.green', function () {
        console.log("greenClick");
        $(".modalQuestionText").hide();
        $('.btn-primary').css("background", "green");
        $('.btn-primary').css("color", "black");
        $(this).css("background", "green");
        $('.yellow').css("background", "white");
        $('.red').css("background", "white");
        $('.modal-header').css("background", "green");
    });
}

