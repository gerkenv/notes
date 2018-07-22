var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
    console.log(req.query);
    res.render('index', {
        title: req.query.title || 'My App!',
        name: req.query.name || 'Static'
    });
});

module.exports = router;
