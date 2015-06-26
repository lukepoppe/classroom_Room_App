
// Desk Constructor Function
function Desk(number, position, person, classroom) {
    //this.id = "";
    this.number = number;
    this.position = position;
    this.person = person;
    this.classroom = classroom;
}

// Classroom Constructor Function
function Classroom(cohort, city, name) {
    this.deskArray = defaultDeskArray;
    this.cohort = cohort;
    this.city = city;
    this.name = name;
}

// Cohort Constructor Function
function Cohort() {
    this.name = "defaultName";
    this.classroom = "";
    this.city = "Bloomington";
    this.start_date = "";
    this.end_date = "";
    this.personArray = [];
}

// Person Constructor Function
function Person(name, email, class_role) {
    this.name = name;
    this.email = email;
    this.class_role = class_role;
    this.help_status = {};
    this.help_history = [];
    this.seating_status = {};
    this.seating_history = [];
    lastViewedPage = "home";
}