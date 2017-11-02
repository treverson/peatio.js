const express = require('express');
const router = express.Router();
const TABLE_DEFINE = require("../domain/table.define");

router.get('/', function(req, res, next) {
  res.render('index', {name: '该违规为各位'});
});

module.exports = router;