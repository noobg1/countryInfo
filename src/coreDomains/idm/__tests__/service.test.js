const { expect } = require('chai');
const service = require('../service');

describe('server.verifyToken', () => {
  it('should verify the token validity', async () => {
    // GIVEN 
    // valid for one month
    const token = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.';

    // WHEN
    const result = await service.verifyToken(token);

    // THEN
    expect(result).deep.equal({
      data: { roles: ['ADMIN'], type: 'refresh_token' },
      iat: 1631369802,
      exp: 1633961802
    });
  });

  it('should verify the token validity', async () => {
    // GIVEN 
    const expiredToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIlJFQUQiXSwidHlwZSI6ImFjY2Vzc190b2tlbiJ9LCJpYXQiOjE2MzEzNzIzNjQsImV4cCI6MTYzMTM3MjM2OX0.';

    // WHEN
    let expected;
    try {
      await service.verifyToken(expiredToken);
    } catch (error) {
      expected = error;
    }

    // THEN
    expect(expected.toString()).equal('TokenExpiredError: jwt expired');
  });
});

describe('server.getAccessToken', () => {
  it('should verify the token validity', async () => {
    // GIVEN 
    // valid for one month
    const expiredToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.';

    // WHEN
    const result = await service.getAccessToken(expiredToken);

    // THEN
    expect(result).not.null;
  });

  it('should throw error if token is is not valid', async () => {
    // GIVEN 
    const token = 'qweweqeq';

    // WHEN
    let expected;
    try {
      await service.getAccessToken(token);
    } catch (error) {
      expected = error;
    }

    // THEN
    expect(expected.toString()).equal('JsonWebTokenError: jwt malformed');
  });

  it('should throw error if invalid cert', async () => {
    // GIVEN 
    const expiredToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIlJFQUQiXSwidHlwZSI6ImFjY2Vzc190b2tlbiJ9LCJpYXQiOjE2MzEzNzUwOTcsImV4cCI6MjE3MTM3NTA5N30.';

    // WHEN
    let expected;
    try {
      await service.getAccessToken(expiredToken);
    } catch (error) {
      expected = error;
    }

    // THEN
    expect(expected.toString()).equal('Error: INVALID_CREDS');
  });
});
