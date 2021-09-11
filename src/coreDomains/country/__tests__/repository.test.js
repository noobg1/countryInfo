const { expect } = require('chai');
const repository = require('../repository');
const sinon = require('sinon');
const httpRequest = require('../../../httpRequest');

describe('repository.getCountryByName', () => {
  it('should return data from external service', async () => {
    // GIVEN
    const mockData = [

      {
        name: 'Bhutan',
        altSpellings: ['BT', 'Kingdom of Bhutan'],
        region: 'Asia',
        subregion: 'Southern Asia',
        population: 775620,
        latlng: [27.5, 90.5],
        demonym: 'Bhutanese',
        area: 38394,
        gini: 38.1,
        timezones: ['UTC+06:00'],
        borders: ['CHN', 'IND'],
        nativeName: 'ʼbrug-yul',
        numericCode: '064',
        currencies: [
          { code: 'BTN', name: 'Bhutanese ngultrum', symbol: 'Nu.' },
          { code: 'INR', name: 'Indian rupee', symbol: '₹' }
        ]
      }
    ];
    const requestMock = sinon.stub(httpRequest, 'request').resolves(mockData);


    // WHEN
    const result = await repository.getCountryByName('bhutan');

    // THEN
    expect(result[0].name).equal('Bhutan');
    requestMock.restore();
  });
});
