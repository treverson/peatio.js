const express = require('express');
const router = express.Router();
const Identity = require('../model/Identity');
const Member = require('../model/Member');
const Util = require('../util/util');
const SignupHistory = require('../model/SignupHistory');

router.get('/', function(req, res, next) {
	res.render('signup');
});

router.post('/', function(req, res, next) {
	let result = {};
	let provider = req.body.provider;
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
		if(!!identity) {
			result.userRepeat = true;
		}
		if(Object.keys(result).length > 0) {
			return Promise.reject(JSON.stringify(result));
		}else {
			return Identity.signup({
				email: email,
				passwordDigest: Util.digest(password)
			}, provider);
		}
	}).then((identity) => {
		Member.findOne({where: {email: identity.email} }).then((member) => {
			SignupHistory.create({
				acceptLanguage: req.acceptsLanguages().join(','),
				ip: req.connection.remoteAddress,
				member_id: member.id,
				ua: req.get("User-Agent")
			});
			req.session.identity = identity.toJSON();
			req.session.member = member.toJSON();
			res.redirect('/setting');
		});
	}).catch((error) => {
		error = JSON.parse(error);
		console.log('error==========>' + error);
		console.log(error)
		res.render('signup', {error: error, email: email});
	});
});

module.exports = router;