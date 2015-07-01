
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
function Person(firstName, lastName, email, class_role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.class_role = class_role;
    this.help_status = {
        flag: "green",
        question: "",
        timestamp: new Date
    };
    this.help_history = [];
    this.seating_status = {
        deskId: "",
        timestamp: new Date
    };
    this.seating_history = [];
    lastViewedPage = "home";
}