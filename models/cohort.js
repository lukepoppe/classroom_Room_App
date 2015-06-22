var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CohortSchema = new Schema({
    number: {type: Number, required: true},
    classroom: Number,
    city: String,
    start_date: Date,
    end_date: Date,
    personArray: Array
});

module.exports = mongoose.model('Cohort', CohortSchema);