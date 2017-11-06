const Util = require('../util/util');
const TABLE = require('../domain/table.define');
const Members = TABLE.Members;
const Authentications = require('./Authentication');
const ReadMarks = require('./ReadMark');
const IdDocument = require('./IdDocument');

Members.hasMany(Authentications);
Members.hasMany(ReadMarks);
Members.hasOne(IdDocument);

Members.generateSn = () => {
	let sn = 'PEA' + Util.randomBase(8) + 'TIO';
	Members.count({where: {sn: sn}}).then((count) => {
		if(count > 1) {
			return Members.generateSn();
		}
	});
	return 'PEA' + sn + 'TIO';
}

Members.beforeCreate = (member, options) => {
	if(!member.sn) {
		member.sn = Members.generateSn();
	}
}

module.exports = Members;