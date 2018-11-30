const axios = require('axios');

const fetchRefresh = async token => {
  const refresh = await axios.post(
    'https://www.strava.com/oauth/token',
    {},
    {
      params: {
        refresh_token: token,
        client_id: process.env.ID,
        client_secret: process.env.SECRET,
        grant_type: 'refresh_token',
      },
    },
  );
  return refresh.data;
};

exports.handler = async event => {
  try {
    const data = fetchRefresh(event.body.token);
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
