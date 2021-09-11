const jwt = require('jsonwebtoken');

const EXPIRY_TOKEN = '15s';
const TOKEN_TYPE = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token'
};

const verifyToken = async (token) => {
  return await jwt.verify(token);
};

const getAccessToken = async (refreshToken) => {
  const result = (await verifyToken(refreshToken))?.data?.type;
  if (result === TOKEN_TYPE.REFRESH_TOKEN) {
    // prepare jwt signing options
    const options = {
      header: {
        typ: 'JWT',
        alg: 'none'
      },
      expiresIn: EXPIRY_TOKEN
    };
    const rolesToAssign = ['READ'];
    const payload = {
      data: {
        roles: rolesToAssign,
        type: TOKEN_TYPE.ACCESS_TOKEN
      }
    };

    // sign and generate token
    const token = jwt.sign(payload, process.env.TOKEN_SHARED_SECRET, options);
    return token;
  }

  throw new Error('INVALID_CREDS');

};

module.exports = {
  verifyToken,
  getAccessToken
};
