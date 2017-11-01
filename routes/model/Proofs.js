
module.exports = function(sequelize, DataTypes){
	return sequelize.define("proofs", {
		root: {type: DataTypes.STRING},
		currency: {type: DataTypes.INTEGER},
		ready: {type: DataTypes.BOOLEAN},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		sum: {type: DataTypes.STRING},
		addresses: {type: DataTypes.TEXT},
		balance: {type: DataTypes.STRING(30)}
	}, {
		freezeTableName: true
	});
};