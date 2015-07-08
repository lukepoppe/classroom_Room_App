function names() {

    var alldesks = [];
    var classnames = [];
    var shuffled;
    var cohortid = classroomsArray[classroomNumber].cohort;

    /* Loop through cohorts array, find cohort that matches the cohort id which is assigned to classroom
     * Assign that cohort index to GLOBAL VAR cohortNumber
     * Push each person onto classnames Array... Why?  */
    for (var i = 0; i < cohortsArray.length; i++) {
        if (cohortsArray[i]._id == cohortid) {
            cohortNumber = i;
            //console.log(cohortsArray[i].personArray);
            //cohortsArray[i].personArray.forEach(function (person) {
            //    classnames.push({firstName: person.firstName, id: person._id, status: person.help_status})
            //})
        }
    }

    /* Loop through currentDeskArray and push position onto alldesks Array
     * WHY?? */
    //for (var j = 0; j < currentDeskArray.length; j++) {
    //    alldesks.push(currentDeskArray[j].position);
    //}

    /* Seems that alldesks is a replica of currentDeskArray.position.
     * classnames is a replica of current cohort person array
     * */

    getnames();
    /* Empty cohort list
     * Cycle through classnames Array, which contains everyone in this cohort
     * So for each person, we will then go through the entire desk array searching for them.
     * Probably more logical just to go through all the desks.
     * In fact, isn't that already done somewhere else?
     */
    function getnames() {
        var savedToDesk;
        $(".cohort_list").children().remove();

        console.log(cohortsArray[cohortNumber].personArray);
        classnames = cohortsArray[cohortNumber].personArray;

        classnames.forEach(function (thisRoomPerson) {
            savedToDesk = false;
            for (var i = 0; i < currentDeskArray.length; i++) {
                /* If person is found in currentDeskArray,
                 * append <p> tag to that desk div*/
                //console.log(thisRoomPerson);
                if (currentDeskArray[i].person == thisRoomPerson._id) {
                    var currentdiv = '#' + currentDeskArray[i].position;
                    $(currentdiv).append('<p data-id="' + thisRoomPerson._id + '" class="assignedPerson person">' + thisRoomPerson.firstName + '</p>');
                    console.log(thisRoomPerson.firstName, thisRoomPerson.status.flag);
                    color_desks(thisRoomPerson.status.flag, currentdiv);
                    saved = true;
                }
            }
            /* Draw the list of cohort people yet to be dragged into desks */
            if (savedToDesk == false) {
                $('.cohort_list').append('<li class="unassignedPerson person" data-id="' + thisRoomPerson._id + '">' + thisRoomPerson.firstName + '</li>');
            }
        });
        /* Make both assigned and unassigned names draggable */
        init_drag('.unassignedPerson');
        init_drag('.assignedPerson');
    }

    $('.clearButton').click(function () {
        $('.assignedPerson').text('');
        appendnames();
        clear_desks();
        init_drag('.unassignedPerson');
    });

    $(".randomizeButton").click(function () {
        $('.assignedPerson').text('');
        clear_desks();
        shuffled = shuffle(classnames);
        alldesks = shuffle(alldesks);
        for (var i = 0; i < shuffled.length; i++) {
            var select = alldesks[i];
            var id = $('#' + select);
            var randomname = shuffled[i].firstName;

            if (id.children().length == 0) {
                id.append('<p class="assignedPerson"></p>');
            }

            id.find('p').text(randomname);

            fill_desk(shuffled[i].id, select);
        }

        $(".cohort_list").children().remove();
        init_drag('.assignedPerson');
    });


    if (admin) {

        $(function () {
            init_drag('.unassignedPerson');

            $('.occupied').droppable({
                drop: function (event, ui) {

                    var targetDiv = $(this);
                    var desk_id = targetDiv.attr('id');
                    var personId = ui.draggable.data('id');

                    /* Take person out of old deskArray, put in new deskArray */
                    empty_desk(personId);
                    fill_desk(name, desk_id);

                    if (targetDiv.children().length == 0) {
                        targetDiv.append('<p class="label"></p>');
                    }

                    var title = targetDiv.find('p');
                    var text = title.text();
                    console.log(text);

                    /* Draw Cohort List to be dragged */
                    if (text != "" && text != name) {
                        $('.cohort_list').append('<li class="item">' + text + '</li>');
                        init_drag('.unassignedPerson');
                    }

                    ui.draggable.remove();

                    if (name == text) {
                        targetDiv.append('<p class="label"></p>');
                        title = targetDiv.find("p");
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

                    empty_desk(item);

                    $(this).append('<li class="item">' + item + '</li>');
                    init_drag(".item");
                    ui.draggable.remove();
                }
            })
        });

    }

    //add cohort names to list
    function appendnames() {
        $(".cohort_list").children().remove();
        console.log(classnames);
        classnames.forEach(function (value) {
            $('.cohort_list').append('<li class="item">' + value.firstName + '</li>');
        });
    }


    function color_desks(flag, position) {
        switch (flag) {
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
    function empty_desk(id) {
        for (var i in currentDeskArray) {
            console.log(i);
            if (currentDeskArray[i].person == id) {
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