import React from 'react';
import stravaBtn from './strava.svg';
const href = `https://www.strava.com/oauth/authorize?client_id=12564&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=auto&scope=activity:read_all`;

const StravaConnect = () => {
  return (
    <a href={href}>
      <img alt="strava oauth" src={stravaBtn} />
    </a>
  );
};

export default StravaConnect;
