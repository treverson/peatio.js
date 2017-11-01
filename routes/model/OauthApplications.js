
module.exports = function(sequelize, DataTypes){
	return sequelize.define("oauth_applications", {
		name: {type: DataTypes.STRING, allowNull: false},
		uid: {type: DataTypes.STRING, allowNull: false},
		secret: {type: DataTypes.STRING, allowNull: false},
		redirectUri: {type: DataTypes.TEXT, field: "redirect_uri", allowNull: false},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["uid"], name: "index_oauth_applications_on_uid", unique: true, method: "BTREE" }
		]
	});
};