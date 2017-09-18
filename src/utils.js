import DateTime from './DateTime';
import Day from './calendar/Day';
import Hour from './calendar/Hour';
import Minute from './calendar/Minute';
import Month from './calendar/Month';
import MonthWeeks from './calendar/MonthWeeks';
import Second from './calendar/Second';
import Week from './calendar/Week';
import Year from './calendar/Year';
import Duration from './duration/Duration';
import Interval from './interval/Interval';

import {
  EPOCH_START,
  SECOND_MS,
  MINUTE_MS,
  HOUR_MS,
  DAY_MS,
  YEAR_MS,
  LEAP_YEAR_MS,
  MAX_TIMESTAMP_VALUE,
  MIN_TIMESTAMP_VALUE,
  MONTH_MS,
  MONTH_POINTS,
  LEAP_MONTH_POINTS
} from './constants';

import { getNow, getTzdata } from './settings';

const PADDINGS = [
  '',
  '0',
  '00',
  '000'
];

const RE_TRIM = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * -------------------------------------------------------------------------------------
 * Inner functions
 * -------------------------------------------------------------------------------------
 */

/**
 * @inner
 */
function calcDaysInYear (year) {
  if (isLeapYear(year)) {
    return 366;
  }

  return 365;
}

/**
 * @inner
 */
function dateToDayIndex (date) {
  let dayIndex = 0;
  const year = date[0];
  let yearsDiff = year - 1970;
  let currYear;
  let idx;

  if (isNaN(yearsDiff)) {
    return NaN;
  }

  // Unix Epoch
  if (yearsDiff >= 0) {
    if (yearsDiff > 0) {
      for (idx = 0; idx < yearsDiff; idx++) {
        currYear = 1970 + idx;
        dayIndex = dayIndex + calcDaysInYear(currYear);
      }
    }

    for (idx = 1; idx < date[1]; idx++) {
      dayIndex = dayIndex + calcDaysInMonth(idx, year);
    }

    dayIndex = dayIndex + date[2] - 1;
  }

  // Before Unix Epoch
  if (yearsDiff < 0) {
    yearsDiff = yearsDiff + 1;

    for (idx = 0; idx < -yearsDiff; idx++) {
      currYear = 1969 - idx;
      dayIndex = dayIndex - calcDaysInYear(currYear);
    }

    for (idx = 12; idx > date[1]; idx--) {
      dayIndex = dayIndex - calcDaysInMonth(idx, year);
    }

    const restDaysInMonth = calcDaysInMonth(date[1], year) - date[2];

    dayIndex = dayIndex - restDaysInMonth - 1;
  }

  return dayIndex;
}

/**
 * @param {Object} tzdata
 * @inner
 */
function getAmbiguousIntervals (tzdata) {
  const intervals = [];

  const offsets = tzdata.offset;
  const untils = tzdata.until;

  for (let idx = 0; idx < untils.length; idx++) {
    const until = untils[idx];
    if (until !== null) {
      const offset = offsets[idx];
      const nextOffset = offsets[idx + 1];
      const hasAmbiguousInterval = offset < nextOffset;

      if (hasAmbiguousInterval) {
        const offsetDiff = (nextOffset - offset) * 60 * 1000;
        intervals.push([
          until - offsetDiff,
          until,
          until + offsetDiff
        ]);
      }
    }
  }

  return intervals;
}

/**
 * @inner
 */
function getDateAttributes (dt) {
  return [
    dt.date[0],
    dt.date[1],
    dt.date[2],
    dt.date[3],
    dt.date[4],
    dt.date[5],
    dt.date[6]
  ];
}

/**
 * @inner
 */
function getDayOfWeekByDayIndex (dayIndex, mondayFirst) {
  dayIndex = dayIndex + 4;

  if (mondayFirst) {
    dayIndex = dayIndex - 1;
  }

  if (dayIndex >= 7 || dayIndex <= -7) {
    dayIndex = dayIndex % 7;
  }

  if (dayIndex < 0) {
    dayIndex = 7 + dayIndex;
  }

  return dayIndex;
}

/**
 * @param {Array.<number>} dateAttrs
 * @param {number} offset
 * @param {boolean} preferLateAmbiguous
 * @param {Object} tzdata
 */
