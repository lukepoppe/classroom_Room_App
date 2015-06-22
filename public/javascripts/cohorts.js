console.log('cohorts.js is loaded');


$(document).ready(function () {
    $('.entryList').hide();
    $('.showList').hide();

    $('.create').on("click", function(){
        console.log("yes");
        $('.entryList').show();
    });

    //$('.submit').on("click", function(){
    //    $('.showList').show();
    //    var firstName = $('.firstName').val();
    //    var lastName = $('.lastName').val();
    //    var email = $('.email').val();
    //    //postData();
    //
    //    console.log(firstName);
    //    $('.showList').append("<p>" + firstName + " " + lastName + "  |  " + email +  "  |  <button class='edit'>Edit</button></p>");
    //});
});

//function postData(){
//    $.ajax({
//        url: '/people',
//        method: 'post',
//        data: {firstName: firstName, lastName: lastName, email: email},
//        dataType: 'json',
//        success: function(response, textStatus, jqXHR){
//            //clearData();
//            processData(response);
//        },
//        error: function(jqXHR, textStatus, errorThrown){
//            console.log(textStatus,errorThrown);
//        },
//        complete: function(jqXHR, textStatus){
//            console.log("postData() Ajax Post Complete:", textStatus);
//        }
//    })
//}
//
