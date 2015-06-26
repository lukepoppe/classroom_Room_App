var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//var PersonSchema = require('./person').model('Person').schema;

var CohortSchema = new mongoose.Schema({
    cohortName: String,
    classroom: Number,
    city: String,
    start_date: Date,
    end_date: Date,
    personArray: Array
});

module.exports = mongoose.model('Cohort', CohortSchema);