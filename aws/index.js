const axios = require('axios');

const fetchRefresh = async (code, token, grant) => {
  const refresh = await axios.post(
    'https://www.strava.com/oauth/token',
    {},
    {
      params: {
        code: code,
        refresh_token: token,
        client_id: process.env.ID,
        client_secret: process.env.SECRET,
        grant_type: grant,
      },
    },
  );
  return refresh.data;
};

const setResponse = (code, body) => {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
};

exports.handler = async event => {
  const body = JSON.parse(event.body);
  try {
    const data = await fetchRefresh(body.code, body.token, body.grant);
    const response = setResponse(200, data);
    return response;
  } catch (error) {
    console.error(error);
    const response = setResponse(401, { message: 'error' });
    return response;
  }
};
