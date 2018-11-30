import axios from 'axios';
import _ from 'lodash';

export const connectURL = () => {
  const id = process.env.REACT_APP_ID;
  const redirect =
    process.env.NODE_ENV === 'production'
      ? 'https://strk.run'
      : 'http://localhost:3000';
  const href = `https://www.strava.com/oauth/authorize?client_id=${id}&response_type=code&redirect_uri=${redirect}&approval_prompt=auto&scope=activity:read_all`;
  return href;
};

export const fetchRefresh = async session => {
  if (_.has(session, 'refresh_token')) {
    const token = await axios.post(
      'https://0fta34xlng.execute-api.us-east-1.amazonaws.com/default',
      { token: session.refresh_token, code: null, grant: 'refresh_token' },
    );
    return token.data;
  }
  throw new Error('Invalid session');
};

export const fetchExchange = async code => {
  const token = await axios.post(
    'https://0fta34xlng.execute-api.us-east-1.amazonaws.com/default',
    { token: null, code, grant: 'authorization_code' },
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
