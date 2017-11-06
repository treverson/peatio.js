const Util = require('../util/util');
const TABLE = require('../domain/table.define');
const Members = TABLE.Members;
const IdDocuments = TABLE.IdDocuments;

IdDocuments.belongsTo(Members);

module.exports = IdDocuments;