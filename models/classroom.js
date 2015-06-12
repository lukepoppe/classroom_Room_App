var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
    desks: [],
    cohort: []
});

module.exports = mongoose.model('Classroom', ClassroomSchema);