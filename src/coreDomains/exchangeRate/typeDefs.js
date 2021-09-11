const Country = `
  extend type Query {
    country(name: String!): Country
  }  

  type Country {
    name: String
    currency: [Currency]
  }
`;

const Currency = `
  type Currency {
    name: String
  }
`;

module.exports = [
  Country,
  Currency
];
