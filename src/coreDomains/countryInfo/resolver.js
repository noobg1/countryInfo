const country = require('./service');
const exchangeRate = require('./service');

const resolvers = {
  Query: {
    country: async (_, { name }) => {
      const result = await country.getCountryByName(name);
      return result;
    },
  },
  Country: {
    exchangeRate: async (country, _) => {
      const currenciesCode = country?.currencies?.map(({ code }) => code);
      const result = await exchangeRate.getExChangeRateBySEK(currenciesCode);
      return result;
    },
  }
};

module.exports = { resolvers };
