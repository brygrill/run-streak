import React, { useState, useEffect } from 'react';
import qs from 'qs';

import { fetchExchange, connectURL } from '../utils/fetch';

import connect from '../assets/connect.svg';

const authFlow = async (setLoading, onExchange) => {
  const search = qs.parse(window.location.search);
  if (search.code) {
    try {
      setLoading(true);
      window.history.replaceState({}, document.title, '/');
      const token = await fetchExchange(search.code);
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
    <a href={connectURL()}>
      <img alt="strava oauth" src={connect} />
    </a>
  );
};

export default StravaConnect;
