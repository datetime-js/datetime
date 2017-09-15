import {
  FORMAT_RFC822,
  HOUR_MS,
  MINUTE_MS,
  SECOND_MS
} from './constants';

import {
  defineLocale,
  getDefaultTimezone,
  getLocale,
  getLocaleData,
  setDefaultTimezone,
  setLocale,
  setTzdata,
  setNow
} from './settings';

import {
  calcDaysInMonth,
  copyArray,
  calcDayOfWeek,
  extend,
  getDateUTCAttributes,
  getTimestampFromAttrs,
  getZoneTzdata,
  getTzrule,
  isArrayLike,
  isDateAmbiguousLate,
  isDateTime,
  isDateTimeToday,
  isDateTimeWeekend,
  isDay,
  isDuration,
  isHour,
  isInterval,
  isLeapYear,
  isMinute,
  isMonth,
  isMonthWeeks,
  isNumber,
  isSecond,
  isString,
  isWeek,
  isYear,
  normalizeDateAttributes,
  normalizeDayOfMonth,
  normalizeMonth,
  now,
  setDateAttribute,
  setDateAttributes,
  setDateUTCAttribute,
  _setDayOfWeek,
  setInvalid,
  timestampToDate,
  validateDateAttributes
} from './utils';

import {
  parse,
  parseWithFormat
} from './parse';

import {
  formatDate,
  formatDateUTC,
  formatDateISO
} from './format';

import Day from './calendar/Day';
import Duration from './duration/Duration';
import Hour from './calendar/Hour';
import Minute from './calendar/Minute';
import Month from './calendar/Month';
import MonthWeeks from './calendar/MonthWeeks';
import Second from './calendar/Second';
import Week from './calendar/Week';
import Year from './calendar/Year';

/**
 * -------------------------------------------------------------------------------------
 * DateTime
 * -------------------------------------------------------------------------------------
 */

/**
 * @param {DateTime} dt
 * @param {DateTime} dt2
 */
function createFromDateTime (dt, dt2) {
  // Date attributes
  dt.date = copyArray(dt2.date);

  // UTC
  dt.utc = dt2.utc === null ? null : copyArray(dt2.utc);

  // Timestamp
  dt.timestamp = dt2.timestamp;

  // Validity status
  dt.invalid = dt2.invalid;

  // Timezone name
  dt.timezone = dt2.timezone;

  // Timezone tzdata
  dt.tzdata = dt2.tzdata;

  // DateTime tzrule
  dt.tzrule = {
    abbr: dt2.tzrule.abbr,
    dst: dt2.tzrule.dst,
    name: dt2.tzrule.name,
    offset: dt2.tzrule.offset
  };
}

/**
 * @param {DateTime} dt
 * @param {number} timestamp
 * @param {string} timezone
 */
function createFromTimestamp (dt, timestamp, timezone) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezone;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezone);

  if (isNaN(timestamp)) {
    setInvalid(dt);
    return;
  }

  // Timestamp
  dt.timestamp = timestamp;

  // UTC date attributes
  dt.utc = null;

  // Local date info
  dt.tzrule = getTzrule(dt.timestamp, dt.tzdata);

  // Date attributes
  dt.date = timestampToDate(dt.timestamp, dt.tzrule);
}

/**
 * @param {DateTime} dt
 * @param {Array.<number>} dateAttrs
 * @param {number} offset
 * @param {string} timezone
 */
function createFromAttributes (dt, dateAttrs, offset, timezone) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezone;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezone);

  if (!validateDateAttributes(dateAttrs)) {
    setInvalid(dt);
    return;
  }

  createFromAttributesSafe(dt, dateAttrs, offset, timezone);
}

/**
 * @param {DateTime} dt
 * @param {Array.<number>} dateAttrs
 * @param {number} offset
 * @param {string} timezone
 * @param {boolean} preferLateAmbiguous
 */
function createFromAttributesSafe (dt, dateAttrs, offset, timezone, preferLateAmbiguous = false) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezone;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezone);

  // Attributes
  const givenAttrs = copyArray(dateAttrs);

  // Normalize date attributes
  normalizeDateAttributes(givenAttrs);

  // Timestamp
  dt.timestamp = getTimestampFromAttrs(givenAttrs, offset, preferLateAmbiguous, dt.tzdata);

  // Timezone rule
  dt.tzrule = getTzrule(dt.timestamp, dt.tzdata);

  // Date UTC attributes
  dt.utc = null;

  // Date attributes
  dt.date = timestampToDate(dt.timestamp, dt.tzrule);
}

