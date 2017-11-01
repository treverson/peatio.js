
module.exports = function(sequelize, DataTypes){
	return sequelize.define("tokens", {
		token: {type: DataTypes.STRING},
		expireAt: {type: DataTypes.DATE, field: "expire_at"},
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		isUsed: {type: DataTypes.BOOLEAN, field: "is_used"},
		type: {type: DataTypes.STRING},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["type", "token", "expire_at", "is_used"], name: "index_tokens_on_type_and_token_and_expire_at_and_is_used", method: "BTREE" }
		]
	});
};