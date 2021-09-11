const config = require('nconf');
const { merge } = require('lodash');

config.argv().env(); // Load and env vars
const env = config.get('NODE_ENV') || 'default';
const defaultConfig = require('../configs/default.json');

try {
  const envConfig = require(`../configs/${env}.json`);
  // load ENV specific config file, this is for deep clone and executed once only on server start
  config.overrides(merge(defaultConfig, envConfig));
}
catch (error) {
  throw new Error(error);
}
finally {
  // load default values
  config.defaults(defaultConfig);
}

module.exports = { config };
