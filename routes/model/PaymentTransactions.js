
module.exports = function(sequelize, DataTypes){
	return sequelize.define("payment_transactions", {
		txid: {type: DataTypes.STRING},
		amount: {type: DataTypes.DECIMAL(32, 16)},
		confirmations: {type: DataTypes.INTEGER},
		address: {type: DataTypes.STRING},
		state: {type: DataTypes.INTEGER},
		aasmState: {type: DataTypes.STRING, field: "aasm_state"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		receiveAt: {type: DataTypes.DATE, field: "receive_at"},
		dontAt: {type: DataTypes.DATE, field: "dont_at"},
		currency: {type: DataTypes.INTEGER},
		type: {type: DataTypes.STRING(60)},
		txout: {type: DataTypes.INTEGER}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["txid", "txout"], name: "index_payment_transactions_on_txid_and_txout", method: "BTREE" },
			{fields: ["type"], name: "index_payment_transactions_on_type", method: "BTREE" }
		]
	});
};