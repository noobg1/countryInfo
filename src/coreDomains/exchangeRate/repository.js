const httpRequest = require('../../httpRequest');
const { config } = require('../../config');

const { exchangeRate: { baseUrl } } = config.get('external');

const getDefaultExchangeRate = async () => {
  const accessKey = process.env.EXCHANGE_RATE_ACCESS_KEY;
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
