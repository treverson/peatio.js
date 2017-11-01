
module.exports = function(sequelize, DataTypes){
	return sequelize.define("assets", {
		type: {type: DataTypes.STRING},
		attachableId: {type: DataTypes.INTEGER, field: "attachable_id"},
		attachableType: {type: DataTypes.STRING(50), field: "attachable_type"},
		file: {type: DataTypes.STRING}
	}, {
		freezeTableName: true
	});
};