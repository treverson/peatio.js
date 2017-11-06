const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	if(!req.session.identity){
		res.redirect('/signin');
		return;
	}
	//two_factors
	res.render('setting');
});

module.exports = router;