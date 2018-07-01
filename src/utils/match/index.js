import moment from 'moment';

export function formMatchResult(time, datetime, homeGoals, awayGoals) {
  if (time === 'full-time') {
    return `FT: ${homeGoals} - ${awayGoals}`;
  }
  if (!time) {
    return `🕐: ${moment(datetime).format('HH:mm')}`;
  }

  return `LIVE: ${homeGoals} - ${awayGoals}`;
}
