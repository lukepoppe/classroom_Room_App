var express = require('express');
var router = express.Router();
var path = require('path');

/* GET classroom template. */
router.get('/classroom.html', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/classroom.html'))
});

/* GET classroom template. */
router.get('/adminViews.html', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/adminViews.html'))
});

router.get('/helpModal.html', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/helpModal.html'))
});

router.get('/people/cohorts.html', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/cohorts.html'))
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
});


module.exports = router;
