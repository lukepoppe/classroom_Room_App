var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name: {type: String, required: true},
    email: String,
    class_role: String,
    help_status: {
        flag: String,
        question: String,
        timestamp: Date
    },
    help_history: Array,
    seating_status: {
        position: String,
        timestamp: Date
    },
    seating_history: []
});

module.exports = mongoose.model('Person', PersonSchema);