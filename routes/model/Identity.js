const Util = require('../util/util');
const sequelize = require('../domain/server.prepare').sequelize;
const TABLE = require('../domain/table.define');
const Identities = TABLE.Identities;
const Member = require('./Member');
const ReadMark = require('./ReadMark');
const IdDocument = require('./IdDocument');
const Account = require('./Account');
const Authentication = require('./Authentication');
const Token = require('./Token');

Identities.findByEmail = (email) => {
	return Promise.all([
		Identities.findOne({where: {email: email} }),
		Member.findOne({where: {email: email} })
	]);
}

Identities.signup = (param, provider) => {
	let signIdentity = {},
		signMember = {};
	return Identities.create(param).then((identity) =>{
		return sequelize.transaction((t) => {
			signIdentity = identity;
			let sn = Member.generateSn();
			return Member.findCreateFind({
				where: {email: identity.email, disabled: false},
				defaults: {email: identity.email, sn: sn, activated: false},
				transaction: t
			}).spread((member) => {
				signMember = member;
				return Promise.all([
					ReadMark.findCreateFind({
						where: {readableType: 'Comment', memberId: member.id},
						defaults: {readableType: 'Comment', memberId: member.id},
						transaction: t
					}),
					ReadMark.findCreateFind({
						where: {readableType: 'Ticket', memberId: member.id},
						defaults: {readableType: 'Ticket', memberId: member.id},
						transaction: t
					}),
					IdDocument.findCreateFind({
						where: {memberId: member.id},
						defaults: {aasm: 'unverified', memberId: member.id},
						transaction: t
					}),
					Account.findCreateFind({
						where: {currency: 1, memberId: member.id},
						defaults: {balance: 0, currency: 1, locked: 0.0, memberId: member.id},
						transaction: t
					}),
					Account.findCreateFind({
						where: {currency: 2, memberId: member.id},
						defaults: {balance: 0, currency: 2, locked: 0.0, memberId: member.id},
						transaction: t
					})
				]);
			});
		}).then(() => {
			console.log('transaction============>success');
			return Member.findOne({where: {id: signMember.id} });
		}).then((member) => {
			Authentication.findOrCreate({
				where: {provider: provider, memberId: member.id},
				defaults: {provider: provider, uid: signIdentity.id, memberId: member.id}
			});
			return member;
		}).then((member) => {
			let expireTime = new Date(Date.now() + 30 * 60 * 1000);
			return Token.findOrCreate({
				where: {memberId: member.id, expireAt: {$gt: new Date()}, type: 'activation'},
				defaults: {memberId: member.id, type: 'activation', expireAt: expireTime}
			});
		}).catch((err) => {
			console.log('transaction============>' + err);
		});
	}).then(() => {
		return Identities.findOne({where: {id: signIdentity.id} });
	}).catch((err) => {
		console.log('signup============>' + err);
	});
}

module.exports = Identities;