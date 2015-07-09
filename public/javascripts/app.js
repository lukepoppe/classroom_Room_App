/* INIT Namespace for App */
var APP = APP || {};

/* INIT VARS, Set Default Cohort and Classrooms to 0 (first in array) */
APP.help_status = {};
APP.cohortNumber = 0;
APP.classroomNumber = 0;
APP.userCohortNumber = 0;
APP.currentDeskArray = [];
APP.classroomsArray = [];
APP.i = 0;
APP.authenticated = true;
APP.admin = true;

/* Edit Desks Toggle */
APP.toggleEditing = false;