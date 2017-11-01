
module.exports = function(sequelize, DataTypes){
	return sequelize.define("documents", {
		key: {type: DataTypes.STRING},
		title: {type: DataTypes.STRING},
		body: {type: DataTypes.TEXT},
		isAuth: {type: DataTypes.BOOLEAN, field: "is_auth"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		desc: {type: DataTypes.TEXT},
		keywords: {type: DataTypes.TEXT}
	}, {
		freezeTableName: true
	});
};