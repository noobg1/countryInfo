const httpRequest = require('../../httpRequest');
const { config } = require('../../config');

const { countries: { baseUrl } } = config.get('external');

const getCountryByName = async (name) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}/name/${name}`
  };
  const result = await httpRequest.request(options);
  return result;
};

module.exports = {
  getCountryByName
};
