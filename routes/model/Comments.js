
module.exports = function(sequelize, DataTypes){
	return sequelize.define("comments", {
		content: {type: DataTypes.TEXT},
		authorId: {type: DataTypes.INTEGER, field: "author_id"},
		ticketId: {type: DataTypes.INTEGER, field: "ticket_id"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"}
	}, {
		freezeTableName: true
	});
};