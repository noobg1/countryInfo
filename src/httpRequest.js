const axios = require('axios').default;

const request = async ({
  method,
  url,
  payload = {},
  headers = null
}) => {

  const result = await axios({
    method,
    url,
    headers,
    data: payload
  });
  return result.data;
};

module.exports = {
  request
};
