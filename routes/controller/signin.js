const express = require('express');
const router = express.Router();
const redis = require('../domain/server.prepare').redis;
const Identity = require('../model/Identity');
const SignupHistory = require('../model/SignupHistory');
const Util = require('../util/util');

router.get('/', function(req, res, next) {
	if(!!req.session.identity){
		res.redirect('/setting');
		return;
	}
	if(!!req.session.login && req.session.login == 'not') {
		delete req.session.login;
		res.render('signin', {error: 'notLogin'});
		return;
	}
	res.render('signin');
});

router.post('/', function(req, res, next) {
	let result = '';
	let provider = req.params.provider;
	let email = req.body.auth_key.toLowerCase(),
	password = req.body.password;
	Identity.findByEmail(email).then((results) => {
		let identity = results[0],
			member = results[1];
		if(identity == undefined) {
			result = 'notUser';
			throw new Error(result);
		}else if(identity.passwordDigest != Util.digest(password)) {
			result = 'pwdWrong';
			throw new Error(result);
		}else if(identity.disabled == true) {
			result = 'disabled';
			throw new Error(result);
		}else{
			SignupHistory.create({
				acceptLanguage: req.acceptsLanguages().join(','),
				ip: req.connection.remoteAddress,
				member_id: member.id,
				ua: req.get("User-Agent")
			});
			req.session.identity = identity.toJSON();
			req.session.member = member.toJSON();
			res.redirect('/setting');
		}
	}).catch((error) => {
		console.log('error==========>' + error);
		res.render('signin', {error: error.message, auth_key: email});
	});
});

router.get('/out', function(req, res, next) {
	delete req.session.identity;
	res.redirect('/');
});

module.exports = router;