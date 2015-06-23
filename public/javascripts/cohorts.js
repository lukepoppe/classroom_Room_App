console.log('cohorts.js is loaded');

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
        var firstName = $('.firstName').val();
        var lastName = $('.lastName').val();
        var email = $('.email').val();
        //postData();

        console.log(firstName);
        //$('.showList').append("<p>" + firstName + " " + lastName + "  |  " + email +  "  |  <button class='edit'>Edit</button></p>");
    });
}

function postData(){
    $.ajax({
        url: '/people',
        method: 'post',
        data: {},
        dataType: 'json',
        success: function(response, textStatus, jqXHR){
            //clearData();
            //processData(response);
            console.log("AJAX call worked!")
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log("postData() Ajax Post Complete:", textStatus);
        }
    })
}

