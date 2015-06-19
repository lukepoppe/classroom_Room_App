var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DeskSchema = require('./desk').model('Desk').schema;

var ClassroomSchema = new Schema({
    number: {type: Number, required: true},
    deskArray: [DeskSchema],
    cohort: Number,
    city: String
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
