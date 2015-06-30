var mongoose = require('mongoose');
Schema = mongoose.Schema;

var HelpStatusSchema = new mongoose.Schema({
    flag: String,
    question: String,
    timestamp: Date
});

module.exports = mongoose.model('Helpstatus', HelpStatusSchema);