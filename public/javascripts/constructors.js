
// Desk Constructor Function
function Desk(number, position, person, classroom) {
    //this.id = "";
    this.number = number;
    this.position = position;
    this.person = person;
    this.classroom = classroom;
}

// Classroom Constructor Function
function Classroom(number, cohort, city, name) {
    this.deskArray = defaultDeskArray;
    this.cohort = cohort;
    this.city = city; // TO DO: Option to change City?
    this.name = name;
}

// Cohort Constructor Function
function Cohort(number, classroom, city, start_date, end_date, personArray) {
    this.number = number;
    this.classroom = classroom;
    this.city = city;
    this.start_date = start_date;
    this.end_date = end_date;
    this.personArray = personArray;
}

// Person Constructor Function
function Person(name, email, class_role, help_status, help_history, seating_status, seating_history) {
    this.name = name;
    this.email = email;
    this.class_role = class_role;
    this.help_status = help_status;
    this.help_history = help_history;
    this.seating_status = seating_status;
    this.seating_history = seating_history;
}