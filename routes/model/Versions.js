
module.exports = function(sequelize, DataTypes){
	return sequelize.define("versions", {
		itemType: {type: DataTypes.STRING, field: "item_type", allowNull: false},
		itemId: {type: DataTypes.INTEGER, field: "item_id", allowNull: false},
		event: {type: DataTypes.STRING, allowNull: false},
		whodunnit: {type: DataTypes.STRING},
		object: {type: DataTypes.TEXT},
		createdAt: {type: DataTypes.DATE, field: "created_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", method: "BTREE" }
		]
	});
};