export function getTimestampFromAttrs (dateAttrs, offset, preferLateAmbiguous, tzdata) {
  // Timestamp from attributes if they were attributes of UTC date
  const utcTimestamp = utcDateToTimestamp(dateAttrs);

  // If offset is specified, we just use it
  // Otherwise the offset needs to be calculated based on tzdata
  if (isNumber(offset)) {
    return utcTimestamp + offset;
  }

  // Preliminary tzrule, based on UTC timestamp
  const preliminaryTzrule = getTzrule(utcTimestamp, tzdata);

  // Preliminary offset, based on UTC timestamp
  const preliminaryOffset = preliminaryTzrule.offset;

  // Preliminary timestamp, based on UTC timestamp and preliminary offset
  const preliminaryTimestamp = utcTimestamp + preliminaryOffset;

  // Check if the preliminary timestamp is valid for the preliminary timezone rule
  const isPreliminaryTimestampValid = tzruleIncludes(preliminaryTzrule, preliminaryTimestamp);

  if (isPreliminaryTimestampValid) {
    const isAmbiguousEarly = isDateAmbiguousEarly(preliminaryTimestamp, tzdata);
    const isAmbiguousLate = isDateAmbiguousLate(preliminaryTimestamp, tzdata);

    const isAmbiguous = isAmbiguousEarly || isAmbiguousLate;

    if (isAmbiguous) {
      const earlyTzrule = isAmbiguousEarly
        ? preliminaryTzrule
        : getPreviousTzrule(preliminaryTzrule, tzdata);

      const lateTzrule = isAmbiguousEarly
        ? getNextTzrule(preliminaryTzrule, tzdata)
        : preliminaryTzrule;

      const tzrule = preferLateAmbiguous ? lateTzrule : earlyTzrule;

      return utcTimestamp + tzrule.offset;
    }

    return preliminaryTimestamp;
  }

  const preliminaryTzrule2 = getTzrule(preliminaryTimestamp, tzdata);
  const preliminaryOffset2 = preliminaryTzrule2.offset;

  const preliminaryTimestamp2 = utcTimestamp + preliminaryOffset2;

  return tzruleIncludes(preliminaryTzrule2, preliminaryTimestamp2)
    ? preliminaryTimestamp2
    : Math.max(preliminaryTimestamp, preliminaryTimestamp2);
}

/**
 * Calculates the year of the given timestamp
 * @param {number} timestamp
 * @returns {number}
 * @inner
 */
function timestampToYear (timestamp) {
  const startTimestamp = 0;
  const startYear = EPOCH_START;

  let ms = startTimestamp;
  let prev;
  let year;

  if (timestamp >= startTimestamp) {
    year = startYear - 1;
    while (ms <= timestamp) {
      year = year + 1;
      prev = ms;

      if (isLeapYear(year)) {
        ms = ms + 366 * 24 * 60 * 60 * 1000;
      } else {
        ms = ms + 365 * 24 * 60 * 60 * 1000;
      }
    }
  } else {
    year = startYear;
    while (ms > timestamp) {
      year = year - 1;
      prev = ms;

      if (isLeapYear(year)) {
        ms = ms - 366 * 24 * 60 * 60 * 1000;
      } else {
        ms = ms - 365 * 24 * 60 * 60 * 1000;
      }
    }
  }

  const remainder = timestamp - prev;

  return {
    remainder,
    year
  };
}

/**
 * ----------------------------------------------------------------------------------------
 * Public utilities
 * ----------------------------------------------------------------------------------------
 */

/**
 * @inner
 */
export function copyArray (arr) {
  const copy = new Array(arr.length);

  for (let idx = 0; idx < copy.length; idx++) {
    copy[idx] = arr[idx];
  }

  return copy;
}

/**
 * @inner
 */
export function calcDayOfWeek (dt, useUTC, mondayFirst) {
  const dateAttrs = useUTC ? getDateUTCAttributes(dt) : dt.date;
  const dayIndex = dateToDayIndex(dateAttrs);

  return getDayOfWeekByDayIndex(dayIndex, mondayFirst);
}

/**
 * @inner
 */
export function calcDaysInMonth (month, year) {
  let addedYears;

  // Normalize arguments
  if (month > 12) {
    addedYears = (month - 1) / 12 | 0;
    month = month - addedYears * 12;
    year = year + addedYears;
  } else if (month <= 0) {
    addedYears = month / 12 | 0;
    month = month - addedYears * 12;
    year = year + addedYears;

    month = 12 + month;
    year = year - 1;
  }

  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31;
  }

  return 30;
}

/**
 * @inner
 */
