
module.exports = function(sequelize, DataTypes){
	return sequelize.define("orders", {
		bid: {type: DataTypes.INTEGER},
		ask: {type: DataTypes.INTEGER},
		currency: {type: DataTypes.INTEGER},
		price: {type: DataTypes.DECIMAL(32, 16)},
		volume: {type: DataTypes.DECIMAL(32, 16)},
		originVolume: {type: DataTypes.DECIMAL(32, 16), field: "origin_volume"},
		state: {type: DataTypes.INTEGER},
		doneAt: {type: DataTypes.DATE, field: "done_at"},
		type: {type: DataTypes.STRING(8)},
		memberId: {type: DataTypes.INTEGER, field: "member_id"},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		redirectUri: {type: DataTypes.TEXT, field: "redirect_uri"},
		sn: {type: DataTypes.STRING},
		source: {type: DataTypes.STRING},
		ordType: {type: DataTypes.STRING, field: "ord_type"},
		locked: {type: DataTypes.DECIMAL(32, 16)},
		originLocked: {type: DataTypes.DECIMAL(32, 16), field: "origin_locked"},
		fundsReceived: {type: DataTypes.DECIMAL(32, 16), field: "funds_received"},
		tradesCount: {type: DataTypes.INTEGER, field: "trades_count"}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["currency", "state"], name: "index_orders_on_currency_and_state", method: "BTREE" },
			{fields: ["member_id", "state"], name: "index_orders_on_member_id_and_state", method: "BTREE" },
			{fields: ["member_id"], name: "index_orders_on_member_id", method: "BTREE" },
			{fields: ["state"], name: "index_orders_on_state", method: "BTREE" }
		]
	});
};