const repository = require('./repository');

const getCountryByName = async (name) => {
  return repository.getCountryByName(name);
};

module.exports = {
  getCountryByName
};
