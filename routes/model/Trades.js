
module.exports = function(sequelize, DataTypes){
	return sequelize.define("trades", {
		price: {type: DataTypes.DECIMAL(32, 16)},
		volume: {type: DataTypes.DECIMAL(32, 16)},
		askId: {type: DataTypes.INTEGER, field: "ask_id"},
		bidId: {type: DataTypes.INTEGER, field: "bid_id"},
		trend: {type: DataTypes.INTEGER},
		currency: {type: DataTypes.INTEGER},
		createdAt: {type: DataTypes.DATE, field: "created_at"},
		updatedAt: {type: DataTypes.DATE, field: "updated_at"},
		askMemberId: {type: DataTypes.INTEGER, field: "ask_member_id"},
		bidMemberId: {type: DataTypes.INTEGER, field: "bid_member_id"},
		isUsed: {type: DataTypes.BOOLEAN, field: "is_used"},
		funds: {type: DataTypes.DECIMAL(32, 16)}
	}, {
		freezeTableName: true,
		indexes: [
			{fields: ["ask_id"], name: "index_trades_on_ask_id", method: "BTREE" },
			{fields: ["ask_member_id"], name: "index_trades_on_ask_member_id", method: "BTREE" },
			{fields: ["bid_id"], name: "index_trades_on_bid_id", method: "BTREE" },
			{fields: ["bid_member_id"], name: "index_trades_on_bid_member_id", method: "BTREE" },
			{fields: ["created_at"], name: "index_trades_on_created_at", method: "BTREE" },
			{fields: ["currency"], name: "index_trades_on_currency", method: "BTREE" }
		]
	});
};