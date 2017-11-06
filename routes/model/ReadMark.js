const Util = require('../util/util');
const TABLE = require('../domain/table.define');
const Members = TABLE.Members;
const ReadMarks = TABLE.ReadMarks;

ReadMarks.belongsTo(Members);

module.exports = ReadMarks;