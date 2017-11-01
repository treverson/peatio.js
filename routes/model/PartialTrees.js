
module.exports = function(sequelize, DataTypes){
	return sequelize.define("partial_trees", {
		proofId: {type: DataTypes.INTEGER, field: "proof_id", allowNull: false},
		accountId: {type: DataTypes.INTEGER, field: "account_id", allowNull: false},
		json: {type: DataTypes.TEXT, allowNull: false},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		sum: {type: DataTypes.STRING}
	}, {
		freezeTableName: true
	});
};