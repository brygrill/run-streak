const moment = require('moment');
const _ = require('lodash');

const dateFormat = 'YYYY-MM-DD';

const subtractDay = day => {
  return moment(day)
    .subtract(1, 'days')
    .format(dateFormat);
};

// get Run activites over 1 mile and return formatted date
export const extractRunDates = activities => {
  return _.chain(activities)
    .filter(a => {
      return a.type === 'Run' && a.distance >= 1609.34;
    })
    .map(f => {
      return moment(f.start_date).format(dateFormat);
    })
    .uniq()
    .value();
};

// start at today and work backwards until we find a day that isnt included
// for start_date today do not break the streak, but dont accumulate either
export const streakLength = activities => {
  const streakDates = extractRunDates(activities);
  let dayCount = 0;
  let ranToday = true;
  let start_date = moment().format(dateFormat);
  while (true) {
    if (_.includes(streakDates, start_date)) {
      dayCount += 1;
      start_date = subtractDay(start_date);
    } else if (moment(start_date).isSame(moment(), 'day')) {
      start_date = subtractDay(start_date);
      ranToday = false;
    } else {
      break;
    }
  }

  return { count: dayCount, nextPg: dayCount === streakDates.length, ranToday };
};
