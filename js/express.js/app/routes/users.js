var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id', function(req, res) {
    console.log(req.params);
    res.send(`The user with id ${req.params.id} not exist`, 400);
});

module.exports = router;
