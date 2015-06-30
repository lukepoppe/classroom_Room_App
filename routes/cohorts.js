var express = require('express');
var router = express.Router();
var cohorts = require('../models/cohorts');

/* GET /cohorts/ */
router.get('/', function (req, res, next) {
    cohorts.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* GET /cohorts/:id */
router.get('/:id', function (req, res, next) {
    cohorts.findById(req.params.id, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* PUT /cohorts/:id */
router.put('/:id', function (req, res, next) {
    cohorts.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        //console.log(req.body);
        res.json(data);
    });
});

/* POST /cohorts/:id */
router.post('/', function (req, res, next) {
    cohorts.create(req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* DELETE /cohorts/:id */
router.delete('/:id', function (req, res, next) {
    cohorts.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

module.exports = router;