/**
 * @param {DateTime} dt
 * @param {string} dateStr
 * @param {string} formatStr
 * @param {string} timezone
 */
function createFromString (dt, dateStr, formatStr, timezone) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezone;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezone);

  // Attributes
  const dateAttrs = formatStr ? parseWithFormat(dateStr, formatStr, timezone) : parse(dateStr);

  if (!dateAttrs) {
    setInvalid(dt);
    return;
  }

  // Requested offset
  const offset = dateAttrs[7];

  createFromAttributesSafe(dt, dateAttrs, offset, timezone);
}

/**
 * @constructor
 */
function DateTime (arg0, arg1, arg2) {
  const dt = this;

  // Normalize arguments
  const noargs = arguments.length === 0;

  let timezone = arg1;
  let formatStr = '';

  if (arguments.length === 3 && isString(arg1) && isString(arg2)) {
    formatStr = arg1;
    timezone = arg2;
  }

  timezone = timezone || getDefaultTimezone();

  // Create from timestamp
  if (noargs || isNumber(arg0)) {
    return createFromTimestamp(this, noargs ? now() : arg0, timezone);
  }

  // Create from string
  if (isString(arg0)) {
    return createFromString(dt, arg0, formatStr, timezone);
  }

  // Create from DateTime
  if (arg0 instanceof DateTime) {
    return createFromDateTime(dt, arg0);
  }

  // Create from array of attributes
  if (isArrayLike(arg0)) {
    return createFromAttributes(dt, arg0, null/** offset */, timezone);
  }
}

/**
 * ----------------------------------------------------------------------------------------
 * Getters
 * ----------------------------------------------------------------------------------------
 */

/**
 * @returns {Object}
 * @public
 */
function getTimezoneInfo () {
  return this.tzrule;
}

/**
 * @returns {string}
 * @public
 */
function getTimezoneAbbr () {
  return this.getTimezoneInfo().abbr;
}

/**
 * @returns {string}
 * @public
 */
function getTimezoneName () {
  return this.timezone;
}

/**
 * @returns {string}
 * @public
 */
function getTimezoneOffset () {
  return this.getTimezoneInfo().offset;
}

/**
 * TBD
 */
function getYear () {
  return this.date[0];
}

/**
 * @returns {number}
 * @public
 */
function getWeekYear () {
  if (this.invalid) {
    return NaN;
  }

  const localeData = getLocaleData();
  const thursdayIndex = localeData.mondayFirst ? 3 : 4;

  const currentWeekThursday = this.clone()
    .setDayOfWeek(thursdayIndex);

  const firstYearThursday = currentWeekThursday.clone()
    .setStartOfYear()
    .setDayOfMonth(localeData.mondayFirst ? 4 : 3)
    .setDayOfWeek(thursdayIndex);

  return firstYearThursday.getYear();
}

/**
 * @returns {number}
 * @public
 */
function getISOWeekYear () {
  if (this.invalid) {
    return NaN;
  }

  const currentWeekThursday = this.clone()
    .setISODayOfWeek(4);

  const firstYearThursday = currentWeekThursday.clone()
    .setStartOfYear()
    .setDayOfMonth(4)
    .setISODayOfWeek(4);

  return firstYearThursday.getYear();
}

/**
 * TBD
 */
function getQuarter () {
  return ((this.getMonth() - 1) / 3 | 0) + 1;
}

/**
 * TBD
 * @public
 */
function getMonth () {
  return this.date[1];
}

/**
 * @returns {number}
 * @public
 */
function getWeekOfYear () {
  if (this.invalid) {
    return NaN;
  }

  const AVERAGE_WEEK_MS = 604800000; // 7 * 24 * 3600 * 1000

  const localeData = getLocaleData();
  const thursdayIndex = localeData.mondayFirst ? 3 : 4;

  const currentWeekThursday = this.clone()
    .setDayOfWeek(thursdayIndex);

  const firstYearThursday = currentWeekThursday.clone()
    .setStartOfYear()
    .setDayOfMonth(localeData.mondayFirst ? 4 : 3)
    .setDayOfWeek(thursdayIndex);

  return Math.round((currentWeekThursday - firstYearThursday) / AVERAGE_WEEK_MS) + 1;
}

