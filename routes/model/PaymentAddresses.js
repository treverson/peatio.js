
module.exports = function(sequelize, DataTypes){
	return sequelize.define("payment_addresses", {
		accountId: {type: DataTypes.INTEGER, field: "account_id"},
		address: {type: DataTypes.STRING},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		currency: {type: DataTypes.INTEGER}
	}, {
		freezeTableName: true
	});
};