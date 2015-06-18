var express = require('express');
var router = express.Router();
var desks = require('../models/desk');

router.get('/', function (req, res, next) {
    desks.find(function (err, deskArray) {
        if (err) return next(err);
        res.json(deskArray);
    });
});

/* POST /desks/:id */
router.post('/', function (req, res, next) {
    desks.create(req.body, function (err, deskArray) {
        if (err) return next(err);
        res.json(deskArray);
    })
});

/* DELETE /desks/:id */
router.delete('/:id', function (req, res, next) {
    desks.findByIdAndRemove(req.params.id, req.body, function (err, deskArray) {
        if (err) return next(err);
        res.json(deskArray);
    });
});

module.exports = router;