/**
 * @returns {number}
 * @public
 */
function getISOWeekOfYear () {
  if (this.invalid) {
    return NaN;
  }

  const AVERAGE_WEEK_MS = 604800000; // 7 * 24 * 3600 * 1000

  const currentWeekThursday = this.clone()
    .setISODayOfWeek(4);

  const firstYearThursday = currentWeekThursday.clone()
    .setStartOfYear()
    .setDayOfMonth(4)
    .setISODayOfWeek(4);

  return Math.round((currentWeekThursday - firstYearThursday) / AVERAGE_WEEK_MS) + 1;
}

/**
 * @returns {number}
 * @public
 */
function getDayOfYear () {
  const year = this.getYear();
  let month = this.getMonth();
  let day = 0;

  while (--month > 0) {
    day = day + calcDaysInMonth(month, year);
  }

  return day + this.getDayOfMonth();
}

/**
 * TBD
 * @public
 */
function getDayOfMonth () {
  return this.date[2];
}

/**
 * TBD
 * @public
 */
function getDayOfWeek () {
  const localeData = getLocaleData();

  return calcDayOfWeek(this, false, localeData.mondayFirst);
}

/**
 * @returns {number}
 * @public
 */
function getISODayOfWeek () {
  return calcDayOfWeek(this, false, true) + 1;
}

/**
 * TBD
 * @public
 */
function getHour () {
  return this.date[3];
}

/**
 * @public
 */
function getHourMeridiem () {
  const hour = this.getHour();
  if (hour === 0) {
    return 12;
  }
  if (hour > 12) {
    return hour - 12;
  }

  return hour;
}

/**
 * @returns {string}
 * @public
 */
function getMeridiem () {
  const hour = this.getHour();
  return hour < 12 ? 'am' : 'pm';
}

/**
 * TBD
 * @public
 */
function getMinute () {
  return this.date[4];
}

/**
 * TBD
 * @public
 */
function getSecond () {
  return this.date[5];
}

/**
 * TBD
 * @public
 */
function getMillisecond () {
  return this.date[6];
}

/**
 * TBD
 * @public
 */
function getTime () {
  return this.timestamp;
}

/**
 * TBD
 * @public
 */
function getUnixTimestamp () {
  const timestamp = this.timestamp / 1000;
  if (timestamp >= 0) {
    return timestamp | 0;
  }

  return Math.floor(timestamp);
}

/**
 * Returns UTC year
 * @returns {number}
 * @public
 */
function getUTCYear () {
  return getDateUTCAttributes(this)[0];
}

/**
 * Returns UTC month
 * @returns {number} UTC month from 1 to 12
 * @public
 */
function getUTCMonth () {
  return getDateUTCAttributes(this)[1];
}

/**
 * TBD
 * @public
 */
function getUTCDayOfWeek () {
  return calcDayOfWeek(this, true, getLocaleData().mondayFirst);
}

/**
 * Returns UTC day of month
 * @returns {number} UTC day of month from 1 to 31
 * @public
 */
function getUTCDayOfMonth () {
  return getDateUTCAttributes(this)[2];
}

/**
 * Returns UTC hour
 * @returns {number} UTC hour from 0 to 23
 * @public
 */
function getUTCHour () {
  return getDateUTCAttributes(this)[3];
}

/**
 * Returns UTC minute
 * @returns {number} UTC minute from 0 to 59
 * @public
 */
function getUTCMinute () {
  return getDateUTCAttributes(this)[4];
}

/**
 * Returns UTC second
 * @returns {number} UTC second from 0 to 59
 * @public
 */
function getUTCSecond () {
  return getDateUTCAttributes(this)[5];
}

/**
 * Returns UTC millisecond
 * @returns {number} UTC millisecond from 0 to 999
 * @public
 */
function getUTCMillisecond () {
  const utc = getDateUTCAttributes(this);
  return utc[6];
}

/**
 * ----------------------------------------------------------------------------------------
 * Setters
 * ----------------------------------------------------------------------------------------
 */

/**
 * @param {number} timestamp
 * @returns {DateTime}
 * @public
 */
