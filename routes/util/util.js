const crypto = require('crypto');
const base32 = require('base32');

Date.locale = () => {
	return new Date(Date.now() + 8 * 60 * 60 * 1000);
}

module.exports = {
	randomBase: (len) => {
		return base32.encode(Math.random() + '').slice(0, len).toUpperCase();
	},
	digest: (str) => {
		let md5 = crypto.createHash('md5');
		return md5.update(str).digest('hex').toUpperCase();
	},
	randomHex: (len) => {
		len == !len ? 16 : len;
		let random = crypto.randomBytes(Math.floor(len / 2)).toString('hex');
		return random.slice(0, len);
	}
}