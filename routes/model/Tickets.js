
module.exports = function(sequelize, DataTypes){
	return sequelize.define("tickets", {
		title: {type: DataTypes.STRING},
		content: {type: DataTypes.TEXT},
		aasmState: {type: DataTypes.STRING, field: "aasm_state"},
		authorId: {type: DataTypes.INTEGER, field: "author_id"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"}
	}, {
		freezeTableName: true
	});
};