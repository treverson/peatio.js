
module.exports = function(sequelize, DataTypes){
	return sequelize.define("id_documents", {
		idDocumentType: {type: DataTypes.INTEGER, field: "id_document_type"},
		name: {type: DataTypes.STRING},
		IdDocumentNumber: {type: DataTypes.STRING, field: "id_document_number"},
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
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