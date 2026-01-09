import { DateTime } from 'luxon';

export const currentISO = () => DateTime.now().setZone('UTC+7').toISO();

export const toISO = (date) => DateTime.fromISO(date).setZone('UTC+7').toISO();

export const toYMD = (date, days) => {
  if (date) {
    if (days) {
      return DateTime.fromISO(date)
        .setZone('UTC+7')
        .plus({ days })
        .toFormat('yyyy-MM-dd');
    }
    return DateTime.fromISO(date).setZone('UTC+7').toFormat('yyyy-MM-dd');
  }

  if (days) {
    return DateTime.now()
      .setZone('UTC+7')
      .plus({ days })
      .toFormat('yyyy-MM-dd');
  }

  return DateTime.now().setZone('UTC+7').toFormat('yyyy-MM-dd');
};

export function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export const diffTimeHour = (myDate) => {
  const myDateObject = new Date(myDate);
  const timeDifferenceMs = new Date() - myDateObject;
  const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);
  return timeDifferenceHours;
};

