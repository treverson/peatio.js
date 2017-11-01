
module.exports = function(sequelize, DataTypes){
	return sequelize.define("running_accounts", {
		category: {type: DataTypes.INTEGER},
		income: {type: DataTypes.DECIMAL(32, 16), defaultValue: 0.0, allowNull: false},
		expenses: {type: DataTypes.DECIMAL(32, 16), defaultValue: 0.0, allowNull: false},
		currency: {type: DataTypes.INTEGER},
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		sourceId: {type: DataTypes.INTEGER, field: "source_id"},
		sourceType: {type: DataTypes.STRING, field: "source_type"},
		note: {type: DataTypes.STRING},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["member_id"], name: "index_running_accounts_on_member_id", method: "BTREE" },
			{fields: ["source_id", "source_type"], name: "index_running_accounts_on_source_id_and_source_type", method: "BTREE" }
		]
	});
};