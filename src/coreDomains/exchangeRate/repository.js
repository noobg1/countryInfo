const httpRequest = require('../../httpRequest');
const { config } = require('../../config');

const { exchangeRate: { baseUrl } } = config.get('external');
const EXCHANGE_RATE_ACCESS_KEY = process.env.EXCHANGE_RATE_ACCESS_KEY;

if (!EXCHANGE_RATE_ACCESS_KEY) throw new Error(`Please set env var EXCHANGE_RATE_ACCESS_KEY`);

const getDefaultExchangeRate = async () => {
  const accessKey = EXCHANGE_RATE_ACCESS_KEY;
  const options = {
    method: 'GET',
    url: `${baseUrl}?access_key=${accessKey}`
  };
  const result = await httpRequest.request(options);
  return result?.rates;
};

module.exports = {
  getDefaultExchangeRate
};
