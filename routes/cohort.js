var express = require('express');
var router = express.Router();
var path = require('path');
var cohort = require('../models/cohort');



router.get('/cohorts.html', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/cohorts.html'))
});


/* POST /todos */
router.post('/', function(req, res, next) {
    cohort.create(req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

//
//router.get('/:id', function(req, res, next) {
//    person.findById(req.params.id, function (err, data) {
//        if (err) return next(err);
//        res.json(data);
//    });
//});


///* PUT /todos/:id */
//router.put('/:id', function(req, res, next) {
//    Person.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//        if (err) return next(err);
//        res.json(post);
//    });
//});
//
///* DELETE /todos/:id */
//router.delete('/:id', function(req, res, next) {
//    Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//        if (err) return next(err);
//        res.json(post);
//    });
//});

console.log('people.js loaded');

module.exports = router;