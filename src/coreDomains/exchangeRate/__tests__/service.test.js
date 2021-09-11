const { expect } = require('chai');
const service = require('../service');
const sinon = require('sinon');
const repository = require('../repository');

describe('service.getExChangeRateByCountry', () => {
  it('should return exchange rates', async () => {
    // GIVEN
    const mockData = {
      MYR: 4.887155,
      MZN: 75.348295,
      SEK: 10.20159,
      INR: 86.868886
    };
    const repoMock = sinon.stub(repository, 'getDefaultExchangeRate').resolves(mockData);

    // WHEN
    const result = await service.getExChangeRateByCountry(['INR']);

    // THEN
    expect(result).deep.equal([
      {
        "code": "INR",
        "rate": 8.515230076880174
      }
    ]);
    repoMock.restore();
  });

  it('should return NAN for those countries which does not exist', async () => {
    // GIVEN
    const mockData = {
      MYR: 4.887155,
      MZN: 75.348295,
      SEK: 10.20159,
      INR: 86.868886
    };
    const repoMock = sinon.stub(repository, 'getDefaultExchangeRate').resolves(mockData);

    // WHEN
    const result = await service.getExChangeRateByCountry(['XXX']);

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
    const repoMock = sinon.stub(repository, 'getDefaultExchangeRate').throws(new Error('something went wrong'));

    // WHEN
    let expected;
    try {
      await service.getExChangeRateByCountry(['XXX']);
    } catch (error) {
      expected = error;
    }

    // THEN
    expect(expected.message).equal('something went wrong');
    repoMock.restore();
  });
});
