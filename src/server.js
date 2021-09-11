const { ApolloServer } = require('apollo-server-fastify');
const server = require('fastify')({
  logger: true
});
const swagger = require('fastify-swagger');
const typeDefs = require('./coreDomains/countryInfo/typeDefs');
const { resolvers } = require('./coreDomains/countryInfo/resolver');
const errorHandler = require('./errorHandler');
const enableDocs = process.env.NODE_ENV === 'prod' ? false : true;

// Swagger register
const swaggerOptions = {
  exposeRoute: enableDocs
};
server.register(swagger, swaggerOptions);

server.get('/ping', (_request, reply) => {
  reply.send({ data: 'pong' });
});

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
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

const Query = `
  type Query {
    _empty: String
  }
`;


startApolloServer([Query, typeDefs], resolvers);