function setTime (timestamp) {
  // Timestamp
  this.timestamp = timestamp;
  // Local timezone info
  this.tzrule = getTzrule(timestamp, this.tzdata);
  // UTC date attributes
  this.utc = null;
  // Date attributes
  this.date = timestampToDate(this.timestamp, this.tzrule);

  return this;
}

/**
 * TBD
 * @param {Week} week
 * @public
 */
function setWeek (week) {
  if (!isNumber(week)) {
    throw new Error('Invalid parameter');
  }

  return this.setDayOfMonth(this.getDayOfMonth() + (week - this.getWeekOfYear()) * 7);
}

/**
 * TBD
 * @param {number} month
 * @public
 */
function setMonth (month) {
  setDateAttribute(this, 1, month);
  return this;
}

/**
 * TBD
 * @param year {number}
 * @public
 */
function setYear (year) {
  setDateAttribute(this, 0, year);

  return this;
}

/**
 * TBD
 * @param {number} dayOfWeek
 * @public
 */
function setDayOfWeek (dayOfWeek) {
  const mondayFirst = getLocaleData().mondayFirst;
  _setDayOfWeek(this, dayOfWeek, mondayFirst);

  return this;
}

/**
 * TBD
 * @param {number} dayOfWeek
 * @public
 */
function setISODayOfWeek (dayOfWeek) {
  _setDayOfWeek(this, dayOfWeek - 1, true);

  return this;
}

/**
 * TBD
 * @param dayOfMonth {number}
 * @public
 */
function setDayOfMonth (dayOfMonth) {
  setDateAttribute(this, 2, dayOfMonth);
  return this;
}

/**
 * TBD
 * @param hour {number}
 * @public
 */
function setHour (hour) {
  setDateAttribute(this, 3, hour);
  return this;
}

/**
 * TBD
 * @param minute {number}
 * @public
 */
function setMinute (minute) {
  setDateAttribute(this, 4, minute);

  return this;
}

/**
 * TBD
 * @param second {number}
 * @public
 */
function setSecond (second) {
  setDateAttribute(this, 5, second);

  return this;
}

/**
 * TBD
 * @param ms {number}
 * @public
 */
function setMillisecond (ms) {
  setDateAttribute(this, 6, ms);

  return this;
}

/**
 * TBD
 * @param year {number}
 * @public
 */
function setUTCYear (year) {
  setDateUTCAttribute(this, 0, year);
  return this;
}

/**
 * TBD
 * @param month {number}
 * @public
 */
function setUTCMonth (month) {
  setDateUTCAttribute(this, 1, month);
  return this;
}

/**
 * TBD
 * @param dayOfWeek {number}
 * @public
 */
function setUTCDayOfWeek (dayOfWeek) {
  const diff = dayOfWeek - this.getUTCDayOfWeek();
  if (diff !== 0) {
    const utcDayOfMonth = getDateUTCAttributes(this)[2];
    setDateUTCAttribute(this, 2, utcDayOfMonth + diff);
  }

  return this;
}

/**
 * TBD
 * @param dayOfMonth {number}
 * @public
 */
function setUTCDayOfMonth (dayOfMonth) {
  setDateUTCAttribute(this, 2, dayOfMonth);

  return this;
}

/**
 * TBD
 * @param hour {number}
 * @public
 */
function setUTCHour (hour) {
  setDateUTCAttribute(this, 3, hour);

  return this;
}

/**
 * TBD
 * @param minute {number}
 * @public
 */
function setUTCMinute (minute) {
  setDateUTCAttribute(this, 4, minute);

  return this;
}

/**
 * Sets the minutes for a specified date according to universal time.
 * @param second {number}
 * @public
 */
function setUTCSecond (second) {
  setDateUTCAttribute(this, 5, second);

  return this;
}

/**
 * Sets the milliseconds for a specified date according to universal time.
 * @param ms {number}
 * @public
 */
function setUTCMillisecond (ms) {
  setDateUTCAttribute(this, 6, ms);

  return this;
}

/**
 * ----------------------------------------------------------------------------------------
 * Manipulations
 * ----------------------------------------------------------------------------------------
 */

/**
 * TBD
 * @param {DateTime} dt
 * @param {Duration} duration
 * @inner
 */
