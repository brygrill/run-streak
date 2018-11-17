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
  const [session, setSession] = useState(null);

  useEffect(async () => {
    console.log('USE EFFECT!')
    const local = readLocal();
    if (local) {
      console.log(local);
      const session = await refresh(local)
      setSession(session);
    }
  }, []);

  const onExchange = session => {
    localStorage.setItem(SESSION, JSON.stringify(session));
    setSession(session);
  };

  return (
    <div className="App">
      <header className="App-header">
        {session ? <div>Streak</div> : <StravaAuth onExchange={onExchange} />}
      </header>
    </div>
  );
};

export default App;
