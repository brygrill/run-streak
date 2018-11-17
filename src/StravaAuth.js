import React, { useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import stravaBtn from './strava.svg';
const href = `https://www.strava.com/oauth/authorize?client_id=${
  process.env.REACT_APP_ID
}&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=auto&scope=activity:read_all`;

const exchange = async code => {
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

const authFlow = async onExchange => {
  const search = qs.parse(window.location.search);
  if (search.code) {
    console.log('request access token');
    console.log(search);
    window.history.replaceState({}, document.title, '/');
    const token = await exchange(search.code);
    console.log(token);
    onExchange(token);
  }
};

const StravaConnect = ({ onExchange }) => {
  useEffect(() => {
    authFlow(onExchange);
  });

  return (
    <a href={href}>
      <img alt="strava oauth" src={stravaBtn} />
    </a>
  );
};

export default StravaConnect;
