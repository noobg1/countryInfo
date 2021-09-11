const { expect } = require('chai');
let buildServer = require('../../../server');
const sinon = require('sinon');
const loginService = require('../service');

after(() => {
  buildServer.close();
});
describe('login', () => {
  describe('/login ', () => {
    it('should return 200 on success', async () => {
      // GIVEN
      const input = {
        method: 'POST', url: '/login', body: {
          refreshToken: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.'
        }
      };
      let response;

      // WHEN
      try {
        response = await buildServer.inject(input);
      } finally {
        // THEN
        expect(response.statusCode).equal(200);
      }

    });

    it('should return 400 on missing payload', async () => {
      // GIVEN
      const input = {
        method: 'POST', url: '/login', body: {
        }
      };
      let response;

      // WHEN
      try {
        response = await buildServer.inject(input);
      } finally {

        // THEN
        expect(response.statusCode).equal(400);
        expect(response.body).to.contain('body should have required property \'refreshToken\'"');
      }
    });

    it('should return 500 on error', async () => {
      // GIVEN
      const input = {
        method: 'POST', url: '/login', body: {
          refreshToken: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.'
        }
      };
      let response;
      const loginServiceStub = sinon.stub(loginService, 'getAccessToken').rejects('something went wrong');

      // WHEN
      try {
        response = await buildServer.inject(input);
      } finally {

        // THEN
        expect(response.statusCode).equal(500);
        expect(response.body).to.contain('Internal Server Error');
        loginServiceStub.restore();
      }
    });

    it('should return 401 on refresh token is not valid', async () => {
      // GIVEN
      const input = {
        method: 'POST', url: '/login', body: {
          refreshToken: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.'
        }
      };
      let response;
      const loginServiceStub = sinon.stub(loginService, 'getAccessToken').rejects('JsonWebTokenError: invalid token');

      // WHEN
      try {
        response = await buildServer.inject(input);
      } finally {

        // THEN
        expect(response.statusCode).equal(401);
        expect(response.body).to.contain('JsonWebTokenError: invalid token');
        loginServiceStub.restore();
      }
    });
  });


});
