// DUMMY DATA
var dummyPerson = new Person("Michael Liquori", "liquori@gmail.com", "Student", [], {}, [], []);
var dummyPerson2 = new Person("Casie Lynch", "cds.lynch@gmail.com", "Student", [], {}, [], []);
var dummyPerson3 = new Person("Mary White", "maryk.december@gmail.com", "Student", [], {}, [], []);
var dummyPerson4 = new Person("Luke Poppe", "luke.k.poppe@gmail.com", "Student", [], {}, [], []);
var dummyCohort = new Cohort(0, 0, "Bloomington", new Date(2015, 2), new Date(2015, 6), [dummyPerson, dummyPerson2]);
var dummyCohort2 = new Cohort(0, 0, "Bloomington", new Date(2015, 5), new Date(2015, 9), [dummyPerson3, dummyPerson4]);
var dummyClassroom = new Classroom(0, 1, "Bloomington");
var dummyClassroom2 = new Classroom(1, 2, "Bloomington");