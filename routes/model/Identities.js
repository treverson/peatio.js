
module.exports = function(sequelize, DataTypes){
	return sequelize.define("identities", {
		email: {type: DataTypes.STRING},
		passwordDigest: {type: DataTypes.STRING, field: "password_digest"},
		isActive: {type: DataTypes.STRING, field: "is_active"},
		retryCount: {type: DataTypes.INTEGER, field: "retry_count"},
		isLocked: {type: DataTypes.BOOLEAN, field: "is_locked"},
		lockedAt: {type: DataTypes.DATE, field: "locked_at"},
		lastVerifyAt: {type: DataTypes.DATE, field: "last_verify_at"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		birthDate: {type: DataTypes.DATE, field: "birth_date"},
		address: {type: DataTypes.TEXT},
		city: {type: DataTypes.STRING},
		country: {type: DataTypes.STRING},
		zipcode: {type: DataTypes.STRING},
		idBillType: {type: DataTypes.INTEGER, field: "id_bill_type"},
		aasmState: {type: DataTypes.STRING, field: "aasm_state"}
	}, {
		freezeTableName: true
	});
};