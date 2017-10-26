const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signin', {name: '该违规为各位'});
});

module.exports = router;