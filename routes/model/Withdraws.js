
module.exports = function(sequelize, DataTypes){
	return sequelize.define("withdraws", {
		sn: {type: DataTypes.STRING},
		accountId: {type: DataTypes.INTEGER, field: "account_id"},
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		currency: {type: DataTypes.INTEGER},
		amount: {type: DataTypes.DECIMAL(32, 16)},
		fee: {type: DataTypes.DECIMAL(32, 16)},
		fundUid: {type: DataTypes.STRING, field: "fund_uid"},
		fundExtra: {type: DataTypes.STRING, field: "fund_extra"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		doneAt: {type: DataTypes.DATE, field: "done_at"},
		txid: {type: DataTypes.STRING},
		aasmState: {type: DataTypes.STRING, field: "aasm_state"},
		sum: {type: DataTypes.DECIMAL(32, 16)},
		type: {type: DataTypes.STRING},
	}, {
		freezeTableName: true
	});
};