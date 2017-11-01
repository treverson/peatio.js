
module.exports = function(sequelize, DataTypes){
	return sequelize.define("read_marks", {
		readableId: {type: DataTypes.INTEGER, field: "readable_id"},
		memberId: {type: DataTypes.INTEGER, field: "member_id", allowNull: false},
		readableType: {type: DataTypes.STRING(20), field: "readable_type", allowNull: false},
		timestamp: {type: DataTypes.DATE
		}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["member_id"], name: "index_read_marks_on_member_id", method: "BTREE" },
			{fields: ["readable_type", "readable_id"], name: "index_read_marks_on_readable_type_and_readable_id", method: "BTREE" }
		]
	});
};