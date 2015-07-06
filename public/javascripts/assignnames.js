function names() {
    console.log('names() runs');

    var alldesks = [];
    var shuffled;
    var classnames = [];

    var cohortid = classroomsArray[classroomNumber].cohort;


    for (var i = 0; i < cohortsArray.length; i++) {
        if (cohortsArray[i]._id == cohortid) {
            cohortsArray[i].personArray.forEach(function (val) {
                classnames.push({firstName: val.firstName, id: val._id, status: val.help_status})
            })
        }
    }

    for (var j = 0; j < currentDeskArray.length; j++) {
        alldesks.push(currentDeskArray[j].position);
    }

    getnames();

    $('.clearButton').click(function () {
        $('.label').text('');
        appendnames();
        clear_desks();
        init_drag('.item');
    });

    $(".randomizeButton").click(function () {
        $('.label').text('');
        clear_desks();
        shuffled = shuffle(classnames);
        alldesks = shuffle(alldesks);
        for (var i = 0; i < shuffled.length; i++) {
            var select = alldesks[i];
            var id = $('#' + select);
            var randomname = shuffled[i].firstName;

            if (id.children().length == 0) {
                id.append('<p class="label"></p>');
            }

            id.find('p').text(randomname);

            fill_desk(shuffled[i].id, select);
        }

        $(".cohort_list").children().remove();
        init_drag('.label');
    });


    if (admin) {

        $(function () {
            init_drag('.item');

            $('.occupied').droppable({
                drop: function (event, ui) {

                    var div = $(this);
                    var desk_id = div.attr('id');
                    var name = ui.draggable.html();
                    var drop_id = ui.draggable.attr('id');


                    empty_desk(drop_id);
                    fill_desk(drop_id, desk_id);

                    if (div.children().length == 0) {
                        div.append('<p id=" ' + drop_id + 'class="label"></p>');
                    }

                    var title = div.find('p');
                    var text = title.text();

                    if (text != "" && text != name) {
                        $('.cohort_list').append('<li id=" ' + drop_id + 'class="item">' + text + '</li>');
                        init_drag('.item');
                    }

                    ui.draggable.remove();

                    if (name == text) {
                        div.append('<p id=" ' + drop_id + 'class="label"></p>');
                        title = div.find("p");
                    }

                    init_drag('.label');
                    title.text(name);
                },
                tolerance: "pointer"
            });

            $(".cohort_list").droppable({
                accept: ".label",
                drop: function (event, ui) {
                    var item = ui.draggable.html();
                    var item_id = ui.draggable.attr("id");
                    empty_desk(item_id);

                    $(this).append('<li id=" ' + item_id + 'class="item">' + item + '</li>');
                    init_drag(".item");
                    ui.draggable.remove();
                }
            })
        });

    }

    function getnames() {
        var saved;
        $(".cohort_list").children().remove();
        classnames.forEach(function (value) {
            saved = false;
            for (var i = 0; i < currentDeskArray.length; i++) {
                if (currentDeskArray[i].person == value.id) {
                    var currentdiv = '#' + currentDeskArray[i].position;
                    $(currentdiv).append('<p id=" ' + value.id + ' " class="label">' + value.firstName + '</p>');
                    console.log(value.firstName, value.status.flag);
                    color_desks(value.status.flag, currentdiv);
                    saved = true;
                }
            }
            if (saved == false) {
                $('.cohort_list').append('<li class="item">' + value.firstName + '</li>');
            }
        });
        init_drag('.item');
        init_drag('.label');
    }

    //add cohort names to list
    function appendnames() {
        $(".cohort_list").children().remove();
        classnames.forEach(function (value) {
            $('.cohort_list').append('<li class="item">' + value.firstName + '</li>');
        });
    }


    function color_desks(flag, position) {
        switch(flag) {
            case "green":
                $(position).css('background-color', '#009933');
                break;
            case "yellow":
                $(position).css('background-color', '#FFFF66');
                break;
            case "red":
                $(position).css('background-color', '#FF0000');
                break;
        }
    }

//clear out person attribute in all desk objects
    function clear_desks() {
        for (var i in currentDeskArray) {
            currentDeskArray[i].person = '';
        }
    }

    //empty desk on drag event
    function empty_desk(name) {
        for (var i in currentDeskArray) {
            if (currentDeskArray[i].person == name) {
                currentDeskArray[i].person = '';
                break;
            }
        }
    }

//add student to the current desk array
    function fill_desk(student, id) {
        for (var i in currentDeskArray) {
            if (currentDeskArray[i].position == id) {
                currentDeskArray[i].person = student;
                break;
            }
        }
    }


// initialize draggable item
    function init_drag(el) {
        if (admin) {
            $(el).draggable({
                cursor: "move",
                revert: "invalid",
                stack: el
            });
        }
    }

//shuffle the array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

}