var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
    number: {type: Number, required: true},
    deskArray: {type: Array, required: true},
    cohort: Number,
    city: String
});

module.exports = mongoose.model('Classroom', ClassroomSchema);