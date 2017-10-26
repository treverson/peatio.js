const Sequelize = require('./server.prepare').Sequelize;
const sequelize = require('./server.prepare').sequelize;
const redis = require('./server.prepare').redis;

const KEYS = require("../util/contants").KEYS;

var model = module.exports;

sequelize.sync({ force: false }).then(() => {
	model.DomainAccount.findOne().then((accountInstance) => {
		if (accountInstance == undefined) {
			return model.DomainAccount.create({
				account: "admin",
				appellation: "admin",
				password: "admin#20170829#ubc",
				accountType: "admin"
			});
		} else {
			return accountInstance;
		}
	}).then((accountInstance) => {
		let account = accountInstance.toJSON();
		let ar = {
			username: account.account,
			password: account.password,
			accountId: account.id
		};
		console.log('==================================PARAMETER=====================================');
		console.log(ar);
		let adminkey = `${KEYS.user}${account.account}`;
		console.log(adminkey);
		console.log('==================================   END   =====================================');
		return redis.hmsetAsync(adminkey, ar);
	}).catch((error) => {
		console.log(`init redis error:${error}`);
	});
});