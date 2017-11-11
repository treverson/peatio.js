const Sequelize = require('./server.prepare').Sequelize;
const sequelize = require('./server.prepare').sequelize;
const redis = require('./server.prepare').redis;
const Util = require('../util/util');

const KEYS = require("../util/contants").KEYS;

var model = module.exports;

const AccountVersions = model.AccountVersions = sequelize.define("account_versions", {
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	accountId: {type: Sequelize.INTEGER, field: "account_id"},
	reason: {type: Sequelize.INTEGER},
	balance: {type: Sequelize.DECIMAL(32, 16)},
	locked: {type: Sequelize.DECIMAL(32, 16)},
	fee: {type: Sequelize.DECIMAL(32, 16)},
	amount: {type: Sequelize.DECIMAL(32, 16)},
	modifiableId: {type: Sequelize.INTEGER, field: "modifiable_id"},
	modifiableType: {type: Sequelize.STRING, field: "modifiable_type"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	currency: {type: Sequelize.INTEGER},
	fun: {type: Sequelize.INTEGER}
}, {
	indexes: [
		{fields: ["account_id", "reason"], name: "index_account_versions_on_account_id_and_reason", method: "BTREE" },
		{fields: ["account_id"], name: "index_account_versions_on_account_id", method: "BTREE" },
		{fields: ["member_id", "reason"], name: "index_account_versions_on_member_id_and_reason", method: "BTREE" },
		{fields: ["modifiable_id", "modifiable_type"], name: "index_account_versions_on_modifiable_id_and_modifiable_type", method: "BTREE" }
	]
});

const Accounts = model.Accounts = sequelize.define("accounts", {
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	currency: {type: Sequelize.INTEGER, field: "currency"},
	balance: {type: Sequelize.DECIMAL(32, 16)},
	locked: {type: Sequelize.DECIMAL(32, 16)},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	currency:{type: Sequelize.INTEGER},
	fun:{type: Sequelize.INTEGER},
	in: {type: Sequelize.DECIMAL(32, 16)},
	out: {type: Sequelize.DECIMAL(32, 16)},
	defaultWithdrawFundSourceId: {type: Sequelize.INTEGER, field: "default_withdraw_fund_source_id"}
}, {
	indexes: [
		{fields: ["member_id", "currency"], name: "index_accounts_on_member_id_and_currency", method: "BTREE" },
		{fields: ["member_id"], name: "index_accounts_on_member_id", method: "BTREE" }
	]
});

const ApiTokens = model.ApiTokens = sequelize.define("api_tokens", {
	memberId: {type: Sequelize.INTEGER, field: "member_id", allowNull: false},
	accessKey: {type: Sequelize.STRING(50), field: "access_key"},
	secretKey: {type: Sequelize.STRING(50), field: "secret_key"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	trustedIpList: {type: Sequelize.STRING, field: "trusted_ip_list"},
	oauthAccessTokenId: {type: Sequelize.STRING, field: "oauth_access_token_id"},
	expireAt: {type: Sequelize.DATE, field: "expire_at"},
	scopes: {type: Sequelize.STRING},
	deletedAt: {type: Sequelize.STRING, field: "deleted_at"}
}, {
	indexes: [
		{fields: ["access_key"], name: "index_api_tokens_on_access_key", unique: true, method: "BTREE" },
		{fields: ["secret_key"], name: "index_api_tokens_on_secret_key", unique: true, method: "BTREE" }
	]
});

const Assets = model.Assets = sequelize.define("assets", {
	type: {type: Sequelize.STRING},
	attachableId: {type: Sequelize.INTEGER, field: "attachable_id"},
	attachableType: {type: Sequelize.STRING(50), field: "attachable_type"},
	file: {type: Sequelize.STRING}
});

const AuditLogs = model.AuditLogs = sequelize.define("audit_logs", {
	type: {type: Sequelize.STRING},
	operatorId: {type: Sequelize.STRING, field: "operator_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	auditableId: {type: Sequelize.INTEGER, field: "auditable_id"},
	auditable_type: {type: Sequelize.STRING, field: "auditable_type"},
	sourceState: {type: Sequelize.STRING, field: "source_state"},
	targetState: {type: Sequelize.STRING, field: "target_state"}
}, {
	indexes: [
		{fields: ["auditable_id", "auditable_type"], name: "index_audit_logs_on_auditable_id_and_auditable_type", method: "BTREE" },
		{fields: ["operator_id"], name: "index_audit_logs_on_operator_id", method: "BTREE" }
	]
});

const Authentications = model.Authentications = sequelize.define("authentications", {
	provider: {type: Sequelize.STRING},
	uid: {type: Sequelize.STRING},
	token: {type: Sequelize.STRING},
	secret: {type: Sequelize.STRING},
	memberId: {type: Sequelize.STRING, field: "member_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	nickname: {type: Sequelize.STRING, field: "nickname"}
}, {
	underscored: true,
	indexes: [
		{fields: ["member_id"], name: "index_authentications_on_member_id", method: "BTREE" },
		{fields: ["provider", "uid"], name: "index_authentications_on_provider_and_uid", method: "BTREE" }
	]
});

const Comments = model.Comments = sequelize.define("comments", {
	content: {type: Sequelize.TEXT},
	authorId: {type: Sequelize.INTEGER, field: "author_id"},
	ticketId: {type: Sequelize.INTEGER, field: "ticket_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
});

const Deposits = model.Deposits = sequelize.define("deposits", {
	accountId: {type: Sequelize.INTEGER, field: "account_id"},
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	currency: {type: Sequelize.INTEGER},
	amount: {type: Sequelize.DECIMAL(32, 16)},
	fee: {type: Sequelize.DECIMAL(32, 16)},
	fundUid: {type: Sequelize.STRING, field: "fund_uid"},
	fundExtra: {type: Sequelize.STRING, field: "fund_extra"},
	txid: {type: Sequelize.STRING},
	state: {type: Sequelize.INTEGER},
	aasmState: {type: Sequelize.STRING, field: "aasm_state"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	doneAt: {type: Sequelize.DATE, field: "done_at"},
	confirmations: {type: Sequelize.STRING},
	type: {type: Sequelize.STRING},
	paymentTransactionId: {type: Sequelize.INTEGER, field: "payment_transaction_id"},
	txout: {type: Sequelize.INTEGER}
}, {
	indexes: [
		{fields: ["txid", "txout"], name: "index_deposits_on_txid_and_txout", method: "BTREE" }
	]
});

const DocumentTranslations = model.DocumentTranslations = sequelize.define("document_translations", {
	documentId: {type: Sequelize.INTEGER, field: "document_id", allowNull: false},
	locale: {type: Sequelize.STRING, allowNull: false},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	title: {type: Sequelize.STRING},
	body: {type: Sequelize.TEXT},
	desc: {type: Sequelize.TEXT},
	keywords: {type: Sequelize.TEXT}
}, {
	indexes: [
		{fields: ["document_id"], name: "index_document_translations_on_document_id", method: "BTREE" },
		{fields: ["locale"], name: "index_document_translations_on_locale", method: "BTREE" }
	]
});

const Documents = model.Documents = sequelize.define("documents", {
	key: {type: Sequelize.STRING},
	title: {type: Sequelize.STRING},
	body: {type: Sequelize.TEXT},
	isAuth: {type: Sequelize.BOOLEAN, field: "is_auth"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	desc: {type: Sequelize.TEXT},
	keywords: {type: Sequelize.TEXT}
});

const FundSources = model.FundSources = sequelize.define("fund_sources", {
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	currency: {type: Sequelize.INTEGER},
	extra: {type: Sequelize.STRING},
	uid: {type: Sequelize.STRING},
	isLocked: {type: Sequelize.BOOLEAN, field: "is_locked"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	deletedAt: {type: Sequelize.STRING, field: "deleted_at"}
});

const IdDocuments = model.IdDocuments = sequelize.define("id_documents", {
	idDocumentType: {type: Sequelize.INTEGER, field: "id_document_type"},
	name: {type: Sequelize.STRING},
	IdDocumentNumber: {type: Sequelize.STRING, field: "id_document_number"},
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	birthDate: {type: Sequelize.DATE, field: "birth_date"},
	address: {type: Sequelize.TEXT},
	city: {type: Sequelize.STRING},
	country: {type: Sequelize.STRING},
	zipcode: {type: Sequelize.STRING},
	idBillType: {type: Sequelize.INTEGER, field: "id_bill_type"},
	aasmState: {type: Sequelize.STRING, field: "aasm_state"}
});

const Identities = model.Identities = sequelize.define("identities", {
	email: {type: Sequelize.STRING},
	passwordDigest: {type: Sequelize.STRING, field: "password_digest"},
	isActive: {type: Sequelize.STRING, field: "is_active"},
	retryCount: {type: Sequelize.INTEGER, field: "retry_count"},
	isLocked: {type: Sequelize.BOOLEAN, field: "is_locked"},
	lockedAt: {type: Sequelize.DATE, field: "locked_at"},
	lastVerifyAt: {type: Sequelize.DATE, field: "last_verify_at"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
});

const Members = model.Members = sequelize.define("members", {
	sn: {type: Sequelize.STRING},
	displayName: {type: Sequelize.STRING, field: "display_name"},
	email: {type: Sequelize.STRING},
	identityId: {type: Sequelize.INTEGER, field: "identity_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	state: {type: Sequelize.INTEGER},
	activated: {type: Sequelize.BOOLEAN},
	countryCode: {type: Sequelize.INTEGER, field: "country_code"},
	phoneNumber: {type: Sequelize.STRING, field: "phone_number"},
	disabled: {type: Sequelize.BOOLEAN, defaultValue: false},
	apiDisabled: {type: Sequelize.BOOLEAN, field: "api_disabled", defaultValue: false},
	nickname: {type: Sequelize.STRING, field: "nickname"}
}, {
	underscored: true
});

const OauthAccessGrants = model.OauthAccessGrants = sequelize.define("oauth_access_grants", {
	resourceOwnerId: {type: Sequelize.INTEGER, field: "resource_owner_id", allowNull: false},
	applicationId: {type: Sequelize.INTEGER, field: "application_id", allowNull: false},
	token: {type: Sequelize.STRING, allowNull: false},
	expiresIn: {type: Sequelize.INTEGER, field: "expires_in", allowNull: false},
	redirectUri: {type: Sequelize.TEXT, field: "redirect_uri", allowNull: false},
	createdAt: {type: Sequelize.DATE, field: "created_at", allowNull: false},
	revokedAt: {type: Sequelize.DATE, field: "revoked_at"},
	scopes: {type: Sequelize.STRING}
}, {
	indexes: [
		{fields: ["token"], name: "index_oauth_access_grants_on_token", unique: true, method: "BTREE" }
	]
});

const OauthAccessTokens = model.OauthAccessTokens = sequelize.define("oauth_access_tokens", {
	resourceOwnerId: {type: Sequelize.INTEGER, field: "resource_owner_id"},
	applicationId: {type: Sequelize.INTEGER, field: "application_id"},
	token: {type: Sequelize.STRING, allowNull: false},
	refreshToken: {type: Sequelize.STRING,  field: "refresh_token"},
	expiresIn: {type: Sequelize.INTEGER, field: "expires_in"},
	redirectUri: {type: Sequelize.TEXT, field: "redirect_uri"},
	revokedAt: {type: Sequelize.DATE, field: "revoked_at"},
	createdAt: {type: Sequelize.DATE, field: "created_at", allowNull: false},
	scopes: {type: Sequelize.STRING},
	deletedAt: {type: Sequelize.DATE, field: "deleted_at"}
}, {
	indexes: [
		{fields: ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true, method: "BTREE" },
		{fields: ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id", unique: true, method: "BTREE" },
		{fields: ["token"], name: "index_oauth_access_tokens_on_token", unique: true, method: "BTREE" }
	]
});

const OauthApplications = model.OauthApplications = sequelize.define("oauth_applications", {
	name: {type: Sequelize.STRING, allowNull: false},
	uid: {type: Sequelize.STRING, allowNull: false},
	secret: {type: Sequelize.STRING, allowNull: false},
	redirectUri: {type: Sequelize.TEXT, field: "redirect_uri", allowNull: false},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
}, {
	indexes: [
		{fields: ["uid"], name: "index_oauth_applications_on_uid", unique: true, method: "BTREE" }
	]
});

const Orders = model.Orders = sequelize.define("orders", {
	bid: {type: Sequelize.INTEGER},
	ask: {type: Sequelize.INTEGER},
	currency: {type: Sequelize.INTEGER},
	price: {type: Sequelize.DECIMAL(32, 16)},
	volume: {type: Sequelize.DECIMAL(32, 16)},
	originVolume: {type: Sequelize.DECIMAL(32, 16), field: "origin_volume"},
	state: {type: Sequelize.INTEGER},
	doneAt: {type: Sequelize.DATE, field: "done_at"},
	type: {type: Sequelize.STRING(8)},
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	redirectUri: {type: Sequelize.TEXT, field: "redirect_uri"},
	sn: {type: Sequelize.STRING},
	source: {type: Sequelize.STRING},
	ordType: {type: Sequelize.STRING, field: "ord_type"},
	locked: {type: Sequelize.DECIMAL(32, 16)},
	originLocked: {type: Sequelize.DECIMAL(32, 16), field: "origin_locked"},
	fundsReceived: {type: Sequelize.DECIMAL(32, 16), field: "funds_received"},
	tradesCount: {type: Sequelize.INTEGER, field: "trades_count"}
}, {
	indexes: [
		{fields: ["currency", "state"], name: "index_orders_on_currency_and_state", method: "BTREE" },
		{fields: ["member_id", "state"], name: "index_orders_on_member_id_and_state", method: "BTREE" },
		{fields: ["member_id"], name: "index_orders_on_member_id", method: "BTREE" },
		{fields: ["state"], name: "index_orders_on_state", method: "BTREE" }
	]
});

const PartialTrees = model.PartialTrees = sequelize.define("partial_trees", {
	proofId: {type: Sequelize.INTEGER, field: "proof_id", allowNull: false},
	accountId: {type: Sequelize.INTEGER, field: "account_id", allowNull: false},
	json: {type: Sequelize.TEXT, allowNull: false},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	sum: {type: Sequelize.STRING}
});

const PaymentAddresses = model.PaymentAddresses = sequelize.define("payment_addresses", {
	accountId: {type: Sequelize.INTEGER, field: "account_id"},
	address: {type: Sequelize.STRING},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	currency: {type: Sequelize.INTEGER}
});

const PaymentTransactions = model.PaymentTransactions = sequelize.define("payment_transactions", {
	txid: {type: Sequelize.STRING},
	amount: {type: Sequelize.DECIMAL(32, 16)},
	confirmations: {type: Sequelize.INTEGER},
	address: {type: Sequelize.STRING},
	state: {type: Sequelize.INTEGER},
	aasmState: {type: Sequelize.STRING, field: "aasm_state"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	receiveAt: {type: Sequelize.DATE, field: "receive_at"},
	dontAt: {type: Sequelize.DATE, field: "dont_at"},
	currency: {type: Sequelize.INTEGER},
	type: {type: Sequelize.STRING(60)},
	txout: {type: Sequelize.INTEGER}
}, {
	indexes: [
		{fields: ["txid", "txout"], name: "index_payment_transactions_on_txid_and_txout", method: "BTREE" },
		{fields: ["type"], name: "index_payment_transactions_on_type", method: "BTREE" }
	]
});

const Proofs = model.Proofs = sequelize.define("proofs", {
	root: {type: Sequelize.STRING},
	currency: {type: Sequelize.INTEGER},
	ready: {type: Sequelize.BOOLEAN},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	sum: {type: Sequelize.STRING},
	addresses: {type: Sequelize.TEXT},
	balance: {type: Sequelize.STRING(30)}
});

const ReadMarks = model.ReadMarks = sequelize.define("read_marks", {
	readableId: {type: Sequelize.INTEGER, field: "readable_id"},
	memberId: {type: Sequelize.INTEGER, field: "member_id", allowNull: false},
	readableType: {type: Sequelize.STRING(20), field: "readable_type", allowNull: false},
	timestamp: {type: Sequelize.DATE
	}
}, {
	indexes: [
		{fields: ["member_id"], name: "index_read_marks_on_member_id", method: "BTREE" },
		{fields: ["readable_type", "readable_id"], name: "index_read_marks_on_readable_type_and_readable_id", method: "BTREE" }
	]
});

const RunningAccounts = model.RunningAccounts = sequelize.define("running_accounts", {
	category: {type: Sequelize.INTEGER},
	income: {type: Sequelize.DECIMAL(32, 16), defaultValue: 0.0, allowNull: false},
	expenses: {type: Sequelize.DECIMAL(32, 16), defaultValue: 0.0, allowNull: false},
	currency: {type: Sequelize.INTEGER},
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	sourceId: {type: Sequelize.INTEGER, field: "source_id"},
	sourceType: {type: Sequelize.STRING, field: "source_type"},
	note: {type: Sequelize.STRING},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
}, {
	indexes: [
		{fields: ["member_id"], name: "index_running_accounts_on_member_id", method: "BTREE" },
		{fields: ["source_id", "source_type"], name: "index_running_accounts_on_source_id_and_source_type", method: "BTREE" }
	]
});

const SignupHistories = model.SignupHistories = sequelize.define("signup_histories", {
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	ip: {type: Sequelize.STRING},
	acceptLanguage: {type: Sequelize.STRING, field: "accept_language"},
	ua: {type: Sequelize.STRING},
	createdAt: {type: Sequelize.DATE, field: "created_at"}
}, {
	updatedAt: false,
	indexes: [
		{fields: ["member_id"], name: "index_signup_histories_on_member_id", method: "BTREE" }
	]
});

const SimpleCaptchaData = model.SimpleCaptchaData = sequelize.define("simple_captcha_data", {
	key: {type: Sequelize.STRING(40)},
	value: {type: Sequelize.STRING(6)},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
}, {
	indexes: [
		{fields: ["key"], name: "idx_key", method: "BTREE" }
	]
});

const Taggings = model.Taggings = sequelize.define("taggings", {
	tagId: {type: Sequelize.INTEGER, field: "tag_id"},
	taggableId: {type: Sequelize.INTEGER, field: "taggable_id"},
	taggableType: {type: Sequelize.STRING, field: "taggable_type"},
	taggerId: {type: Sequelize.INTEGER, field: "tagger_id"},
	taggerType: {type: Sequelize.STRING, field: "tagger_type"},
	context: {type: Sequelize.STRING(128)},
	createdAt: {type: Sequelize.DATE, field: "created_at"}
}, {
	indexes: [ {fields: ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, method: "BTREE" }
	]
});

modelTags = sequelize.define("tags", {
	name: {type: Sequelize.STRING, field: "name"}
}, {
	indexes: [
		{fields: ["name"], name: "index_tags_on_name", unique: true, method: "BTREE" }
	]
});

const Tickets = model.Tickets = sequelize.define("tickets", {
	title: {type: Sequelize.STRING},
	content: {type: Sequelize.TEXT},
	aasmState: {type: Sequelize.STRING, field: "aasm_state"},
	authorId: {type: Sequelize.INTEGER, field: "author_id"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
});

const Tokens = model.Tokens = sequelize.define("tokens", {
	token: {type: Sequelize.STRING},
	expireAt: {type: Sequelize.DATE, field: "expire_at"},
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	isUsed: {type: Sequelize.BOOLEAN, field: "is_used"},
	type: {type: Sequelize.STRING},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"}
}, {
	indexes: [
		{fields: ["type", "token", "expire_at", "is_used"], name: "index_tokens_on_type_and_token_and_expire_at_and_is_used", method: "BTREE" }
	]
});

const Trades = model.Trades = sequelize.define("trades", {
	price: {type: Sequelize.DECIMAL(32, 16)},
	volume: {type: Sequelize.DECIMAL(32, 16)},
	askId: {type: Sequelize.INTEGER, field: "ask_id"},
	bidId: {type: Sequelize.INTEGER, field: "bid_id"},
	trend: {type: Sequelize.INTEGER},
	currency: {type: Sequelize.INTEGER},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	askMemberId: {type: Sequelize.INTEGER, field: "ask_member_id"},
	bidMemberId: {type: Sequelize.INTEGER, field: "bid_member_id"},
	isUsed: {type: Sequelize.BOOLEAN, field: "is_used"},
	funds: {type: Sequelize.DECIMAL(32, 16)}
}, {
	indexes: [
		{fields: ["ask_id"], name: "index_trades_on_ask_id", method: "BTREE" },
		{fields: ["ask_member_id"], name: "index_trades_on_ask_member_id", method: "BTREE" },
		{fields: ["bid_id"], name: "index_trades_on_bid_id", method: "BTREE" },
		{fields: ["bid_member_id"], name: "index_trades_on_bid_member_id", method: "BTREE" },
		{fields: ["created_at"], name: "index_trades_on_created_at", method: "BTREE" },
		{fields: ["currency"], name: "index_trades_on_currency", method: "BTREE" }
	]
});

const TwoFactors = model.TwoFactors = sequelize.define("two_factors", {
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	otpSecret: {type: Sequelize.DATE, field: "otp_secret"},
	lastVerifyAt: {type: Sequelize.DATE, field: "last_verify_at"},
	activated: {type: Sequelize.BOOLEAN},
	type: {type: Sequelize.STRING},
	refreshedAt: {type: Sequelize.DATE, field: "refreshed_at"}
});

const Versions = model.Versions = sequelize.define("versions", {
	itemType: {type: Sequelize.STRING, field: "item_type", allowNull: false},
	itemId: {type: Sequelize.INTEGER, field: "item_id", allowNull: false},
	event: {type: Sequelize.STRING, allowNull: false},
	whodunnit: {type: Sequelize.STRING},
	object: {type: Sequelize.TEXT},
	createdAt: {type: Sequelize.DATE, field: "created_at"}
}, {
	indexes: [
		{fields: ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", method: "BTREE" }
	]
});

const Withdraws = model.Withdraws = sequelize.define("withdraws", {
	sn: {type: Sequelize.STRING},
	accountId: {type: Sequelize.INTEGER, field: "account_id"},
	memberId: {type: Sequelize.INTEGER, field: "member_id"},
	currency: {type: Sequelize.INTEGER},
	amount: {type: Sequelize.DECIMAL(32, 16)},
	fee: {type: Sequelize.DECIMAL(32, 16)},
	fundUid: {type: Sequelize.STRING, field: "fund_uid"},
	fundExtra: {type: Sequelize.STRING, field: "fund_extra"},
	createdAt: {type: Sequelize.DATE, field: "created_at"},
	updatedAt: {type: Sequelize.DATE, field: "updated_at"},
	doneAt: {type: Sequelize.DATE, field: "done_at"},
	txid: {type: Sequelize.STRING},
	aasmState: {type: Sequelize.STRING, field: "aasm_state"},
	sum: {type: Sequelize.DECIMAL(32, 16)},
	type: {type: Sequelize.STRING},
});

sequelize.sync({ force: true }).then(() => {
	Identities.findOne().then((accountInstance) => {
		if (accountInstance == undefined) {
			let signIdentity = {},
				signMember = {};
			return Identities.create({
				email: 'admin@uwifi.com',
				passwordDigest: Util.digest('admin2017'),
				isActive: true
			}).then((identity) =>{
				return sequelize.transaction((t) => {
					signIdentity = identity;
					let sn = 'PEA' + Util.randomBase(8) + 'TIO';
					return Members.findCreateFind({
						where: {email: identity.email, disabled: false},
						defaults: {email: identity.email, sn: sn, activated: false},
						transaction: t
					}).spread((member) => {
						signMember = member;
						return Promise.all([
							ReadMarks.findCreateFind({
								where: {readableType: 'Comment', memberId: member.id},
								defaults: {readableType: 'Comment', memberId: member.id},
								transaction: t
							}),
							ReadMarks.findCreateFind({
								where: {readableType: 'Ticket', memberId: member.id},
								defaults: {readableType: 'Ticket', memberId: member.id},
								transaction: t
							}),
							IdDocuments.findCreateFind({
								where: {memberId: member.id},
								defaults: {aasm: 'unverified', memberId: member.id},
								transaction: t
							}),
							Accounts.findCreateFind({
								where: {currency: 1, memberId: member.id},
								defaults: {balance: 0, currency: 1, locked: 0.0, memberId: member.id},
								transaction: t
							}),
							Accounts.findCreateFind({
								where: {currency: 2, memberId: member.id},
								defaults: {balance: 0, currency: 2, locked: 0.0, memberId: member.id},
								transaction: t
							})
						]);
					});
				}).then(() => {
					console.log('transaction============>success');
					return Members.findOne({where: {id: signMember.id} });
				}).then((member) => {
					Authentications.findOrCreate({
						where: {provider: 'identity', memberId: member.id},
						defaults: {provider: 'identity', uid: signIdentity.id, memberId: member.id}
					});
					return member;
				}).then((member) => {
					let expireTime = new Date(Date.now() + 30 * 60 * 1000);
					return Tokens.findOrCreate({
						where: {memberId: member.id, expireAt: {$gt: new Date()}, type: 'activation'},
						defaults: {memberId: member.id, type: 'activation', expireAt: expireTime}
					});
				}).catch((err) => {
					console.log('transaction============>' + err);
					console.log(err);
				});
			}).then(() => {
				return Identities.findOne({where: {id: signIdentity.id} });
			}).catch((err) => {
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
		console.log(Date.locale());
		console.log('==================================   END   =====================================');
		return redis.hmsetAsync(adminkey, ar);
	}).catch((error) => {
		console.log(`init redis error:${error}`);
		console.log(error)
	});
});