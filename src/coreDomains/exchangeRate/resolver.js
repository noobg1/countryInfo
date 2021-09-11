const resolvers = {
  Query: {
    country: (_, { name }) => {
      return { name };
    },
  },
  Country: {
    currency: (country, _) => {
      return [{ name: country?.name }];
    },
  }
};

module.exports = { resolvers };
