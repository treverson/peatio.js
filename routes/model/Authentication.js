const Util = require('../util/util');
const TABLE = require('../domain/table.define');
const Members = TABLE.Members;
const Authentications = TABLE.Authentications;
Authentications.belongsTo(Members);

module.exports = Authentications;