function addDuration (dt, duration) {
  if (duration.isInvalid()) {
    setInvalid(dt);
    return dt;
  }

  const preferLateAmbiguous = isDateAmbiguousLate(dt.timestamp, dt.tzdata);
  const dateAttrs = dt.date;

  // Years
  dateAttrs[0] = dateAttrs[0] + duration.getYears();
  normalizeDayOfMonth(dateAttrs);

  // Months
  dateAttrs[1] = dateAttrs[1] + duration.getMonths();
  normalizeMonth(dateAttrs);
  normalizeDayOfMonth(dateAttrs);

  // Days
  dateAttrs[2] = dateAttrs[2] + duration.getDays();

  normalizeDateAttributes(dateAttrs);

  dt.timestamp = getTimestampFromAttrs(dateAttrs, null, preferLateAmbiguous, dt.tzdata);

  // Hours, minutes, seconds
  dt.timestamp = dt.timestamp + duration.getHours() * HOUR_MS +
    duration.getMinutes() * MINUTE_MS +
    duration.getSeconds() * SECOND_MS;

  dt.tzrule = getTzrule(dt.timestamp, dt.tzdata);
  dt.date = timestampToDate(dt.timestamp, dt.tzrule);
  dt.utc = null;

  return dt;
}

/**
 * TBD
 * @param {DateTime} inst
 * @param {Interval} interval
 * @inner
 */
function addInterval (inst, interval) {
  const value = interval.valueOf();
  if (!isFinite(value)) {
    return setInvalid(inst);
  }
  return addTime(inst, value);
}

/**
 * TBD
 * @param {DateTime} inst
 * @param {number} time
 * @inner
 */
function addTime (inst, time) {
  inst.setTime(inst.getTime() + time);
  return inst;
}

/**
 * @param {number|string|Duration} arg
 */
function add (arg) {
  const dt = this;

  // Number
  if (isNumber(arg)) {
    if (!isFinite(arg)) {
      return setInvalid(dt);
    }
    return addTime(dt, arg);
  }

  // Duration string
  if (isString(arg)) {
    return addDuration(dt, new Duration(arg));
  }

  // Duration instance
  if (isDuration(arg)) {
    return addDuration(dt, arg);
  }

  // Interval instance
  if (isInterval(arg)) {
    return addInterval(dt, arg);
  }

  return dt;
}

/**
 * @public
 */
