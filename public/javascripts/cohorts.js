console.log('cohorts.js is loaded');
var firstName;
var lastName;
var email;
var id;
var cohort = 0;
var cohortArray = [];

function cohortFunc(){
    $('body').find('.entryList').hide();
    $('body').find('.showList').hide();

    $('body').on("click", '.create',function(){
        console.log("yes");
        cohort++;
        console.log(cohort);
        createCohort();
        $('body').find('.entryList').show();
        $('.headline').text("Students of Cohort #" + cohort);
    });

    $('body').on("click", '.submit', function(){
        console.log("THIS BUTTON WORKS");
        $('body').find('.showList').show();
        firstName = $('.firstName').val();
        lastName = $('.lastName').val();
        email = $('.email').val();
        postData();
        //getData();
        console.log(firstName);
        console.log(cohortArray);


        $('body').find(".showList").append("<li>Testing Testing<button class='edit'>Edit</button></li>");
    });
}


function postData() {
    $.ajax({
        url: '/people/',
        data: {firstName: firstName, lastName: lastName, email: email},
        method: 'post',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            // get new data and update
            console.log("AJAX post call worked!");
            console.log(data);
                cohortArray.push(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("postData() Ajax POST Complete:", textStatus);
        }
    });
}

function createCohort() {
    $.ajax({
        url: '/cohort/',
        data: {cohortNum: cohort},
        method: 'post',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log("AJAX cohort post call worked!");
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("postData() Ajax cohort Post Complete:", textStatus);
        }
    });
}


//function getData() {
//    $.ajax({
//        url: '/people/',
//        data: {firstName: firstName, lastName: lastName, email: email},
//        method: 'get',
//        dataType: 'json',
//        success: function (data, textStatus, jqXHR) {
//            // get new data and update
//            console.log("AJAX get call worked!")
//            console.log(data);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.log(textStatus, errorThrown);
//        },
//        complete: function (jqXHR, textStatus) {
//            console.log("postData() Ajax POST Complete:", textStatus);
//        }
//    });
//}