export function getDateUTCAttributes (dt) {
  if (dt.utc === null) {
    dt.utc = timestampToUTCDate(dt.timestamp);
  }
  return dt.utc;
}

/**
 * @param {string} tzName
 * @inner
 */
export function getZoneTzdata (tzName) {
  const zoneTzdata = getTzdata().zones[tzName];
  if (!zoneTzdata.ambiguous) {
    zoneTzdata.ambiguous = getAmbiguousIntervals(zoneTzdata);
  }
  return zoneTzdata;
}

/**
 * @inner
 */
export function getTzrule (timestamp, timezoneTzdata) {
  const untils = timezoneTzdata.until;
  const len = untils.length;
  let index = -1;

  for (let idx = 0; idx < len; idx++) {
    if (untils[idx] !== null) {
      if (timestamp >= untils[idx]) {
        index = idx + 1;
      }
    }
  }

  index = index === -1 ? 0 : index;

  const abbr = timezoneTzdata.abbr[index];
  const dst = timezoneTzdata.dst[index];

  const offset = Math.round(timezoneTzdata.offset[index] * 60) * 1000;
  const name = timezoneTzdata.name;

  const starts = index !== 0 ? untils[index - 1] : -Infinity;
  const ends = untils[index] !== null ? untils[index] : Infinity;

  return {
    abbr,
    dst,
    ends,
    index,
    name,
    offset,
    starts
  };
}

/**
 *
 */
function getNextTzrule (tzrule, timezoneTzdata) {
  const index = tzrule.index + 1;
  const untils = timezoneTzdata.until;

  const abbr = timezoneTzdata.abbr[index];
  const dst = timezoneTzdata.dst[index];

  const offset = Math.round(timezoneTzdata.offset[index] * 60) * 1000;
  const name = timezoneTzdata.name;

  const starts = index !== 0 ? untils[index - 1] : -Infinity;
  const ends = untils[index] !== null ? untils[index] : Infinity;

  return {
    abbr,
    dst,
    ends,
    index,
    name,
    offset,
    starts
  };
}

/**
 * @inner
 */
function getPreviousTzrule (tzrule, timezoneTzdata) {
  const index = tzrule.index - 1;
  const untils = timezoneTzdata.until;

  const abbr = timezoneTzdata.abbr[index];
  const dst = timezoneTzdata.dst[index];

  const offset = Math.round(timezoneTzdata.offset[index] * 60) * 1000;
  const name = timezoneTzdata.name;

  const starts = index !== 0 ? untils[index - 1] : -Infinity;
  const ends = untils[index] !== null ? untils[index] : Infinity;

  return {
    abbr,
    dst,
    ends,
    index,
    name,
    offset,
    starts
  };
}

/**
 * @param {Tzrule} tzrule
 * @param {number} timestamp
 * @returns {boolean}
 * @inner
 */
function tzruleIncludes (tzrule, timestamp) {
  return timestamp >= tzrule.starts && timestamp < tzrule.ends;
}

/**
 * @param {number} timestamp
 * @param {Object} tzdata
 * @public
 */
function isDateAmbiguousEarly (timestamp, tzdata) {
  let intervals = tzdata.ambiguous;
  let idx = intervals.length;

  while (idx--) {
    if (timestamp >= intervals[idx][2]) {
      return false;
    }
    if (timestamp >= intervals[idx][0] && timestamp < intervals[idx][1]) {
      return true;
    }
  }

  return false;
}

/**
 * @param {number} timestamp
 * @param {Object} tzdata
 * @public
 */
export function isDateAmbiguousLate (timestamp, tzdata) {
  let intervals = tzdata.ambiguous;
  let idx = intervals.length;

  while (idx--) {
    if (timestamp >= intervals[idx][2]) {
      return false;
    }
    if (timestamp >= intervals[idx][1]) {
      return true;
    }
  }

  return false;
}

/**
 * @inner
 */
