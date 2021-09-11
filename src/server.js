const { ApolloServer } = require('apollo-server-fastify');
const server = require('fastify')({
  logger: true
});
const swagger = require('fastify-swagger');
const typeDefs = require('./coreDomains/countryInfo/typeDefs');
const { resolvers } = require('./coreDomains/countryInfo/resolver');
const errorHandler = require('./errorHandler');
const { onPreRequest } = require('../src/middlewares/onPrerequest');
const { config } = require('./config');

const enableDocs = process.env.NODE_ENV === 'prod' ? false : true;

// Swagger register
const swaggerOptions = {
  exposeRoute: enableDocs
};
server.register(swagger, swaggerOptions);

server.addHook('onRequest', onPreRequest);

server.get('/ping', (_request, reply) => {
  reply.send({ data: 'pong' });
});

// register routes
[...require('../src/coreDomains/idm/controller')].forEach(server.route.bind(server));

async function startApolloServer(typeDefs, resolvers) {
  const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: enableDocs,
    playground: enableDocs,
    formatError: errorHandler.graphqlResponseErrorHandler
  });
  await graphqlServer.start();
  server.register(graphqlServer.createHandler());
  try {
    await server.listen(config.get('port'));
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

const emptyQuery = `
  type Query {
    _empty: String
  }
`;


startApolloServer([emptyQuery, typeDefs], resolvers);

module.exports = server;
