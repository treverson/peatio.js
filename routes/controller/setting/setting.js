const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	//two_factors
	res.render('setting/setting');
});

module.exports = router;