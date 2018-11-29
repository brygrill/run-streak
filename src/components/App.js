import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loading from './Loading';
import StravaAuth from './Auth';
import Streak from './Streak';

import { fetchRefresh } from '../utils/fetch';

const SESSION = '__STRAVA__SESSION__';

const readLocal = () => {
  const local = localStorage.getItem(SESSION);
  return JSON.parse(local);
};

const Header = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

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
        const session = await fetchRefresh(local);
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
      <Header>
        <Loading />
      </Header>
    );
  }

  if (session.error) {
    return (
      <Header>
        <div>Error fetching Strava data...</div>
      </Header>
    );
  }

  return (
    <Header>
      {session.token ? (
        <Streak token={session.token} />
      ) : (
        <StravaAuth onExchange={onExchange} />
      )}
    </Header>
  );
};

export default App;
