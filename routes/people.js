var express = require('express');
var router = express.Router();
var path = require('path');
var Person = require('../models/person');



/* GET /todos listing. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/cohorts.html'))
});

/* POST /todos */
router.post('/', function(req, res, next) {
    Person.create(req.body, function (err, post) {
        if (err) return next(err);
    });
});


/* GET /todos/:id */
router.get('/:id', function(req, res, next) {
    Person.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
    Person.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
    Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

console.log('people.js loaded');

module.exports = router;