const base32 = require('base32');
module.exports = {
	randomBase:(len) => {
		return base32.encode(Math.random() + '').slice(0, len).toUpperCase();
	}
}