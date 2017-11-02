const crypto = require('crypto');
const base32 = require('base32');
module.exports = {
	randomBase: (len) => {
		return base32.encode(Math.random() + '').slice(0, len).toUpperCase();
	},
	digest: (str) => {
		let md5 = crypto.createHash('md5');
		return md5.update(str).digest('hex').toUpperCase();
	}
}