export function isLeapYear (year) {
  return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isArrayLike (arg) {
  return arg !== null && typeof arg === 'object' && typeof arg.length === 'number';
}

/**
 * @inner
 */
export function isDateTime (arg) {
  return arg instanceof DateTime;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isDay (arg) {
  return arg instanceof Day;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isDuration (arg) {
  return arg instanceof Duration;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isFunction (arg) {
  return typeof arg === 'function';
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isHour (arg) {
  return arg instanceof Hour;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isInterval (arg) {
  return arg instanceof Interval;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isMinute (arg) {
  return arg instanceof Minute;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isMonth (arg) {
  return arg instanceof Month;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isMonthWeeks (arg) {
  return arg instanceof MonthWeeks;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isNumber (arg) {
  return typeof arg === 'number';
}

/**
 * @param {DateTime} dt1
 * @param {DateTime} dt2
 * @returns {boolean}
 * @inner
 */
export function isSameDay (dt1, dt2) {
  return isSameMonth(dt1, dt2) && dt1.getDayOfMonth() === dt2.getDayOfMonth();
}

/**
 * @param {DateTime} dt1
 * @param {DateTime} dt2
 * @returns {boolean}
 * @inner
 */
export function isSameMonth (dt1, dt2) {
  return isSameYear(dt1, dt2) && dt1.getMonth() === dt2.getMonth();
}

/**
 * @param {DateTime} dt1
 * @param {DateTime} dt2
 * @returns {boolean}
 * @inner
 */
export function isSameYear (dt1, dt2) {
  return dt1.getYear() === dt2.getYear();
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isSecond (arg) {
  return arg instanceof Second;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isString (arg) {
  return typeof arg === 'string';
}

/**
 * @param {DateTime} dt
 * @returns {boolean}
 * @inner
 */
export function isDateTimeToday (dt) {
  const today = new DateTime();
  return isSameDay(dt, today);
}

/**
 * @param {DateTime} dt
 * @param {Object} localeData
 * @returns {boolean}
 * @inner
 */
export function isDateTimeWeekend (dt, localeData) {
  const dayOfWeek = dt.getDayOfWeek();
  return localeData.mondayFirst
    ? dayOfWeek === 5 || dayOfWeek === 6
    : dayOfWeek === 6 || dayOfWeek === 0;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isWeek (arg) {
  return arg instanceof Week;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
export function isYear (arg) {
  return arg instanceof Year;
}

/**
 * @inner
 */
export function leftPad (str, len) {
  str = String(str);

  const padSize = len - str.length;

  if (padSize <= 0) {
    return str;
  }

  return PADDINGS[padSize] + str;
}

/**
 * @param {Array} dateAttrs
 * @returns {boolean}
 * @inner
 */
export function validateDateAttributes (dateAttrs) {
  let idx = dateAttrs.length;
  while (idx--) {
    if (!isNumber(dateAttrs[idx]) || !isFinite(dateAttrs[idx])) {
      return false;
    }
  }
  return true;
}

export function normalizeDayOfMonth (dateAttrs) {
  const daysInMonth = calcDaysInMonth(dateAttrs[1], dateAttrs[0]);
  if (dateAttrs[2] > daysInMonth) {
    dateAttrs[2] = daysInMonth;
  }
}

export function normalizeMonth (givenDateAttrs) {
  let year = givenDateAttrs[0];
  let month = givenDateAttrs[1];

  let addedYears;

  if (month > 12) {
    addedYears = (month - 1) / 12 | 0;
    month = month - addedYears * 12;
    year = year + addedYears;
  } else if (month <= 0) {
    addedYears = month / 12 | 0;
    month = month - addedYears * 12;
    year = year + addedYears;

    month = 12 + month;
    year = year - 1;
  }

  givenDateAttrs[0] = year;
  givenDateAttrs[1] = month;
}

/**
 * @inner
 */
export function normalizeDateAttributes (givenDateAttrs) {
  const undef = void 0;
  // @todo check and coerce type
  let year = givenDateAttrs[0];
  let month = givenDateAttrs[1] !== undef ? givenDateAttrs[1] : 1;
  let day = givenDateAttrs[2] !== undef ? givenDateAttrs[2] : 1;
  let hour = givenDateAttrs[3] || 0;
  let minute = givenDateAttrs[4] || 0;
  let second = givenDateAttrs[5] || 0;
  let millisecond = givenDateAttrs[6] || 0;

  let addedSeconds;
  let addedMinutes;
  let addedHours;
  let addedDays;
  let addedYears;

  if (millisecond >= 1000) {
    addedSeconds = millisecond / 1000 | 0;
    millisecond = millisecond - addedSeconds * 1000;
    second = second + addedSeconds;
  } else if (millisecond < 0) {
    addedSeconds = (millisecond + 1) / 1000 | 0;
    millisecond = millisecond - addedSeconds * 1000;
    second = second + addedSeconds;

    millisecond = 1000 + millisecond;
    second = second - 1;
  }

  if (second >= 60) {
    addedMinutes = second / 60 | 0;
    second = second - addedMinutes * 60;
    minute = minute + addedMinutes;
  } else if (second < 0) {
    addedMinutes = (second + 1) / 60 | 0;
    second = second - addedMinutes * 60;
    minute = minute + addedMinutes;

    second = 60 + second;
    minute = minute - 1;
  }

  if (minute >= 60) {
    addedHours = minute / 60 | 0;
    minute = minute - addedHours * 60;
    hour = hour + addedHours;
  } else if (minute < 0) {
    addedHours = (minute + 1) / 60 | 0;
    minute = minute - addedHours * 60;
    hour = hour + addedHours;

    minute = 60 + minute;
    hour = hour - 1;
  }

  if (hour >= 24) {
    addedDays = hour / 24 | 0;
    hour = hour - addedDays * 24;
    day = day + addedDays;
  } else if (hour < 0) {
    addedDays = (hour + 1) / 24 | 0;
    hour = hour - addedDays * 24;
    day = day + addedDays;

    hour = 24 + hour;
    day = day - 1;
  }

  let daysInMonth;

  if (day > 0) {
    daysInMonth = calcDaysInMonth(month, year);
    while (day > daysInMonth) {
      day = day - daysInMonth;
      month = month + 1;
      daysInMonth = calcDaysInMonth(month, year);
    }
  } else {
    while (day <= 0) {
      month = month - 1;
      day = day + calcDaysInMonth(month, year);
    }
  }

  if (month > 12) {
    addedYears = (month - 1) / 12 | 0;
    month = month - addedYears * 12;
    year = year + addedYears;
  } else if (month <= 0) {
    addedYears = month / 12 | 0;
    month = month - addedYears * 12;
    year = year + addedYears;

    month = 12 + month;
    year = year - 1;
  }

  givenDateAttrs[0] = year;
  givenDateAttrs[1] = month;
  givenDateAttrs[2] = day;
  givenDateAttrs[3] = hour;
  givenDateAttrs[4] = minute;
  givenDateAttrs[5] = second;
  givenDateAttrs[6] = millisecond;

  return givenDateAttrs;
}

/**
 * @inner
 */
export function setDateAttribute (dt, attrIndex, value) {
  const dateAttrs = getDateAttributes(dt);

  dateAttrs[attrIndex] = value;

  setDateAttributes(dt, dateAttrs);
}

/**
 * @inner
 */
export function setDateAttributes (dt, dateAttrs) {
  const preferLateAmbiguous = isDateAmbiguousLate(dt.timestamp, dt.tzdata);

  normalizeDateAttributes(dateAttrs);

  dt.timestamp = getTimestampFromAttrs(dateAttrs, null, preferLateAmbiguous, dt.tzdata);
  dt.tzrule = getTzrule(dt.timestamp, dt.tzdata);
  dt.date = timestampToDate(dt.timestamp, dt.tzrule);
  dt.utc = null;
}

/**
 * @inner
 */
export function setDateUTCAttribute (dt, attrIndex, value) {
  const utc = getDateUTCAttributes(dt);

  utc[attrIndex] = value;

  normalizeDateAttributes(utc);

  dt.timestamp = utcDateToTimestamp(utc);
  dt.tzrule = getTzrule(dt.timestamp, dt.tzdata);
  dt.date = timestampToDate(dt.timestamp, dt.tzrule);
  dt.utc = timestampToUTCDate(dt.timestamp);
}

/**
 * @inner
 */
export function _setDayOfWeek (dt, dayOfWeek, mondayFirst) {
  const diff = dayOfWeek - calcDayOfWeek(dt, false, mondayFirst);
  if (diff !== 0) {
    setDateAttribute(dt, 2/** attrIndex */, dt.date[2] + diff);
  }
}

/**
 * @inner
 */
export function timestampToDate (timestamp, tzrule) {
  return timestampToUTCDate(timestamp - tzrule.offset);
}

/**
 * @inner
 */
function utcDateToTimestamp (dateAttrs) {
  const startTimestamp = 0;
  const startYear = EPOCH_START;

  const year = dateAttrs[0];
  const isAfterStartPoint = year >= startYear;

  let year_ = startYear;
  let timestamp = startTimestamp;

  if (isAfterStartPoint) {
    while (year_ < year) {
      if (isLeapYear(year_)) {
        timestamp = timestamp + LEAP_YEAR_MS;
      } else {
        timestamp = timestamp + YEAR_MS;
      }
      year_ = year_ + 1;
    }
  } else {
    year_ = startYear - 1;
    while (year_ > year) {
      if (isLeapYear(year_)) {
        timestamp = timestamp - LEAP_YEAR_MS;
      } else {
        timestamp = timestamp - YEAR_MS;
      }
      year_ = year_ - 1;
    }
  }

  const monthPoints = isLeapYear(year) ? LEAP_MONTH_POINTS : MONTH_POINTS;
  let msWithinYear = monthPoints[dateAttrs[1] - 1] +
    (dateAttrs[2] - 1) * DAY_MS +
    dateAttrs[3] * HOUR_MS +
    dateAttrs[4] * MINUTE_MS +
    dateAttrs[5] * SECOND_MS + dateAttrs[6];

  if (isAfterStartPoint) {
    return timestamp + msWithinYear;
  }

  if (isLeapYear(year)) {
    msWithinYear = LEAP_YEAR_MS - msWithinYear;
  } else {
    msWithinYear = YEAR_MS - msWithinYear;
  }

  return timestamp - msWithinYear;
}

/**
 * @inner
 */
export function timestampToUTCDate (timestamp) {
  let approxMonth;
  let month;

  let monthPoints;

  let day;
  let hour;
  let minute;
  let second;

  // Calculate actual year, comparing the approximate value with reference points
  const _year = timestampToYear(timestamp);

  const year = _year.year;
  let remainder = _year.remainder;

  if (remainder < 0) {
    if (isLeapYear(year)) {
      remainder = LEAP_YEAR_MS + remainder;
    } else {
      remainder = YEAR_MS + remainder;
    }
  }

  // Calculate approximate month
  approxMonth = Math.floor(remainder / MONTH_MS);

  // Calculate actual month, comparing the approximate value with reference points
  monthPoints = isLeapYear(year) ? LEAP_MONTH_POINTS : MONTH_POINTS;
  if (remainder < monthPoints[approxMonth]) {
    month = approxMonth - 1;
  } else if (remainder >= monthPoints[approxMonth + 1]) {
    month = approxMonth + 1;
  } else {
    month = approxMonth;
  }

  remainder = remainder - monthPoints[month];

  day = Math.floor(remainder / DAY_MS);
  remainder = remainder - day * DAY_MS;

  hour = Math.floor(remainder / HOUR_MS);
  remainder = remainder - hour * HOUR_MS;

  minute = Math.floor(remainder / MINUTE_MS);
  remainder = remainder - minute * MINUTE_MS;

  second = Math.floor(remainder / SECOND_MS);
  remainder = remainder - second * SECOND_MS;

  return [
    year,
    month + 1,
    day + 1,
    hour,
    minute,
    second,
    remainder
  ];
}

/**
 * @param {Object} target
 * @param {Object} source
 * @inner
 */
export function extend (target, source) {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  for (const key in source) {
    /* istanbul ignore else */
    if (hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
}

/**
 * @param {number} timestamp
 * @returns {boolean}
 */
export function isValidTimestamp (timestamp) {
  return timestamp > MIN_TIMESTAMP_VALUE && timestamp < MAX_TIMESTAMP_VALUE;
}

/**
 * @param {Function} Parent
 * @param {Function} Child
 * @inner
 */
export function inherit (Parent, Child) {
  function TempCtor () {}
  TempCtor.prototype = Parent.prototype;
  Child.prototype = new TempCtor();
  Child.prototype.constructor = Child;
}

/**
 * Trims the given string
 * @param {string} str
 * @returns {string}
 * @inner
 */
export function trim (str) {
  return str.replace(RE_TRIM, '');
}

/**
 * @param {DateTime} dt
 * @inner
 */
export function setInvalid (dt) {
  dt.invalid = true;
  dt.timestamp = NaN;
  dt.date = [NaN, NaN, NaN, NaN, NaN, NaN, NaN];
  dt.utc = [NaN, NaN, NaN, NaN, NaN, NaN, NaN];

  dt.tzrule = {
    abbr: null,
    dst: null,
    name: null,
    offset: null
  };

  return dt;
}

export function toInteger (arg) {
  return parseInt(arg, 10) || 0;
}

export function now () {
  return getNow()();
}

export function warn (msg) {
  try {
    console.warn(msg);
  } catch (ex) {
    //
  }
}
