const moment = require('moment');
const _ = require('lodash');

const dateFormat = 'YYYY-MM-DD';

const subtractDay = day => {
  return moment(day)
    .subtract(1, 'days')
    .format(dateFormat);
};

export const extractDates = activities => {
  console.log(activities);
  const filtered = _.filter(activities, a => {
    return a.type === 'Run'
  });

  console.log(filtered)
  return _.map(filtered, f => {
    return moment(f.start_date_local).format(dateFormat);
  })
};

// start at today and work backwards until we find a day that isnt included
// for start_date today do not break the streak, but dont accumulate either
export const streakLength = streak => {
  let dayCount = 0;
  let start_date = moment().format(dateFormat);
  while (true) {
    if (_.includes(streak, start_date)) {
      dayCount += 1;
      start_date = subtractDay(start_date);
    } else if (moment(start_date).isSame(moment(), 'day')) {
      start_date = subtractDay(start_date);
    } else {
      break;
    }
  }

  // TODO: if streak greater than per_page, request next page
  return dayCount;
};
