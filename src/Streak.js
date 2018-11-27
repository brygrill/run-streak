import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Count from './Count';
import { extractDates, streakLength } from './calc';

const PERPAGE = 5;

const fetchActivities = async (token, per_page, page) => {
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

const Streak = ({ token }) => {
  const [count, setCount] = useState({
    count: 0,
    loading: true,
    error: null,
  });

  const allActivities = async () => {
    let results = [];
    let nextStart = 1;
    let streak = null;
    do {
      const activities = await fetchActivities(
        token.access_token,
        PERPAGE,
        nextStart,
      );
      results = _.concat(results, activities);
      const dates = extractDates(results);
      streak = streakLength(dates, results.length);
      nextStart += 1;
    } while (streak.nextPg);
    return streak;
  };

  useEffect(async () => {
    try {
      const streakCount = await allActivities();
      console.log(streakCount);
      setCount({ count: streakCount.count, loading: false, error: null });
    } catch (error) {
      console.error(error)
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
