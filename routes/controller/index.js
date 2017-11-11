// const express = require('express');
// const router = express.Router();
// const TABLE_DEFINE = require("../domain/table.define");

// router.get('/', function(req, res, next) {
//   res.render('index');
// });

// module.exports = router;

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });
  app.use('/signin', require('./signin'));
  app.use('/signup', require('./signup'));
  // app.use('/auth', auth);
  app.use('/setting', require('./setting/setting'));
  app.use('/id_document', require('./setting/id_document'));
  app.use('/activation', require('./activation'));

}