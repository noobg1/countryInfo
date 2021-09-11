const country = require('../country/service');
const exchangeRate = require('../exchangeRate/service');

const getCountryByName = async (name) => {
  const result = await country.getCountryByName(name);
  return result;
};

const getExChangeRateBySEK = async (currencyCodes) => {
  const result = await exchangeRate.getExChangeRateByCountry(currencyCodes);
  return result;
};

module.exports = { getExChangeRateBySEK, getCountryByName };
