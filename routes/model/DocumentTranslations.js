
module.exports = function(sequelize, DataTypes){
	return sequelize.define("document_translations", {
		documentId: {type: DataTypes.INTEGER, field: "document_id", allowNull: false},
		locale: {type: DataTypes.STRING, allowNull: false},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		title: {type: DataTypes.STRING},
		body: {type: DataTypes.TEXT},
		desc: {type: DataTypes.TEXT},
		keywords: {type: DataTypes.TEXT}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["document_id"], name: "index_document_translations_on_document_id", method: "BTREE" },
			{fields: ["locale"], name: "index_document_translations_on_locale", method: "BTREE" }
		]
	});
};