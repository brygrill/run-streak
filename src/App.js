import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StravaAuth from './StravaAuth';
import './App.css';

const SESSION = '__STRAVA__SESSION__';

const readLocal = () => {
  const local = localStorage.getItem(SESSION);
  return JSON.parse(local);
};

const refresh = async session => {
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

const App = () => {
  const [session, setSession] = useState({
    token: null,
    loading: true,
    error: null,
  });

  const onExchange = (session, error) => {
    if (error) {
      localStorage.removeItem(SESSION);
      setSession({
        token: null,
        loading: false,
        error,
      });
      return;
    }
    localStorage.setItem(SESSION, JSON.stringify(session));
    setSession({
      token: session,
      loading: false,
      error: null,
    });
  };

  useEffect(async () => {
    const local = readLocal();
    if (local) {
      try {
        const session = await refresh(local);
        onExchange(session);
      } catch (error) {
        onExchange(null, error);
      }
      return;
    }
    setSession({
      token: null,
      loading: false,
      error: null,
    });
  }, []);

  if (session.loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div>Loading...</div>
        </header>
      </div>
    );
  }

  if (session.error) {
    return (
      <div className="App">
        <header className="App-header">
          <div>Error...</div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {session ? <div>Streak</div> : <StravaAuth onExchange={onExchange} />}
      </header>
    </div>
  );
};

export default App;
