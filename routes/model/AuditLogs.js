
module.exports = function(sequelize, DataTypes){
	return sequelize.define("audit_logs", {
		type: {type: DataTypes.STRING},
		operatorId: {type: DataTypes.STRING, field: "operator_id"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		auditableId: {type: DataTypes.INTEGER, field: "auditable_id"},
		auditable_type: {type: DataTypes.STRING, field: "auditable_type"},
		sourceState: {type: DataTypes.STRING, field: "source_state"},
		targetState: {type: DataTypes.STRING, field: "target_state"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["auditable_id", "auditable_type"], name: "index_audit_logs_on_auditable_id_and_auditable_type", method: "BTREE" },
			{fields: ["operator_id"], name: "index_audit_logs_on_operator_id", method: "BTREE" }
		]
	});
};