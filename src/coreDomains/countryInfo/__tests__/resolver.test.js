const { expect } = require('chai');
let buildServer = require('../../../server');
const sinon = require('sinon');
const exchangeRateService = require('../service');

after(() => {
  buildServer.close();
});
describe('resolver', () => {
  describe('/graphql ', () => {
    it('should return requested data on right payload data', async () => {
      // GIVEN
      const input = {
        method: 'POST', url: '/graphql',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.'
        },
        body: { "query": "query test($countryName: String!) {\n  country(name: $countryName) {\n    name\n    exchangeRate {\n      code\n      rate\n    }\n    currencies {\n      code\n    }\n  }\n}", "variables": { "countryName": "bhutan" } }
      };
      const mockDataCountry = [{
        name: 'Central African Republic',
        altSpellings: ['CF', 'Central African Republic', 'République centrafricaine'],
        region: 'Africa',
        subregion: 'Middle Africa',
        population: 4998000,
        nativeName: 'Ködörösêse tî Bêafrîka',
        numericCode: '140',
        currencies: [
          { code: 'BTN', name: 'Bhutanese ngultrum', symbol: 'Nu.' },
        ],
      }];

      const mockDataChangeRate = [{ code: 'BTN', rate: 8.515223399314499 }];
      const mockGetCountryByName = sinon.stub(exchangeRateService, 'getCountryByName').resolves(mockDataCountry);
      const mockGetExChangeRateBySEK = sinon.stub(exchangeRateService, 'getExChangeRateBySEK').resolves(mockDataChangeRate);

      let response;

      // WHEN
      try {
        response = await buildServer.inject(input);
      } finally {
        // THEN
        expect(response.statusCode).equal(200);
        expect(JSON.parse(JSON.stringify(response.payload))).to.contain(JSON.stringify({ "data": { "country": [{ "name": "Central African Republic", "exchangeRate": [{ "code": "BTN", "rate": 8.515223399314499 }], "currencies": [{ "code": "BTN" }] }] } }));
        mockGetCountryByName.restore();
        mockGetExChangeRateBySEK.restore();
      }

    });

    it('should throw error if input validation fails', async () => {
      // GIVEN
      const input = {
        method: 'POST', url: '/graphql',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.'
        },
        body: { "query": "query test($countryName: String!) {\n  country(name: $countryName) {\n    name\n    exchangeRate {\n      code\n      rate\n    }\n    currencies {\n      code\n    }\n  }\n}", "variables": { "countryName": 123244 } }
      };
      const mockDataCountry = [{
        name: 'Central African Republic',
        altSpellings: ['CF', 'Central African Republic', 'République centrafricaine'],
        region: 'Africa',
        subregion: 'Middle Africa',
        population: 4998000,
        nativeName: 'Ködörösêse tî Bêafrîka',
        numericCode: '140',
        currencies: [
          { code: 'BTN', name: 'Bhutanese ngultrum', symbol: 'Nu.' },
        ],
      }];

      const mockDataChangeRate = [{ code: 'BTN', rate: 8.515223399314499 }];
      const mockGetCountryByName = sinon.stub(exchangeRateService, 'getCountryByName').resolves(mockDataCountry);
      const mockGetExChangeRateBySEK = sinon.stub(exchangeRateService, 'getExChangeRateBySEK').resolves(mockDataChangeRate);

      let response;

      // WHEN
      try {
        response = await buildServer.inject(input);
      } finally {
        // THEN
        expect(response.statusCode).equal(400);
        expect(JSON.stringify(response.payload)).to.contain('got invalid value 123244');
        mockGetCountryByName.restore();
        mockGetExChangeRateBySEK.restore();
      }

    });


  });
});
