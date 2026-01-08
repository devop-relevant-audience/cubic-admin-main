const { DateTime } = require("luxon");
const currentISO = () => DateTime.now().setZone("UTC+7").toISO();
const toISO = (date) => DateTime.fromISO(date).setZone("UTC+7").toISO();
const toYMD = (date, days) => {
  if (date) {
    if (days) {
      return DateTime.fromISO(date)
        .setZone("UTC+7")
        .plus({ days })
        .toFormat("yyyy-MM-dd");
    }

    return DateTime.fromISO(date).setZone("UTC+7").toFormat("yyyy-MM-dd");
  }

  if (days) {
    return DateTime.now()
      .setZone("UTC+7")
      .plus({ days })
      .toFormat("yyyy-MM-dd");
  }

  return DateTime.now().setZone("UTC+7").toFormat("yyyy-MM-dd");
};
function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const diffTimeHour = (myDate) => {
  // Step 1: Convert myDate string to a Date object
  const myDateObject = new Date(myDate);

  // Step 2: Calculate the time difference in milliseconds
  const timeDifferenceMs = new Date() - myDateObject;

  // Step 3: Convert time difference from milliseconds to hours
  const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);

  return timeDifferenceHours;
};
module.exports = {
  toYMD,
  currentISO,
  toISO,
  diffTimeHour,
};
