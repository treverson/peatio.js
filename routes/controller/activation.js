const express = require('express');
const router = express.Router();
const Token = require('../model/Token');
const Member = require('../model/Member');

router.get('/new', function(req, res, next) {
	let member = req.session.member;
	let expireTime = new Date(Date.now() + 30 * 60 * 1000);
	Token.findOrCreate({
		where: {memberId: member.id, expireAt: {$gt: new Date()}, type: 'activation'},
		defaults: {memberId: member.id, type: 'activation', expireAt: expireTime}
	}).then((token, created) => {
		//发送邮件
		res.redirect('/setting/setting');
	});
});

router.get('/activation/:token', function(req, res, next) {
	let token = req.params.token;
	Token.findOne({
		token: token
	}).then((token) => {
		if(!token){
			//不存在
			return Promise.reject('notExists');
		}else if(token.expireAt < Date.locale()){
			//已过期
			return Promise.reject('expired');
		}else{
			//通过验证
			return Member.update(
				{activated: true},
				{where: {id: token.MemberId} }
			);
		}
	}).then((member) => {
		req.session.member = member[0].toJSON();
		res.redirect('/setting/setting');
	}).cache((err) => {
		console.log('activation====================>' + err);
		res.redirect('/setting/setting');
	})
});

module.exports = router;