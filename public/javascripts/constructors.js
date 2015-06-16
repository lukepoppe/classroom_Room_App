
// Classroom Constructor Function
function Classroom(number, cohort, city) {
    this.number = number;
    this.deskArray = defaultDeskArray;
    this.cohort = cohort;
    this.city = city; // TO DO: Option to change City?
}

// Cohort Constructor Function
function Cohort(number, classroom, city, startYear, startMonth, personArray) {
    this.number = number;
    this.classroom = classroom;
    this.city = city;
    this.startYear = startYear;
    this.startMonth = startMonth;
    this.personArray = personArray;
}

// Desk Constructor Function
function Desk(number, position, person, classroom) {
    this.number = number;
    this.position = position;
    this.person = person;
    this.classroom = classroom;
}

// Person Constructor Function
function Person(name, email, class_role, help_history, seating_status, seating_history) {
    this.name = name;
    this.email = email;
    this.class_role = class_role;
    this.help_history = help_history;
    this.seating_status = seating_status;
    this.seating_history = seating_history;
}