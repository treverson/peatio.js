
module.exports = function(sequelize, DataTypes){
	return sequelize.define("api_tokens", {
		memberId: {type: DataTypes.INTEGER, field: "member_id", allowNull: false},
		accessKey: {type: DataTypes.STRING(50), field: "access_key"},
		secretKey: {type: DataTypes.STRING(50), field: "secret_key"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		trustedIpList: {type: DataTypes.STRING, field: "trusted_ip_list"},
		oauthAccessTokenId: {type: DataTypes.STRING, field: "oauth_access_token_id"},
		expireAt: {type: DataTypes.DATE, field: "expire_at"},
		scopes: {type: DataTypes.STRING},
		deletedAt: {type: DataTypes.STRING, field: "deleted_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["access_key"], name: "index_api_tokens_on_access_key", unique: true, method: "BTREE" },
			{fields: ["secret_key"], name: "index_api_tokens_on_secret_key", unique: true, method: "BTREE" }
		]
	});
};