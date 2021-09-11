const { expect } = require('chai');
const onPreRequest = require('../onPreRequest');

describe('onPreRequest.js', () => {
  describe('onPreRequest', () => {
    it('should throw 401 if auth header is missing', async () => {
      // GIVEN
      const request = {
        headers: {},
        url: '/test'
      };
      const reply = {
        code: () => { },
        send: () => { return { error: new Error('missing auth header') }; }
      };

      // WHEN
      const result = await onPreRequest.onPreRequest(request, reply);

      // THEN
      expect(result.error.toString()).equal('Error: missing auth header');
    });

    it('should throw error if auth header is fine', async () => {
      // GIVEN
      const request = {
        headers: {
          authorization: 'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJyZWZyZXNoX3Rva2VuIn0sImlhdCI6MTYzMTM2OTgwMiwiZXhwIjoxNjMzOTYxODAyfQ.'
        },
        url: '/test'
      };
      const reply = {
        code: () => { },
        send: () => { }
      };

      // WHEN
      const result = await onPreRequest.onPreRequest(request, reply);

      // THEN
      expect(result).be.undefined;
    });


    it('should throw error and bypass request if path is in list of allowed path', async () => {
      // GIVEN
      const request = {
        headers: {},
        url: '/ping'
      };
      const reply = {
        code: () => { },
        send: () => { }
      };

      // WHEN
      const result = await onPreRequest.onPreRequest(request, reply);

      // THEN
      expect(result).be.undefined;
    });
  });
});
