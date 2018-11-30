import axios from 'axios';

export const fetchRefresh1 = async session => {
  const token = await axios.post(
    'https://www.strava.com/oauth/token',
    {},
    {
      params: {
        refresh_token: session.refresh_token,
        client_id: process.env.REACT_APP_ID,
        client_secret: process.env.REACT_APP_SECRET,
        grant_type: 'refresh_token',
      },
    },
  );
  return token.data;
};

export const fetchRefresh = async session => {
  console.log('fetch refresh');
  const token = await axios.post(
    'https://0fta34xlng.execute-api.us-east-1.amazonaws.com/default',
    { token: session.refresh_token },
  );
  console.log(token);
  return token.data;
};

export const fetchExchange = async code => {
  const token = await axios.post(
    'https://www.strava.com/oauth/token',
    {},
    {
      params: {
        code,
        client_id: process.env.REACT_APP_ID,
        client_secret: process.env.REACT_APP_SECRET,
        grant_type: 'authorization_code',
      },
    },
  );
  return token.data;
};

export const fetchActivities = async (token, per_page, page) => {
  const activities = await axios.get(
    'https://www.strava.com/api/v3/athlete/activities',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        per_page,
        page,
      },
    },
  );
  return activities.data;
};
