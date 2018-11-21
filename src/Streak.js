import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Count from './Count';
import { extractDates, streakLength } from './calc';

const fetchActivities = async token => {
  const activities = await axios.get(
    'https://www.strava.com/api/v3/athlete/activities',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        per_page: 50,
      },
    },
  );
  return activities.data;
};

const Streak = ({ token }) => {
  const [count, setCount] = useState({
    count: 0,
    loading: true,
    error: null,
  });

  useEffect(async () => {
    try {
      const activities = await fetchActivities(token.access_token);
      const dates = extractDates(activities);
      const count = streakLength(dates);
      setCount({ count, loading: false, error: null });
    } catch (error) {
      setCount({ count: 0, loading: false, error });
    }
  }, []);

  if (count.loading) {
    return <div>Loading...</div>;
  }

  if (count.error) {
    return <div>Error...</div>;
  }

  return <Count count={count.count} />;
};

export default Streak;
