const { expect } = require('chai');
const service = require('../service');
const sinon = require('sinon');
const exchangeRateService = require('../../exchangeRate/service');

describe('service.getExChangeRateByCountry', () => {
  it('should return exchange rates', async () => {
    // GIVEN
    const mockData = [
      {
        "code": "INR",
        "rate": 8.515223399314499
      }
    ];
    const repoMock = sinon.stub(exchangeRateService, 'getExChangeRateByCountry').resolves(mockData);

    // WHEN
    const result = await service.getExChangeRateBySEK(['INR']);

    // THEN
    expect(result).deep.equal([
      {
        "code": "INR",
        "rate": 8.515223399314499
      }
    ]);
    repoMock.restore();
  });

  it('should return NAN for those countries which does not exist', async () => {
    // GIVEN
    const mockData = [
      {
        "code": "XXX",
        "rate": NaN
      }
    ];
    const repoMock = sinon.stub(exchangeRateService, 'getExChangeRateByCountry').resolves(mockData);

    // WHEN
    const result = await service.getExChangeRateBySEK(['XXX']);

    // THEN
    expect(result).deep.equal([
      {
        "code": "XXX",
        "rate": NaN
      }
    ]);
    repoMock.restore();
  });

  it('should throw and propagate error when repo throws error', async () => {
    // GIVEN
    const repoMock = sinon.stub(exchangeRateService, 'getExChangeRateByCountry').throws(new Error('something went wrong'));

    // WHEN
    let expected;
    try {
      await service.getExChangeRateBySEK(['XXX']);
    } catch (error) {
      expected = error;
    }

    // THEN
    expect(expected.message).equal('something went wrong');
    repoMock.restore();
  });
});
