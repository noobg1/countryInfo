const repository = require('./repository');

const getDefaultExchangeRate = async () => {
  return await repository.getDefaultExchangeRate();
};

const getExChangeRateByCountry = async (baseCurrency = 'SEK', countriesId = []) => {
  const defaultExchangeRate = await getDefaultExchangeRate();

  const exchangeRateByBaseCurrency = countriesId.map((currency) => {
    const rate = defaultExchangeRate[currency] / defaultExchangeRate[baseCurrency];
    return { code: currency, rate };
  });

  return exchangeRateByBaseCurrency;
};

module.exports = {
  getExChangeRateByCountry,
};
