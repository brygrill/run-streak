import axios from 'axios';
import _ from 'lodash';

export const fetchRefresh = async session => {
  if (_.has(session, 'refresh_token')) {
    const token = await axios.post(
      'https://0fta34xlng.execute-api.us-east-1.amazonaws.com/default',
      { token: session.refresh_token },
    );
    return token.data;
  }
  throw new Error('Invalid session');
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
