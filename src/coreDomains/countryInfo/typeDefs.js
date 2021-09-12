const Country = `
  extend type Query {
    country(name: String!): [Country]
  }  

  type Country {
    name: String
    exchangeRate: [ExchangeRate]
    currencies: [Currencies]
    population: String
  }

  type Currencies {
    code: String
    name: String
    symbol: String
  }
`;

const ExchangeRate = `
  type ExchangeRate {
    code: String
    rate: Float
  }
`;

module.exports = [
  Country,
  ExchangeRate
];
