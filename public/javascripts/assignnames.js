var alldesks = [];
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

    for (var i = 0; i < defaultDeskArray.length; i++){
        alldesks.push(defaultDeskArray[i].position);
    }

    alldesks.forEach(function(value){
        console.log(value);
        $('#'+ value).addClass('occupied');
    });

    classnames.forEach(function(value){
        $('.cohort_list').append('<li class="item">'+ value +'</li>');
    });




$(function(){
    init_drag('.item');

    $('.occupied').droppable({
        drop: function (event, ui) {

            var div = $(this);
            var name = ui.draggable.html();

            console.log(div, name);

            if (div.children().length == 0) {
                div.append('<p class="label"></p>');
            }

            var title = div.find('p');
            var text = title.text();

            if (text != "" && text != name){
                $('ul').append('<li class="item">'+ text +'</li>');
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
        }
    });
});




// initialize draggable item
function init_drag(el){
    $(el).draggable({
        cursor: "move",
        revert: "invalid"
    });
}

//shuffle the array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

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