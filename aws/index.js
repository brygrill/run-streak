const axios = require('axios');

const fetchRefresh = async params => {
  const refresh = await axios.post(
    'https://www.strava.com/oauth/token',
    {},
    {
      params: params,
    },
  );
  return refresh.data;
};

exports.handler = async event => {
  const body = JSON.parse(event.body);
  const params =
    body.grant_type === 'refresh_token'
      ? {
          refresh_token: body.token,
          client_id: process.env.ID,
          client_secret: process.env.SECRET,
          grant_type: body.grant_type,
        }
      : {
          code: body.code,
          client_id: process.env.ID,
          client_secret: process.env.SECRET,
          grant_type: body.grant_type,
        };
  try {
    const data = await fetchRefresh(params);
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
