const { expect, assert } = require('chai');
const repository = require('../repository');
const sinon = require('sinon');
const httpRequest = require('../../../httpRequest');

describe('repository.getDefaultExchangeRate', () => {
  it('should return data from external service', async () => {
    // GIVEN
    const mockData = {
      success: true,
      timestamp: 1631341743,
      base: 'EUR',
      date: '2021-09-11',
      rates: {
        MYR: 4.887155,
        MZN: 75.348295,
        SEK: 10.20159,
        INR: 86.868886
      }
    };
    const requestMock = sinon.stub(httpRequest, 'request').resolves(mockData);

    // WHEN
    const result = await repository.getDefaultExchangeRate();

    // THEN
    assert.hasAnyKeys(result, ['SEK', 'INR']);
    requestMock.restore();
  });

  it('should propagate error while fetching the data from external service', async () => {
    // GIVEN
    const mockData = {
      success: false,
      error: {
        code: 302,
        type: 'invalid_date',
        info: 'You have entered an invalid date. [Required format: date=YYYY-MM-DD]'
      }
    };
    const requestMock = sinon.stub(httpRequest, 'request').rejects(mockData);

    // WHEN
    let expected;
    try {
      await repository.getDefaultExchangeRate();
    } catch (error) {
      expected = error;
    }

    // THEN
    expect(expected).equal(mockData);
    requestMock.restore();
  });

});
