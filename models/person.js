var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var PersonSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: false},
    class_role: String,
    help_status: {
        flag: String,
        question: String
    },
    help_history: [],
    seating_status: {
        seat: Number,
        date: Date
    },
    seating_history: []
});

module.exports = mongoose.model('Person', PersonSchema);