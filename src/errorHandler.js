const graphqlResponseErrorHandler = (error) => {
  // Delete the stacktrace object for security reasons
  delete error?.extensions?.exception?.stacktrace;
  return error;
};

module.exports = { graphqlResponseErrorHandler };
