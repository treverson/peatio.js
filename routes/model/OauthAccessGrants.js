
module.exports = function(sequelize, DataTypes){
	return sequelize.define("oauth_access_grants", {
		resourceOwnerId: {type: DataTypes.INTEGER, field: "resource_owner_id", allowNull: false},
		applicationId: {type: DataTypes.INTEGER, field: "application_id", allowNull: false},
		token: {type: DataTypes.STRING, allowNull: false},
		expiresIn: {type: DataTypes.INTEGER, field: "expires_in", allowNull: false},
		redirectUri: {type: DataTypes.TEXT, field: "redirect_uri", allowNull: false},
		createdAt: {type: DataTypes.DATE, field: "created_at", allowNull: false},
		revokedAt: {type: DataTypes.DATE, field: "revoked_at"},
		scopes: {type: DataTypes.STRING}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["token"], name: "index_oauth_access_grants_on_token", unique: true, method: "BTREE" }
		]
	});
};