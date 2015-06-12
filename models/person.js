var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
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