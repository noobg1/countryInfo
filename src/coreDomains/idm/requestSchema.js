const loginSchema = {
  attachValidation: true,
  body: {
    type: 'object',
    properties: {
      refreshToken: { type: 'string' }
    },
    required: ['refreshToken']
  },
  response: {
    201: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' }
      }
    }
  }
};

module.exports = {
  loginSchema
};
