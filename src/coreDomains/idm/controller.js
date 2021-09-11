const service = require('./service');
const { loginSchema } = require('./requestSchema');

const loginErrors = [
  'TokenExpiredError: jwt expired',
  'JsonWebTokenError: invalid token'
];

const login = {
  method: 'POST',
  url: '/login',
  schema: loginSchema,
  handler: async (request, reply) => {
    const refreshToken = request.body?.refreshToken;
    try {
      const accessToken = await service.getAccessToken(refreshToken);
      return reply.send({ accessToken });
    } catch (error) {
      // Handle known errors

      if (loginErrors.includes(error.toString())) {
        reply.code(401);
        return reply.send({ error: error.toString() });
      }

      // If unknown error, throw 500
      reply.code(500);
      return reply.send('Internal Server Error');
    }

  }
};

module.exports = [login];
