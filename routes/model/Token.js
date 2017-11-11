const Util = require('../util/util');
const TABLE = require('../domain/table.define');
const Members = TABLE.Members;
const Tokens = TABLE.Tokens;

Tokens.belongsTo(Members);

Tokens.beforeCreate = (token, options) => {
	if(!token.token) {
		token.token = Util.randomHex();
	}
}

module.exports = Tokens;