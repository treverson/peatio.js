const Util = require('../util/util.js');
module.exports = function(sequelize, DataTypes){
	return sequelize.define("members", {
		sn: {type: DataTypes.STRING},
		displayName: {type: DataTypes.STRING, field: "display_name"},
		email: {type: DataTypes.STRING},
		identityId: {type: DataTypes.INTEGER, field: "identity_id"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		state: {type: DataTypes.INTEGER},
		activated: {type: DataTypes.BOOLEAN},
		countryCode: {type: DataTypes.INTEGER, field: "country_code"},
		phoneNumber: {type: DataTypes.STRING, field: "phone_number"},
		disabled: {type: DataTypes.BOOLEAN, defaultValue: false},
		apiDisabled: {type: DataTypes.BOOLEAN, field: "api_disabled", defaultValue: false},
		nickname: {type: DataTypes.STRING, field: "nickname"}
	}, {
		freezeTableName: true,
		underscored: true,
		// createdAt: 'created_at',
		// updatedAt: 'updated_at',
		hooks: {
			beforeCreate: (member, options) => {
				member.sn = 'PEA' + Util.randomBase(8) + 'TIO';
			}
		}
	});
};