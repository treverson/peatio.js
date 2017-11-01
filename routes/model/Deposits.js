
module.exports = function(sequelize, DataTypes){
	return sequelize.define("deposits", {
		accountId: {type: DataTypes.INTEGER, field: "account_id"},
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		currency: {type: DataTypes.INTEGER},
		amount: {type: DataTypes.DECIMAL(32, 16)},
		fee: {type: DataTypes.DECIMAL(32, 16)},
		fundUid: {type: DataTypes.STRING, field: "fund_uid"},
		fundExtra: {type: DataTypes.STRING, field: "fund_extra"},
		txid: {type: DataTypes.STRING},
		state: {type: DataTypes.INTEGER},
		aasmState: {type: DataTypes.STRING, field: "aasm_state"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		doneAt: {type: DataTypes.DATE, field: "done_at"},
		confirmations: {type: DataTypes.STRING},
		type: {type: DataTypes.STRING},
		paymentTransactionId: {type: DataTypes.INTEGER, field: "payment_transaction_id"},
		txout: {type: DataTypes.INTEGER}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["txid", "txout"], name: "index_deposits_on_txid_and_txout", method: "BTREE" }
		]
	});
};