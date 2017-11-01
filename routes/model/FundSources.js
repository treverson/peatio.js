
module.exports = function(sequelize, DataTypes){
	return sequelize.define("fund_sources", {
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		currency: {type: DataTypes.INTEGER},
		extra: {type: DataTypes.STRING},
		uid: {type: DataTypes.STRING},
		isLocked: {type: DataTypes.BOOLEAN, field: "is_locked"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		deletedAt: {type: DataTypes.STRING, field: "deleted_at"}
	}, {
		freezeTableName: true
	});
};