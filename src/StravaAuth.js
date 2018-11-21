import React, { useState, useEffect } from 'react';
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

const authFlow = async (setLoading, onExchange) => {
  const search = qs.parse(window.location.search);
  if (search.code) {
    try {
      setLoading(true);
      window.history.replaceState({}, document.title, '/');
      const token = await exchange(search.code);
      onExchange(token);
    } catch (error) {
      onExchange(null, error);
    }
  } else {
    setLoading(false);
  }
};

const StravaConnect = ({ onExchange }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFlow(setLoading, onExchange);
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div>Loading...</div>
        </header>
      </div>
    );
  }

  return (
    <a href={href}>
      <img alt="strava oauth" src={stravaBtn} />
    </a>
  );
};

export default StravaConnect;
