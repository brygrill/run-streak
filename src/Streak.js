import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Count from './Count';
import { extractDates, streakLength } from './calc';

const PERPAGE = 50;

const fetchActivities = async (token, per_page) => {
  const activities = await axios.get(
    'https://www.strava.com/api/v3/athlete/activities',
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        per_page,
        page: 1,
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
      const activities = await fetchActivities(token.access_token, PERPAGE);
      const dates = extractDates(activities);
      const count = streakLength(dates, PERPAGE);
      console.log(count);
      setCount({ count: count.count, loading: false, error: null });
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
