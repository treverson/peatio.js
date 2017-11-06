const express = require('express');
const router = express.Router();
const Identity = require('../model/Identity');
const Util = require('../util/util');
const SignupHistory = require('../model/SignupHistory');

router.get('/', function(req, res, next) {
	res.render('signup');
});

router.post('/', function(req, res, next) {
	let result = {};
	let provider = req.params.provider;
	let email = req.body.email.toLowerCase(),
		password = req.body.password,
		password_conf = req.body.password_confirmation;
	if(password != password_conf) {
		result.pwdRepeat = true;
		res.render('signup', {error: result, email: email});
		return;
	}
	if(password.length < 6) {
		result.pwdShort = true;
	}
	if(password_conf.length < 6) {
		result.pwdconfShort = true;
	}
	Identity.findByEmail(email).then((results) => {
		let identity = results[0];
		if(identity != undefined) {
			result.userRepeat = true;
		}
		if(Object.keys(result).length >= 0) {
			return Promise.reject(JSON.stringify(result));
		}else {
			return Identity.signup({
				email: email,
				passwordDigest: Util.digest(password)
			}, provider);
		}
	}).then((results) => {
		let identity = results[0],
			member = results[1];
		SignupHistory.create({
			acceptLanguage: req.acceptsLanguages().join(','),
			ip: req.connection.remoteAddress,
			member_id: member.id,
			ua: req.get("User-Agent")
		});
		req.session.identity = identity.toJSON();
		res.redirect('/setting');
	}).catch((error) => {
		error = JSON.parse(error);
		console.log('error==========>' + error);
		res.render('signup', {error: error, email: email});
	});
});

module.exports = router;