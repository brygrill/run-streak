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
      }
    },
  );
  return refresh.data;
};

exports.handler = async event => {
  const body = JSON.parse(event.body);
  try {
    const data = await fetchRefresh(body.code, body.token, body.grant);
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
    return response;
  } catch (error) {
    console.error(error);
    const response = {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'error' }),
    };
    return response;
  }
};
