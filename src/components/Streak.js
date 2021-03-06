import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Count from './Count';

import poweredby from '../assets/poweredby.svg';

import { fetchActivities } from '../utils/fetch';
import { streakLength } from '../utils/calc';

const PERPAGE = 100;

const ImgFooter = styled.img`
  height: 2.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
`;
const Streak = ({ token }) => {
  const [count, setCount] = useState({
    count: 0,
    loading: true,
    error: null,
  });

  const allActivities = async () => {
    try {
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
        streak = streakLength(results);
        nextStart += 1;
      } while (streak.nextPg);
      return streak;
    } catch (error) {
      throw new Error(error);
    }
  };

  const onMount = async () => {
    try {
      const streakCount = await allActivities();
      console.log(streakCount);
      setCount({ count: streakCount.count, loading: false, error: null });
    } catch (error) {
      console.error(error);
      setCount({ count: 0, loading: false, error });
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  if (count.loading) {
    return <div>Loading...</div>;
  }

  if (count.error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <Count count={count.count} />
      <ImgFooter alt="powered by" src={poweredby} />
    </div>
  );
};

export default Streak;
