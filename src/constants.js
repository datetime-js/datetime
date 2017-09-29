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

/** {number} */
export const MIN_TIMESTAMP_VALUE = -9007199254740992;

/** {number} */
export const MAX_TIMESTAMP_VALUE = 9007199254740992;

/** {string} */
export const E_INVALID_ARGUMENT = 'E_INVALID_ARGUMENT';

/** {string} */
export const E_INVALID_ATTRIBUTE = 'E_INVALID_ATTRIBUTE';

/** {string} */
export const E_INVALID_INTERVAL_ORDER = 'E_INVALID_INTERVAL_ORDER';

/** {string} */
export const E_INVALID_SETTER_ATTRIBUTE = 'E_INVALID_SETTER_ATTRIBUTE';

/** {string} */
export const E_PARSE_FORMAT = 'E_PARSE_FORMAT';

/** {string} */
export const E_PARSE_ISO = 'E_PARSE_ISO';

/** {string} */
export const E_RANGE = 'E_RANGE';

/** {Object} */
export const message = {
  [E_INVALID_ARGUMENT]: arg => `${String(arg)} is not a valid argument. Argument must be a string, ` +
    'or a number, or an array, or another instance of DateTime',

  [E_INVALID_ATTRIBUTE]: () => 'At least one of the given date attributes is not a valid number',

  [E_INVALID_INTERVAL_ORDER]: () => 'Interval end cannot be earlier than interval start',

  [E_INVALID_SETTER_ATTRIBUTE]: arg => `${String(arg)} is not a valid argument. Argument must be a number.`,

  [E_PARSE_FORMAT]: (dateStr, format) => `String "${dateStr}" does not match to the given "${format}" format`,

  [E_PARSE_ISO]: dateStr => `String "${dateStr}" is not a valid ISO-8601 date`,

  [E_RANGE]: arg => `Timestamp ${arg} is too big. It must be in a range of ` +
    '-9,007,199,254,740,992 to 9,007,199,254,740,992'
};

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
