
module.exports = function(sequelize, DataTypes){
	return sequelize.define("two_factors", {
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		otpSecret: {type: DataTypes.DATE, field: "otp_secret"},
		lastVerifyAt: {type: DataTypes.DATE, field: "last_verify_at"},
		activated: {type: DataTypes.BOOLEAN},
		type: {type: DataTypes.STRING},
		refreshedAt: {type: DataTypes.DATE, field: "refreshed_at"}
	}, {
		freezeTableName: true
	});
};