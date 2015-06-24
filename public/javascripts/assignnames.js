function names() {
    var alldesks = [];
    var shuffled;
    var classnames = ["Michael",
        "Casie",
        "Luke",
        "Mary",
        "Vince",
        "Terry",
        "Brian",
        "Kelly",
        "Tracy",
        "Chelsea",
        "Rom",
        "Erik",
        "Michelle",
        "Cody",
        "Clare",
        "Aaron",
        "Steve",
        "Alicia",
        "Kaitlin",
        "Jeanne"];

    for (var i = 0; i < currentDeskArray.length; i++) {
        alldesks.push(currentDeskArray[i].position);
    }


    classnames.forEach(function (value) {
        $('.cohort_list').append('<li class="item">' + value + '</li>');
    });


    $(".randomizeButton").click(function () {
        $('.label').text('');
        shuffled = shuffle(classnames);
        alldesks = shuffle(alldesks);
        for (var i = 0; i < shuffled.length; i++) {
            var select = alldesks[i];
            var id = $('#' + select);

            if (id.children().length == 0) {
                id.append('<p class="label"></p>');
            }

            id.find('p').text(shuffled[i]);
        }
        $(".cohort_list").children().remove();
        init_drag('.label');
    });

    $(function () {
        init_drag('.item');

        $('.occupied').droppable({
            drop: function (event, ui) {

                var div = $(this);
                var desk_id = div.attr('id');
                var name = ui.draggable.html();

                fill_desk(name, desk_id);

                if (div.children().length == 0) {
                    div.append('<p class="label"></p>');
                }

                var title = div.find('p');
                var text = title.text();

                if (text != "" && text != name) {
                    $('.cohort_list').append('<li class="item">' + text + '</li>');
                    init_drag('.item');
                }

                ui.draggable.remove();

                if (name == text) {
                    div.append('<p class="label"></p>');
                    title = div.find("p");
                    text = title.text();
                }

                init_drag('.label');
                title.text(name);
            },
            tolerance: "pointer"
        });

        $(".cohort_list").droppable({
            accept: "p",
            drop: function (event, ui) {
                var item = ui.draggable.html();
                $(this).append('<li class="item">' + item + '</li>');
                init_drag(".item");
                ui.draggable.remove();
            }
        })
    });


//add desks to the current desk array
    function fill_desk(student, id) {
        for (var i in currentDeskArray) {
            if (currentDeskArray[i].position == id) {
                currentDeskArray[i].student = student;
                break;
            }
        }
    }


// initialize draggable item
    function init_drag(el) {
        $(el).draggable({
            cursor: "move",
            revert: "invalid"
        });
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