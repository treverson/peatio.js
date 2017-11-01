
module.exports = function(sequelize, DataTypes){
	return sequelize.define("accounts", {
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		currency: {type: DataTypes.INTEGER, field: "currency"},
		balance: {type: DataTypes.DECIMAL(32, 16)},
		locked: {type: DataTypes.DECIMAL(32, 16)},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		currency:{type: DataTypes.INTEGER},
		fun:{type: DataTypes.INTEGER},
		in: {type: DataTypes.DECIMAL(32, 16)},
		out: {type: DataTypes.DECIMAL(32, 16)},
		defaultWithdrawFundSourceId: {type: DataTypes.INTEGER, field: "default_withdraw_fund_source_id"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["member_id", "currency"], name: "index_accounts_on_member_id_and_currency", method: "BTREE" },
			{fields: ["member_id"], name: "index_accounts_on_member_id", method: "BTREE" }
		]
	});
};