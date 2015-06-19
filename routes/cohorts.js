var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/cohorts.html', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/cohorts.html'))
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

module.exports = router;
