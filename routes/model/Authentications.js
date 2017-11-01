module.exports = function(sequelize, DataTypes){
	return sequelize.define("authentications", {
		provider: {type: DataTypes.STRING},
		uid: {type: DataTypes.STRING},
		token: {type: DataTypes.STRING},
		secret: {type: DataTypes.STRING},
		memberId: {type: DataTypes.STRING, field: "member_id"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		nickname: {type: DataTypes.STRING, field: "nickname"}
	}, {
		freezeTableName: true,
		underscored: true,
		indexes: [
			{fields: ["member_id"], name: "index_authentications_on_member_id", method: "BTREE" },
			{fields: ["provider", "uid"], name: "index_authentications_on_provider_and_uid", method: "BTREE" }
		]
	});
};