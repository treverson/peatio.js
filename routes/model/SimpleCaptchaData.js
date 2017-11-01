
module.exports = function(sequelize, DataTypes){
	return sequelize.define("simple_captcha_data", {
		key: {type: DataTypes.STRING(40)},
		value: {type: DataTypes.STRING(6)},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["key"], name: "idx_key", method: "BTREE" }
		]
	});
};