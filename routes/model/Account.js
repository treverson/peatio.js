const Util = require('../util/util');
const TABLE = require('../domain/table.define');
const Members = TABLE.Members;
const Accounts = TABLE.Accounts;

Accounts.belongsTo(Members);

module.exports = Accounts;