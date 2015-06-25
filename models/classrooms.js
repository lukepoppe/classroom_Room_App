var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var DeskSchema = require('./desk').model('Desk').schema;

var ClassroomSchema = new Schema({
    deskArray: [DeskSchema],
    cohort: Number,
    city: String,
    name: String
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
