const YAML = require('yamljs');

const configs = YAML.load('config/application.yml');
const database = YAML.load('config/database.yml');

module.exports = {
	config: configs.test,
	database: database.test
};