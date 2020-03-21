import * as moment from 'moment';

export const dateToDayFormat = (date: Date) => {
  return moment(date).startOf('day').format('YYYY-MM-DD');
};

export const millisToHourFormat = (seconds: number) => {
  return moment.utc(seconds).format('HH:mm');
};
