console.log('cohorts.js is loaded');

var cohort = [];


$(document).ready(function () {
    $('.entryList').hide();
    $('.showList').hide();

    $('.create').on("click", function(){
        console.log("yes");
        $('.entryList').show();
    });

    $('.submit').on("click", function(){
        var firstName = $('.firstName').val();
        var lastName = $('.lastName').val();
        var email = $('.email').val();

        console.log(firstName);
        // for(var i = 0; i < cohort.length; i++) {
        //    $('.showList').append("<p>" + cohort[i] + "  |  <button class='edit'>Edit</button></p>");
        //};
    });

    function getData(){
        $.ajax({
            url: '/people',
            method: 'get',
            data: {},
            dataType: 'json',
            success: function(response, textStatus, jqXHR){
                //clearData();
                processData(response);
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(textStatus,errorThrown);
            },
            complete: function(jqXHR, textStatus){
                console.log("getData() Ajax Get Complete:", textStatus);
            }
        })
    }
    //
    //function clearData(){
    //    $data.empty();
    //}

    function processData(data){

        for(var i = 0; i< data.length; i++){
            var todo = data[i];
            console.log(todo);

            //var id = todo._id;
            //var name = todo.name || '';
            //var completed = todo.completed || false;
            //var note = todo.note || '';
            //
            //var section = $('<section/>')
            //    .attr('data-id', id);
            //
            //var ul = $('<ul/>')
            //    .appendTo(section);
            //
            //var liName = $('<li/>')
            //    .text('Name: ' + name)
            //    .appendTo(ul);
            //
            //var liScore = $('<li/>')
            //    .text('completed: ' + completed)
            //    .appendTo(ul);
            //
            //var liDate = $('<li/>')
            //    .text('Note: '+ note)
            //    .appendTo(ul);
            //
            //$data.append(section);
        }
    }








});