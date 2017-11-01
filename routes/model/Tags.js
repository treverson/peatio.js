
module.exports = function(sequelize, DataTypes){
	return sequelize.define("tags", {
		name: {type: DataTypes.STRING, field: "name"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["name"], name: "index_tags_on_name", unique: true, method: "BTREE" }
		]
	});
};