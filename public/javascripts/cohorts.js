console.log('cohorts.js is loaded');
var firstName;
var lastName;
var email;

function cohortFunc(){
    $('.entryList').hide();
    $('.showList').hide();

    $('body').on("click", '.create',function(){
        console.log("yes");
        $('.entryList').show();
    });

    $('body').on("click", '.submit', function(){
        console.log("THIS BUTTON WORKS");
        //$('.showList').show();
        firstName = $('.firstName').val();
        lastName = $('.lastName').val();
        email = $('.email').val();
        postData();
        console.log(firstName);

        //$('.showList').append("<p>" + firstName + " " + lastName + "  |  " + email +  "  |  <button class='edit'>Edit</button></p>");
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
            console.log("AJAX post call worked!")
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("postData() Ajax POST Complete:", textStatus);
        }
    });
}

function getData() {
    $.ajax({
        url: '/people/' + data._id,
        data: {firstName: firstName, lastName: lastName, email: email},
        method: 'get',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            // get new data and update
            console.log("AJAX get call worked!")
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
        complete: function (jqXHR, textStatus) {
            console.log("postData() Ajax POST Complete:", textStatus);
        }
    });
}
