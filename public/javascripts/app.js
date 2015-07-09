/* INIT Namespace for App */
var APP = APP || {};

/* INIT VARS, Set Default Cohort and Classrooms to 0 (first in array) */

/* VARS specific to current view */
APP.cohortNumber = 0;
APP.classroomNumber = 0;
APP.currentDeskArray = [];
APP.classroomsArray = [];

/* VARS specific to logged-in USER */
APP.user = {};
APP.user.help_status = {};
APP.user.authenticated = true;
APP.user.admin = true;
APP.user.cohort = 0;
APP.user.classroom = 0;

/* Edit Desks Toggle */
APP.toggleEditing = false;