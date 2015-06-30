var mongoose = require('mongoose');
    Schema = mongoose.Schema;
var HelpStatusSchema = require('./helpstatus').model('Helpstatus').schema;

var PersonSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: String,
    class_role: String,
    help_status: Object,
    help_history: [],
    seating_status: {
        position: String,
        timestamp: Date
    },
    seating_history: [],
    lastViewedPage: String
});

module.exports = mongoose.model('Person', PersonSchema);