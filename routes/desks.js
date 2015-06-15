var express = require('express');
var router = express.Router();
var desk = require('../models/desk');

router.get('/', function(req, res, next) {
    desk.find(function (err, desks) {
        if (err) return next(err);
        res.json(desks);
    });
});



/* DELETE /desks/:id */
router.delete('/:id', function(req, res, next) {
    desks.findByIdAndRemove(req.params.id, req.body, function (err, desk) {
        if (err) return next(err);
        res.json(desk);
    });
});
module.exports = router;