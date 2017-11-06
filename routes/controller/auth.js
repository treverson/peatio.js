const express = require('express');
const request = require('request');
const router = express.Router();
const redis = require('../domain/server.prepare').redis;
const Identity = require('../model/Identity');
const SignupHistory = require('../model/SignupHistory');
const Util = require('../util/util');

router.all('/:provider/callback', function(req, res, next) {
	let result = '';
	let provider = req.params.provider;
	let email = req.body.auth_key.toLowerCase(),
		password = req.body.password;
	Identity.findByEmail(email).then((result) => {
		let identity = result[0].toJSON(),
			member = result[1].toJSON();
		if(identity == undefined){
			result = 'notUser';
			throw new Error(result);
		}else if(identity.passwordDigest != Util.digest(password)){
			result = 'pwdWrong';
			throw new Error(result);
		}else{
			SignupHistory.create({
				acceptLanguage: req.acceptsLanguages().join(','),
				ip: req.connection.remoteAddress,
				member_id: member.id,
				ua: req.get("User-Agent")
			});
			req.session.identity = identity;
			res.redirect('/setting');
		}
	}).catch((error) => {
		console.log('error==========>' + error);
		// req.pipe(request.post('/signin', {result: result, auth_key: email})).pipe(res);
		res.redirect('signin', {error: result, auth_key: email});
	});
});

router.all('/:provider/register', function(req, res, next) {
	let result = '';
	let provider = req.params.provider;
	let email = req.body.email.toLowerCase(),
		password = req.body.password,
		password_conf = req.body.password_confirmation;
	if(password !== password_conf) {
		result = 'pwdRepeat';
	}
	Identity.findByEmail(email).then((result) => {
		let identity = result[0].toJSON(),
			member = result[1].toJSON();
		if(identity != undefined) {
			result = !!result ? result : 'repeat';
			throw new Error(result);
		}
		return Identity.signup({
			email: email,
			passwordDigest: Util.digest(password)
		}, provider);
	}).then((identity) => {
		SignupHistory.create({
			acceptLanguage: req.acceptsLanguages().join(','),
			ip: req.connection.remoteAddress,
			member_id: member.id,
			ua: req.get("User-Agent")
		});
		req.session.identity = identity;
		res.redirect('/setting');
	}).catch((error) => {
		console.log('error==========>' + error);
		res.render('signup', {result: result, email: email});
	});
});

module.exports = router;