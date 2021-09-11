const authService = require('../coreDomains/idm/service');

const NO_AUTH_ENDPOINTS = {
  '/graphql': ['GET'],
  '/login': ['POST'],
  '/ping': ['GET']
};

// https://www.fastify.io/docs/latest/Hooks
const onPreRequest = async (request, reply) => {
  // Allow no-auth endpoints without token verification
  if (
    (NO_AUTH_ENDPOINTS[request.url] &&
      NO_AUTH_ENDPOINTS[request.url].includes(request.method)) ||
    request.url.startsWith('/documentation')
  ) return;

  const authHeader = request.headers?.authorization;
  const token = authHeader?.split(' ')[1];

  try {
    await authService.verifyToken(token);
    return;
  } catch (error) {
    reply.code(401);
    return reply.send({ error: error.toString() });
  }
};

module.exports = {
  onPreRequest
};
