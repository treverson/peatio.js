const redis = require('./server.prepare').redis;
const sequelize = require('./server.prepare').sequelize;

const AccountVersions = sequelize.import('../model/AccountVersions.js');
const Accounts = sequelize.import('../model/Accounts.js');
const ApiTokens = sequelize.import('../model/ApiTokens.js');
const Assets = sequelize.import('../model/Assets.js');
const AuditLogs = sequelize.import('../model/AuditLogs.js');
const Authentications = sequelize.import('../model/Authentications.js');
const Comments = sequelize.import('../model/Comments.js');
const Deposits = sequelize.import('../model/Deposits.js');
const DocumentTranslations = sequelize.import('../model/DocumentTranslations.js');
const Documents = sequelize.import('../model/Documents.js');
const FundSources = sequelize.import('../model/FundSources.js');
const IdDocuments = sequelize.import('../model/IdDocuments.js');
const Identities = sequelize.import('../model/Identities.js');
const Members = sequelize.import('../model/Members.js');
const OauthAccessGrants = sequelize.import('../model/OauthAccessGrants.js');
const OauthAccessTokens = sequelize.import('../model/OauthAccessTokens.js');
const OauthApplications = sequelize.import('../model/OauthApplications.js');
const Orders = sequelize.import('../model/Orders.js');
const PartialTrees = sequelize.import('../model/PartialTrees.js');
const PaymentAddresses = sequelize.import('../model/PaymentAddresses.js');
const PaymentTransactions = sequelize.import('../model/PaymentTransactions.js');
const Proofs = sequelize.import('../model/Proofs.js');
const ReadMarks = sequelize.import('../model/ReadMarks.js');
const RunningAccounts = sequelize.import('../model/RunningAccounts.js');
const SignupHistories = sequelize.import('../model/SignupHistories.js');
const SimpleCaptchaData = sequelize.import('../model/SimpleCaptchaData.js');
const Taggings = sequelize.import('../model/Taggings.js');
const Tags = sequelize.import('../model/Tags.js');
const Tickets = sequelize.import('../model/Tickets.js');
const Tokens = sequelize.import('../model/Tokens.js');
const Trades = sequelize.import('../model/Trades.js');
const TwoFactors = sequelize.import('../model/TwoFactors.js');
const Versions = sequelize.import('../model/Versions.js');
const Withdraws = sequelize.import('../model/Withdraws.js');

const KEYS = require("../util/contants").KEYS;

const model = module.exports;

model.AccountVersions = AccountVersions;
model.Accounts = Accounts;
model.ApiTokens = ApiTokens;
model.Assets = Assets;
model.AuditLogs = AuditLogs;
model.Authentications = Authentications;

Authentications.belongsTo(Members);

model.Comments = Comments;
model.Deposits = Deposits;
model.DocumentTranslations = DocumentTranslations;
model.Documents = Documents;
model.FundSources = FundSources;
model.IdDocuments = IdDocuments;
model.Identities = Identities;
model.Members = Members;

Members.hasMany(Authentications);

model.OauthAccessGrants = OauthAccessGrants;
model.OauthAccessTokens = OauthAccessTokens;
model.OauthApplications = OauthApplications;
model.Orders = Orders;
model.PartialTrees = PartialTrees;
model.PaymentAddresses = PaymentAddresses;
model.PaymentTransactions = PaymentTransactions;
model.Proofs = Proofs;
model.ReadMarks = ReadMarks;
model.RunningAccounts = RunningAccounts;
model.SignupHistories = SignupHistories;
model.SimpleCaptchaData = SimpleCaptchaData;
model.Taggings = Taggings;
model.Tags = Tags;
model.Tickets = Tickets;
model.Tokens = Tokens;
model.Trades = Trades;
model.TwoFactors = TwoFactors;
model.Versions = Versions;
model.Withdraws = Withdraws;

sequelize.sync({ force: true }).then(() => {
	Identities.findOne().then((accountInstance) => {
		if (accountInstance == undefined) {
			let adminIdentity = {};
			return Identities.create({
				email: 'admin@uwifi.com',
				passwordDigest: 'admin2017',
				isActive: true
			}).then((admin) => {
				adminIdentity = admin.toJSON();
				return Members.findOrCreate({
					where: {email: adminIdentity.email},
					defaults: {email: adminIdentity.email}
				});
			}).spread((member, created) => {
				let authentication = Authentications.build({provider: 'provider', uid: adminIdentity.id});
				return member.createAuthentication(authentication.toJSON());
			}).then(() => {
				return Identities.findById(adminIdentity.id);
			});
		} else {
			return accountInstance;
		}
	}).then((accountInstance) => {
		let account = accountInstance.toJSON();
		let ar = {
			username: account.email,
			password: account.passwordDigest,
			accountId: account.id
		};
		console.log('==================================PARAMETER=====================================');
		console.log(ar);
		let adminkey = `${KEYS.user}${account.email}`;
		console.log(adminkey);
		console.log('==================================   END   =====================================');
		return redis.hmsetAsync(adminkey, ar);
	}).catch((error) => {
		console.log(`init redis error:${error}`);
	});
});