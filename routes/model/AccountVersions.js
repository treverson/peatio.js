const Sequelize = require('../domain/server.prepare').Sequelize;
const sequelize = require('../domain/server.prepare').sequelize;

const AccountVersions = sequelize.define("account_versions", {
	memberId: {
		type: Sequelize.INTEGER
		field: "member_id"
	},
	accountId: {
		type: Sequelize.INTEGER,
		field: "account_id"
	},
	reason: {
		type: Sequelize.INTEGER
	},
	balance: {
		type: Sequelize.DECIMAL(32, 16)
	},
	locked: {
		type: Sequelize.DECIMAL(32, 16)
	},
	fee: {
		type: Sequelize.DECIMAL(32, 16)
	},
	amount: {
		type: Sequelize.DECIMAL(32, 16)
	},
	modifiableId: {
		type: INTEGER,
		field: "modifiableId"
	},
	modifiableType: {
		type: Sequelize.STRING,
		field: "modifiable_type"
	},
	createdAt: {
		type: Sequelize.DATE,
		field: "created_at"
	},
	updatedAt: {
		type: Sequelize.DATE,
		field: "updated_at"
	},
	currency:{
		type:Sequelize.INTEGER
	},
	fun:{
		type:Sequelize.INTEGER
	}
}, {
	indexes: [
		{
			fields: ["account_id", "reason"],
			name: "index_account_versions_on_account_id_and_reason",
			method "btree"
		},
		{
			fields: ["account_id"],
			name: "index_account_versions_on_account_id",
			method "btree"
		},
		{
			fields: ["member_id", "reason"],
			name: "index_account_versions_on_member_id_and_reason",
			method "btree"
		},
		},
		{
			fields: ["modifiable_id", "modifiable_type"],
			name: "index_account_versions_on_modifiable_id_and_modifiable_type",
			method "btree"
		}
	]
});