function setStartOfSecond () {
  const dateAttrs = this.date;

  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfMinute () {
  const dateAttrs = this.date;

  dateAttrs[5] = 0; // Second
  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfHour () {
  const dateAttrs = this.date;

  dateAttrs[4] = 0; // Minute
  dateAttrs[5] = 0; // Second
  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfDay () {
  const dateAttrs = this.date;

  dateAttrs[3] = 0; // Hour
  dateAttrs[4] = 0; // Minute
  dateAttrs[5] = 0; // Second
  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfWeek () {
  this.setStartOfDay();
  this.setDayOfWeek(0);

  return this;
}

/**
 * TBD
 */
function setStartOfMonth () {
  const dateAttrs = this.date;

  dateAttrs[2] = 1; // Day
  dateAttrs[3] = 0; // Hour
  dateAttrs[4] = 0; // Minute
  dateAttrs[5] = 0; // Second
  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfYear () {
  const dateAttrs = this.date;

  dateAttrs[1] = 1; // Month
  dateAttrs[2] = 1; // Day
  dateAttrs[3] = 0; // Hour
  dateAttrs[4] = 0; // Minute
  dateAttrs[5] = 0; // Second
  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfSecond () {
  const dateAttrs = this.date;

  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfMinute () {
  const dateAttrs = this.date;

  dateAttrs[5] = 59; // Second
  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfHour () {
  const dateAttrs = this.date;

  dateAttrs[4] = 59; // Minute
  dateAttrs[5] = 59; // Second
  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfDay () {
  const dateAttrs = this.date;

  dateAttrs[3] = 23; // Hour
  dateAttrs[4] = 59; // Minute
  dateAttrs[5] = 59; // Second
  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfWeek () {
  this.setEndOfDay();
  this.setDayOfWeek(6);

  return this;
}

/**
 * TBD
 */
function setEndOfMonth () {
  const dateAttrs = this.date;
  const year = this.date[0];
  const month = this.date[1];

  dateAttrs[2] = calcDaysInMonth(month, year); // Day
  dateAttrs[3] = 23; // Hour
  dateAttrs[4] = 59; // Minute
  dateAttrs[5] = 59; // Second
  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfYear () {
  const dateAttrs = this.date;

  dateAttrs[1] = 12; // Month
  dateAttrs[2] = 31; // Day
  dateAttrs[3] = 23; // Hour
  dateAttrs[4] = 59; // Minute
  dateAttrs[5] = 59; // Second
  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * @param {DateTime} dt
 * @public
 */
function isEqual (dt) {
  return this.valueOf() === dt.valueOf() &&
    this.getTimezoneName() === dt.getTimezoneName() &&
    this.getMillisecond() === dt.getMillisecond() &&
    this.getSecond() === dt.getSecond() &&
    this.getMinute() === dt.getMinute() &&
    this.getHour() === dt.getHour() &&
    this.getDayOfMonth() === dt.getDayOfMonth() &&
    this.getMonth() === dt.getMonth() &&
    this.getYear() === dt.getYear();
}

/**
 * ----------------------------------------------------------------------------------------
 * Formatting
 * ----------------------------------------------------------------------------------------
 */

/**
 * @param {string} formatStr
 * @param {string} [localeName]
 * @public
 */
function format (formatStr, localeName) {
  if (this.invalid) {
    return 'Invalid date';
  }

  return formatDate(this, formatStr, localeName);
}

/**
 * @returns {Day}
 */
function toDay () {
  return new Day(this);
}

/**
 * @returns {Hour}
 */
function toHour () {
  return new Hour(this);
}

/**
 * @returns {Minute}
 */
function toMinute () {
  return new Minute(this);
}

/**
 * @returns {Month}
 */
function toMonth () {
  return new Month(this);
}

/**
 * @returns {MonthWeeks}
 */
function toMonthWeeks () {
  return new MonthWeeks(this);
}

/**
 * @returns {Second}
 */
function toSecond () {
  return new Second(this);
}

/**
 * @returns {Week}
 */
function toWeek () {
  return new Week(this);
}

/**
 * @returns {Year}
 */
function toYear () {
  return new Year(this);
}

/**
 * TBD
 */
function toString () {
  if (this.invalid) {
    return 'Invalid date';
  }

  // @TODO Add "GMT" to format
  const res = formatDate(this, FORMAT_RFC822, 'en');
  const parts = res.split(' ');
  const abbr = parts.pop();
  const tz = parts.pop();

  return `${parts.join(' ')} GMT${tz} ${abbr}`;
}

/**
 * TBD
 */
function toUTCString () {
  if (this.invalid) {
    return 'Invalid date';
  }

  return formatDateUTC(this);
}

/**
 * TBD
 */
function toLocaleString () {
  if (this.invalid) {
    return 'Invalid date';
  }

  const locale = getLocaleData();
  const formatStr = locale.formats[0];

  return formatDate(this, formatStr, null);
}

/**
 * TBD
 */
function toISOString () {
  if (this.invalid) {
    return 'Invalid date';
  }

  return formatDateISO(this);
}

/**
 * ------------------------------------------------------------------------------------
 * New instances from existing
 * ------------------------------------------------------------------------------------
 */

/**
 * TBD
 */
function toEndOfYear () {
  return this.clone().setEndOfYear();
}

/**
 * TBD
 */
function toEndOfMonth () {
  return this.clone().setEndOfMonth();
}

/**
 * TBD
 */
function toEndOfWeek () {
  return this.clone().setEndOfWeek();
}

/**
 * TBD
 */
function toEndOfDay () {
  return this.clone().setEndOfDay();
}

/**
 * TBD
 */
function toEndOfHour () {
  return this.clone().setEndOfHour();
}

/**
 * TBD
 */
function toEndOfMinute () {
  return this.clone().setEndOfMinute();
}

/**
 * TBD
 */
function toEndOfSecond () {
  return this.clone().setEndOfSecond();
}

/**
 * TBD
 */
function toStartOfYear () {
  return this.clone().setStartOfYear();
}

/**
 * TBD
 */
function toStartOfMonth () {
  return this.clone().setStartOfMonth();
}

/**
 * TBD
 */
function toStartOfWeek () {
  return this.clone().setStartOfWeek();
}

/**
 * TBD
 */
function toStartOfDay () {
  return this.clone().setStartOfDay();
}

/**
 * TBD
 */
function toStartOfHour () {
  return this.clone().setStartOfHour();
}

/**
 * TBD
 */
function toStartOfMinute () {
  return this.clone().setStartOfMinute();
}

/**
 * TBD
 */
function toStartOfSecond () {
  return this.clone().setStartOfSecond();
}

/**
 * ----------------------------------------------------------------------------------------
 * Miscellaneous
 * ----------------------------------------------------------------------------------------
 */

// @TODO pass timezone
function clone () {
  return new DateTime(this);
}

/**
 * @public
 */
function getUTCOffset () {
  return -this.getTimezoneOffset() / 60000;
}

/**
 * @returns {Boolean}
 * @public
 */
function isDST () {
  return this.getTimezoneInfo().dst;
}

/**
 * @returns {Boolean}
 * @public
 */
function isInvalid () {
  return this.invalid;
}

/**
 * @returns {boolean}
 * @public
 */
function isToday () {
  return isDateTimeToday(this);
}

/**
 * @returns {boolean}
 * @public
 */
function isWeekend () {
  return isDateTimeWeekend(this, getLocaleData());
}

/**
 * @returns {Boolean}
 * @public
 */
function isValid () {
  return !this.invalid;
}

/**
 * TBD
 * @public
 */
function valueOf () {
  return this.timestamp;
}

/**
 * @returns {string}
 * @public
 */
function toJSON () {
  return this.toISOString();
}

/**
 * ------------------------------------------------------------------------------------
 * Expose public API
 * ------------------------------------------------------------------------------------
 */

extend(DateTime, {
  defineLocale,
  getDefaultTimezone,
  getLocale,
  isDateTime,
  isDay,
  isDuration,
  isHour,
  isInterval,
  isLeapYear,
  isMinute,
  isMonth,
  isMonthWeeks,
  isSecond,
  isWeek,
  isYear,
  now,
  setDefaultTimezone,
  setLocale,
  setNow,
  setTzdata
});

DateTime.prototype = {
  add,
  clone,
  format,
  getDayOfMonth,
  getDayOfWeek,
  getDayOfYear,
  getHour,
  getHourMeridiem,
  getISODayOfWeek,
  getISOWeekOfYear,
  getISOWeekYear,
  getMeridiem,
  getMillisecond,
  getMinute,
  getMonth,
  getQuarter,
  getSecond,
  getTime,
  getTimezoneAbbr,
  getTimezoneInfo,
  getTimezoneName,
  getTimezoneOffset,
  getUnixTimestamp,
  getUTCDayOfMonth,
  getUTCDayOfWeek,
  getUTCHour,
  getUTCMillisecond,
  getUTCMinute,
  getUTCMonth,
  getUTCOffset,
  getUTCSecond,
  getUTCYear,
  getWeekOfYear,
  getWeekYear,
  getYear,
  isDST,
  isEqual,
  isInvalid,
  isToday,
  isValid,
  isWeekend,
  setDayOfMonth,
  setDayOfWeek,
  setEndOfDay,
  setEndOfHour,
  setEndOfMinute,
  setEndOfMonth,
  setEndOfSecond,
  setEndOfWeek,
  setEndOfYear,
  setHour,
  setISODayOfWeek,
  setMillisecond,
  setMinute,
  setMonth,
  setSecond,
  setStartOfDay,
  setStartOfHour,
  setStartOfMinute,
  setStartOfMonth,
  setStartOfSecond,
  setStartOfWeek,
  setStartOfYear,
  setTime,
  setUTCDayOfMonth,
  setUTCDayOfWeek,
  setUTCHour,
  setUTCMillisecond,
  setUTCMinute,
  setUTCMonth,
  setUTCSecond,
  setUTCYear,
  setWeek,
  setYear,
  toDay,
  toEndOfDay,
  toEndOfHour,
  toEndOfMinute,
  toEndOfMonth,
  toEndOfSecond,
  toEndOfWeek,
  toEndOfYear,
  toHour,
  toISOString,
  toJSON,
  toLocaleString,
  toMinute,
  toMonth,
  toMonthWeeks,
  toSecond,
  toStartOfDay,
  toStartOfHour,
  toStartOfMinute,
  toStartOfMonth,
  toStartOfSecond,
  toStartOfWeek,
  toStartOfYear,
  toString,
  toUTCString,
  toWeek,
  toYear,
  valueOf
};

DateTime.prototype.constructor = DateTime;

export default DateTime;
