
module.exports = function(sequelize, DataTypes){
	return sequelize.define("signup_histories", {
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		ip: {type: DataTypes.STRING},
		acceptLanguage: {type: DataTypes.STRING, field: "accept_language"},
		ua: {type: DataTypes.STRING},
		createdAt: {type: DataTypes.DATE, field: "created_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["member_id"], name: "index_signup_histories_on_member_id", method: "BTREE" }
		]
	});
};