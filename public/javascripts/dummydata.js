
// DUMMY DATA
var dummyPerson = new Person("Michael Liquori", "liquori@gmail.com", "Student", [], {}, []);
var dummyPerson2 = new Person("Casie Lynch", "cds.lynch@gmail.com", "Student", [], {}, []);
var dummyPerson3 = new Person("Mary White", "maryk.december@gmail.com", "Student", [], {}, []);
var dummyPerson4 = new Person("Luke Poppe", "luke.k.poppe@gmail.com", "Student", [], {}, []);
var dummyCohort = new Cohort(0, 0, "Bloomington", 2015, 3, [dummyPerson, dummyPerson2]);
var dummyCohort2 = new Cohort(0, 0, "Bloomington", 2015, 5, [dummyPerson3, dummyPerson4]);
var dummyClassroom = new Classroom(1, 1, "Bloomington");
var dummyClassroom2 = new Classroom(1, 1, "Bloomington");