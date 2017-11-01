
module.exports = function(sequelize, DataTypes){
	return sequelize.define("taggings", {
		tagId: {type: DataTypes.INTEGER, field: "tag_id"},
		taggableId: {type: DataTypes.INTEGER, field: "taggable_id"},
		taggableType: {type: DataTypes.STRING, field: "taggable_type"},
		taggerId: {type: DataTypes.INTEGER, field: "tagger_id"},
		taggerType: {type: DataTypes.STRING, field: "tagger_type"},
		context: {type: DataTypes.STRING(128)},
		createdAt: {type: DataTypes.DATE, field: "created_at"}
	}, {
		freezeTableName: true,
		indexes: [ {fields: ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, method: "BTREE" }
		]
	});
};