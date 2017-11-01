
module.exports = function(sequelize, DataTypes){
	return sequelize.define("oauth_access_tokens", {
		resourceOwnerId: {type: DataTypes.INTEGER, field: "resource_owner_id"},
		applicationId: {type: DataTypes.INTEGER, field: "application_id"},
		token: {type: DataTypes.STRING, allowNull: false},
		refreshToken: {type: DataTypes.STRING,  field: "refresh_token"},
		expiresIn: {type: DataTypes.INTEGER, field: "expires_in"},
		redirectUri: {type: DataTypes.TEXT, field: "redirect_uri"},
		revokedAt: {type: DataTypes.DATE, field: "revoked_at"},
		createdAt: {type: DataTypes.DATE, field: "created_at", allowNull: false},
		scopes: {type: DataTypes.STRING},
		deletedAt: {type: DataTypes.DATE, field: "deleted_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true, method: "BTREE" },
			{fields: ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id", unique: true, method: "BTREE" },
			{fields: ["token"], name: "index_oauth_access_tokens_on_token", unique: true, method: "BTREE" }
		]
	});
};