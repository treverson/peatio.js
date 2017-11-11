const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	//two_factors
	res.render('setting/setting');
});

router.get('/edit', function(req, res, next) {
	res.render('setting/id_document/edit');
});

module.exports = router;