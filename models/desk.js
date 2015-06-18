var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeskSchema = new Schema({
    number: {type: Number, required: true},
    position: {type: String, required: true},
    person: String,
    classroom: Number
});

module.exports = mongoose.model('Desk', DeskSchema);