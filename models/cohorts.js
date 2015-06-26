var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PersonSchema = require('./person').model('Person').schema;

var CohortSchema = new Schema({
    name: String,
    classroom: Number,
    city: String,
    start_date: Date,
    end_date: Date,
    personArray: [PersonSchema]
});

module.exports = mongoose.model('Cohort', CohortSchema);