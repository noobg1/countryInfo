# Country Info Service

## Usage 

```
# requires node 14
npm ci
export TOKEN_SHARED_SECRET=<VALUE> # used for signing token
export EXCHANGE_RATE_ACCESS_KEY=<VALUE> # used for currency conversion
npm run start 
# npm run start:dev # for dev mode enabling gql, swagger docs 
```

### Tests

```
npm run test
```

### Docs
```
127.0.0.1:3000/documentation
```

### Folder Structure
```
.
├── README.md
├── configs
│   ├── default.json
│   └── dev.json
├── package-lock.json
├── package.json
└── src
    ├── config.js
    ├── coreDomains
    │   ├── country
    │   │   ├── __tests__
    │   │   │   └── repository.test.js
    │   │   ├── repository.js
    │   │   └── service.js
    │   ├── countryInfo
    │   │   ├── __tests__
    │   │   │   ├── resolver.test.js
    │   │   │   └── service.test.js
    │   │   ├── resolver.js
    │   │   ├── service.js
    │   │   └── typeDefs.js
    │   ├── exchangeRate
    │   │   ├── __tests__
    │   │   │   ├── repository.test.js
    │   │   │   └── service.test.js
    │   │   ├── repository.js
    │   │   └── service.js
    │   └── idm
    │       ├── __tests__
    │       │   ├── controller.test.js
    │       │   └── service.test.js
    │       ├── controller.js
    │       ├── requestSchema.js
    │       └── service.js
    ├── errorHandler.js
    ├── httpRequest.js
    ├── middlewares
    │   ├── __tests__
    │   │   └── onPrerequest.test.js
    │   └── onPrerequest.js
    └── server.js
```

### Design/ Approach

- DDD (Domain Driven Design) 
 Each domain has it's own controller/ resolver, service, repository, request/ response validator, models
- Traffic flows from : `controller/resolver` -> `service` -> `repository` -> `external Data sources`
- One domain can call other domain only from `service` interface
- `fastify` heeding to serve REST, gql paths with aid from `apollo-graphql-server` (TODO: understand the tradeoffs with other options)
- For `/login` endpoint assuming signup and previous login is done and considering part of Oauth2 flow, we will use refresh token to fetch the access token instead of username/password, sso, saml etc to keep things simple
- Rate-limiting using in mem store `fastiry-rate-limiter`
- Access token signing using secret to keep things simple
  
  
### Todos in mind/ Things would have loved to do add based on time

- [x] Global graphql error handler
- [x] Authenticating with JWT token - Deny all resolvers
- [ ] Selective resolver, routes Authorization with scopes, roles
- [ ] Persistence storage for rate limiting to enable distributed rate limits
- [ ] Extending access token implementation to use asymmetric keys to sign and verify
- [x] 12 factor app criterias met
- [ ] Add type definitions
- [ ] Dynamic resolver import and register
- [x] linter

### Rate limiting test

```
# Replace access token, valid for 15 min
 while  true; do date; curl --location --request POST 'http://127.0.0.1:3000/graphql' \
--header 'content-type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjp7InJvbGVzIjpbIlJFQUQiXSwidHlwZSI6ImFjY2Vzc190b2tlbiJ9LCJpYXQiOjE2MzEzOTA3OTAsImV4cCI6MTYzMTM5MTY5MH0.' \
--data-raw '{"query":"query test($countryName: String!) {\n  country(name: $countryName) {\n    name\n    exchangeRate {\n      code\n      rate\n    }\n    currencies {\n      code\n    }\n  }\n}","variables":{"countryName":"africa"}}'; echo \n; done;

```
