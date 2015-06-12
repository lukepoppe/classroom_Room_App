var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeskSchema = new Schema({
    desk: {type: Number, required: true},
    person: String
});

module.exports = mongoose.model('Desk', DeskSchema);