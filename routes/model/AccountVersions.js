
module.exports = function(sequelize, DataTypes){
	return sequelize.define("account_versions", {
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		accountId: {type: DataTypes.INTEGER, field: "account_id"},
		reason: {type: DataTypes.INTEGER},
		balance: {type: DataTypes.DECIMAL(32, 16)},
		locked: {type: DataTypes.DECIMAL(32, 16)},
		fee: {type: DataTypes.DECIMAL(32, 16)},
		amount: {type: DataTypes.DECIMAL(32, 16)},
		modifiableId: {type: DataTypes.INTEGER, field: "modifiable_id"},
		modifiableType: {type: DataTypes.STRING, field: "modifiable_type"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		currency: {type: DataTypes.INTEGER},
		fun: {type: DataTypes.INTEGER}
	}, {
		// freezeTableName: true,
		indexes: [
			{fields: ["account_id", "reason"], name: "index_account_versions_on_account_id_and_reason", method: "BTREE" },
			{fields: ["account_id"], name: "index_account_versions_on_account_id", method: "BTREE" },
			{fields: ["member_id", "reason"], name: "index_account_versions_on_member_id_and_reason", method: "BTREE" },
			{fields: ["modifiable_id", "modifiable_type"], name: "index_account_versions_on_modifiable_id_and_modifiable_type", method: "BTREE" }
		]
	});
};