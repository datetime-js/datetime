/**
 * -------------------------------------------------------------------------------------
 * Constants
 * -------------------------------------------------------------------------------------
 */

/** {number} Year of the Unix Epoch beginning */
export const EPOCH_START = 1970;

/** {number} */
export const SECOND_MS = 1000;

/** {number} */
export const MINUTE_MS = 60 * SECOND_MS;

/** {number} */
export const HOUR_MS = 60 * MINUTE_MS;

/** {number} */
export const DAY_MS = 24 * HOUR_MS;

/** {number} */
export const YEAR_MS = 365 * DAY_MS;

/** {number} */
export const LEAP_YEAR_MS = 366 * DAY_MS;

/** {number} */
export const MONTH_MS = 30.5 * DAY_MS;

/** {Array.<number>} */
export const MONTH_POINTS = [0];

/** {Array.<number>} */
export const LEAP_MONTH_POINTS = [0];

/** {string} */
export const FORMAT_RFC822 = 'ddd MMM DD YYYY HH:mm:ss ZZ (zz)';

let value;
let prev;
let next;

const monthDaysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

for (let month = 1; month < 12; month++) {
  prev = MONTH_POINTS[month - 1];
  value = monthDaysCount[month - 1] * DAY_MS;
  next = prev + value;
  MONTH_POINTS.push(next);
  if (month === 1) {
    LEAP_MONTH_POINTS.push(next);
  } else {
    LEAP_MONTH_POINTS.push(next + DAY_MS);
  }
}
