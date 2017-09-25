/**
 * datetime2
 * Version: 2.0.4
 * Author: Dmitry Shimkin <dmitryshimkin@gmail.com>
 * License: MIT
 * https://github.com/datetime-js/datetime
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.DateTime = factory());
}(this, (function () { 'use strict';

/**
 * -------------------------------------------------------------------------------------
 * Constants
 * -------------------------------------------------------------------------------------
 */

/** {number} Year of the Unix Epoch beginning */
var EPOCH_START = 1970;

/** {number} */
var SECOND_MS = 1000;

/** {number} */
var MINUTE_MS = 60 * SECOND_MS;

/** {number} */
var HOUR_MS = 60 * MINUTE_MS;

/** {number} */
var DAY_MS = 24 * HOUR_MS;

/** {number} */
var YEAR_MS = 365 * DAY_MS;

/** {number} */
var LEAP_YEAR_MS = 366 * DAY_MS;

/** {number} */
var MONTH_MS = 30.5 * DAY_MS;

/** {Array.<number>} */
var MONTH_POINTS = [0];

/** {Array.<number>} */
var LEAP_MONTH_POINTS = [0];

/** {string} */
var FORMAT_RFC822 = 'ddd MMM DD YYYY HH:mm:ss ZZ (zz)';

/** {number} */
var MIN_TIMESTAMP_VALUE = -9007199254740992;

/** {number} */
var MAX_TIMESTAMP_VALUE = 9007199254740992;

/** {string} */
var E_INVALID_ARGUMENT = 'E_INVALID_ARGUMENT';

/** {string} */
var E_INVALID_ATTRIBUTE = 'E_INVALID_ATTRIBUTE';

/** {string} */
var E_INVALID_INTERVAL_END = 'E_INVALID_INTERVAL_END';

/** {string} */
var E_INVALID_INTERVAL_ORDER = 'E_INVALID_INTERVAL_ORDER';

/** {string} */
var E_INVALID_INTERVAL_START = 'E_INVALID_INTERVAL_START';

/** {string} */
var E_PARSE_FORMAT = 'E_PARSE_FORMAT';

/** {string} */
var E_PARSE_ISO = 'E_PARSE_ISO';

/** {string} */
var E_RANGE = 'E_RANGE';

/** {Object} */
var message = {};
message[E_INVALID_ARGUMENT] = function (arg) { return arg + " is not a valid argument. Argument must be a string, " +
    'or a number, or an array, or another instance of DateTime'; };
message[E_INVALID_ATTRIBUTE] = function () { return 'At least one of the given date attributes is not a valid number'; };
message[E_INVALID_INTERVAL_END] = function (arg) { return ("Interval end \"" + arg + "\" cannot be parsed as a datetime"); };
message[E_INVALID_INTERVAL_ORDER] = function (arg) { return 'Interval end cannot be earlier than interval start'; };
message[E_INVALID_INTERVAL_START] = function (arg) { return ("Interval start \"" + arg + "\" cannot not parsed as a datetime"); };
message[E_PARSE_FORMAT] = function (dateStr, format) { return ("String \"" + dateStr + "\" does not match to the given \"" + format + "\" format"); };
message[E_PARSE_ISO] = function (dateStr) { return ("String \"" + dateStr + "\" is not a valid ISO-8601 date"); };
message[E_RANGE] = function (arg) { return "Timestamp " + arg + " is too big. It must be in a range of " +
    '-9,007,199,254,740,992 to 9,007,199,254,740,992'; };

var value;
var prev;
var next;

var monthDaysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

for (var month = 1; month < 12; month++) {
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

function parseArg (arg) {
  return new DateTime$2(arg);
}

/**
 * @name Interval
 * @param {DateTime|string|number} start
 * @param {DateTime|string|number} end
 * @class
 */
function Interval (start, end) {
  var dtstart = parseArg(start);
  var dtend = parseArg(end);

  this._start = dtstart;
  this._end = dtend;

  if (dtstart.isInvalid() || dtend.isInvalid()) {
    var msg = dtstart.isInvalid()
      ? message[E_INVALID_INTERVAL_START](start)
      : message[E_INVALID_INTERVAL_END](end);

    warn(msg);
    setInvalid$1(this);

    return;
  }

  if (dtstart > dtend) {
    warn(message[E_INVALID_INTERVAL_ORDER]());
    setInvalid$1(this);

    return;
  }

  this._invalid = false;
}

/**
 * ----------------------------------------------------------------------------------------
 * Private methods
 * ----------------------------------------------------------------------------------------
 */

function isStartOfDay (dt) {
  return dt.isEqual(dt.toStartOfDay());
}

/**
 * @param {Interval} interval
 * @inner
 */
function setInvalid$1 (interval) {
  interval._invalid = true;
}

/**
 * ----------------------------------------------------------------------------------------
 * Public methods
 * ----------------------------------------------------------------------------------------
 */

/**
 * @param {string} formatStr
 * @returns {string}
 * @public
 */
function format$1 (formatStr) {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return ((this._start.format(formatStr)) + " – " + (this._end.format(formatStr)));
}

/**
 * @returns {number}
 * @public
 */
function getDuration () {
  return this._end - this._start;
}

/**
 * @param {Interval} interval
 * @returns {Interval|Null}
 * @public
 */
function getIntersection (interval) {
  var start = this._start > interval._start ? this._start : interval._start;
  var end = this._end < interval._end ? this._end : interval._end;

  if (start >= end) {
    return null;
  }

  return new Interval(start, end);
}

/**
 * @param {Interval|DateTime|number} arg
 * @returns {boolean}
 * @public
 */
function includes (arg) {
  if (isInterval(arg)) {
    return includesInterval(this, arg);
  }

  if (isDateTime(arg)) {
    return includesDateTime(this, arg);
  }

  if (isNumber(arg)) {
    return includesTimestamp(this, arg);
  }

  throw new Error('Wrong argument');
}

/**
 * @returns {boolean}
 */
function includesInterval (intervalA, intervalB) {
  return intervalA._start <= intervalB._start && intervalA._end >= intervalB._end;
}

/**
 * @param {Interval} interval
 * @param {DateTime} dt
 * @returns {boolean}
 */
function includesDateTime (interval, dt) {
  return interval._start <= dt && interval._end >= dt;
}

/**
 * @param {Interval} interval
 * @param {number} timestamp
 * @returns {boolean}
 */
function includesTimestamp (interval, timestamp) {
  return interval._start <= timestamp && interval._end >= timestamp;
}

/**
 * @param {Interval} interval
 * @returns {boolean}
 * @public
 */
function intersects (interval) {
  var start = this._start > interval._start ? this._start : interval._start;
  var end = this._end < interval._end ? this._end : interval._end;

  return end > start;
}

/**
 * @public
 */
function isEqual$1 (interval) {
  return this._start.isEqual(interval.toStart()) &&
    this._end.isEqual(interval.toEnd());
}

/**
 * @returns {boolean}
 * @public
 */
function isInvalid$1 () {
  return this._invalid;
}

/**
 * @returns {boolean}
 * @public
 */
function isValid$1 () {
  return !this._invalid;
}

/**
 * @public
 */
function shift () {
  // @TBI
}

/**
 * @returns {DateTime}
 * @public
 */
function toEnd () {
  return this._end.clone();
}

/**
 * @public
 */
function toIntersectingDays () {
  var intervalStart = this._start;
  var intervalEnd = this._end;

  var days = [];

  var day = intervalStart.toDay();

  do {
    days.push(day);
    day = day.toNext();
  } while (day.toStart() < intervalEnd);

  return days;
}

/**
 * @public
 */
function toIncludingDays () {
  var intervalStart = this._start;
  var intervalEnd = this._end;

  var days = [];

  var day = intervalStart.toDay();
  if (!isStartOfDay(intervalStart)) {
    day = day.toNext();
  }

  while (day.toEnd() <= intervalEnd) {
    days.push(day);
    day = day.toNext();
  }

  return days;
}

/**
 * @returns {string}
 * @public
 */
function toISOString$1 () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return ((this._start.toISOString()) + " – " + (this._end.toISOString()));
}

/**
 * @public
 */
function toJSON$1 () {
  return this.toString();
}

/**
 * @public
 */
function toLocaleString$1 () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return ((this._start.toLocaleString()) + " – " + (this._end.toLocaleString()));
}

/**
 * @public
 */
function toPeriod () {
  // @TBI
}

/**
 * @returns {DateTime}
 * @public
 */
function toStart () {
  return this._start.clone();
}

/**
 * @returns {string}
 * @public
 */
function toString$1 () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return ((this._start.toString()) + " – " + (this._end.toString()));
}

/**
 * @returns {string}
 * @public
 */
function toUTCString$1 () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return ((this._start.toUTCString()) + " – " + (this._end.toUTCString()));
}

/**
 * @param {Interval} interval
 * @returns {Interval}
 * @public
 */
function union (interval) {
  var start = this._start < interval._start ? this._start : interval._start;
  var end = this._end > interval._end ? this._end : interval._end;

  return new Interval(start, end);
}

/**
 * @public
 */
function valueOf$1 () {
  return this.getDuration();
}

/**
 * ----------------------------------------------------------------------------------------
 * Expose API
 * ----------------------------------------------------------------------------------------
 */

extend(Interval.prototype, {
  format: format$1,
  getDuration: getDuration,
  getIntersection: getIntersection,
  includes: includes,
  intersects: intersects,
  isEqual: isEqual$1,
  isInvalid: isInvalid$1,
  isValid: isValid$1,
  shift: shift,
  toEnd: toEnd,
  toIncludingDays: toIncludingDays,
  toIntersectingDays: toIntersectingDays,
  toISOString: toISOString$1,
  toJSON: toJSON$1,
  toLocaleString: toLocaleString$1,
  toPeriod: toPeriod,
  toStart: toStart,
  toString: toString$1,
  toUTCString: toUTCString$1,
  union: union,
  valueOf: valueOf$1
});

/**
 * @param {DateTime} dt
 * @class
 * @abstract
 */
function ACalendar (dt) {
}

inherit(Interval, ACalendar);

/**
 * ----------------------------------------------------------------------------------------
 * Private methods
 * ----------------------------------------------------------------------------------------
 */

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 * @returns {DateTime}
 * @inner
 */
function parseArgument (dt, timezone) {
  var argsCount = arguments.length;

  if (argsCount === 0) {
    return new DateTime$2();
  }

  if (argsCount === 1) {
    return new DateTime$2(dt);
  }

  return new DateTime$2(dt, timezone);
}

/**
 * ----------------------------------------------------------------------------------------
 * Public methods
 * ----------------------------------------------------------------------------------------
 */

/**
 * @returns {Day}
 * @public
 */
function toNext () {
  var dt = this._end.clone();
  dt.add(1);
  return new this.constructor(dt);
}

/**
 * @returns {Day}
 * @public
 */
function toPrev () {
  var dt = this._start.clone();
  dt.setTime(dt - 1);
  return new this.constructor(dt);
}

/**
 * ----------------------------------------------------------------------------------------
 * Expose API
 * ----------------------------------------------------------------------------------------
 */

extend(ACalendar.prototype, {
  toNext: toNext,
  toPrev: toPrev
});

/**
 * @name Month
 * @class
 */
function Month () {
  init$4.apply(this, arguments);
}

inherit(ACalendar, Month);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init$4 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfMonth();

  this._end = this._start.clone();
  this._end.setMonth(this._start.getMonth() + 1);
}

/**
 * @returns {Array<Day>}
 * @public
 */
function toDays () {
  var days = [];
  var dtend = this.toEnd();

  var day = new Day(this.toStart());
  var count = 31;

  while (count--) {
    if (day.toEnd() > dtend) {
      break;
    }

    days.push(day);
    day = day.toNext();
  }

  return days;
}

extend(Month.prototype, {
  getMonth: getMonth$1,
  getYear: getYear$1,
  toDays: toDays
});

/**
 * @name Week
 * @class
 */
function Week () {
  init$6.apply(this, arguments);
}

inherit(ACalendar, Week);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init$6 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfWeek();

  this._end = this._start.clone();
  this._end.setDayOfMonth(this._start.getDayOfMonth() + 7);
}

/**
 * @returns {Array<Day>}
 * @public
 */
function toDays$1 () {
  var days = [];

  var day = new Day(this.toStart());
  var count = 7;

  while (count--) {
    days.push(day);
    day = day.toNext();
  }

  return days;
}

extend(Week.prototype, {
  getWeekOfYear: getWeekOfYear$1,
  toDays: toDays$1
});

/**
 * @name MonthWeeks
 * @class
 */
function MonthWeeks () {
  init$5.apply(this, arguments);
}

inherit(ACalendar, MonthWeeks);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init$5 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);

  this._end = this._start.clone();

  this._start
    .setStartOfMonth()
    .setStartOfWeek();

  this._end
    .setEndOfMonth()
    .setEndOfWeek()
    .add(1);
}

/**
 * @returns {Array<Week>}
 * @public
 */
function toWeeks () {
  var weeks = [];
  var dtend = this.toEnd();

  var week = new Week(this.toStart());
  var count = 6;

  while (count--) {
    if (week.toEnd() > dtend) {
      break;
    }

    weeks.push(week);
    week = week.toNext();
  }

  return weeks;
}

extend(MonthWeeks.prototype, { toWeeks: toWeeks });

/**
 * @name Year
 * @class
 */
function Year () {
  init$7.apply(this, arguments);
}

inherit(ACalendar, Year);

/**
 * @param {DateTime|string|number|Array.<number>} dt
 * @param {string} [timezone]
 */
function init$7 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfYear();

  this._end = this._start.clone();
  this._end.setYear(this._start.getYear() + 1);
}

/**
 * @returns {Array.<Month>}
 * @public
 */
function toMonths () {
  var count = 12;
  var months = [];

  var month = new Month(this.toStart());

  while (count--) {
    months.push(month);
    month = month.toNext();
  }

  return months;
}

/**
 * @returns {Array.<MonthWeeks>}
 * @public
 */
function toMonthWeeks$2 () {
  var count = 12;
  var monthWeeksList = [];

  var monthWeeks = new MonthWeeks(this.toStart());

  while (count--) {
    monthWeeksList.push(monthWeeks);
    monthWeeks = monthWeeks.toNext();
  }

  return monthWeeksList;
}

extend(Year.prototype, {
  getYear: getYear$1,
  isLeap: isLeap,
  toMonths: toMonths,
  toMonthWeeks: toMonthWeeks$2
});

var ISO_DAY_FORMAT = 'YYYY-MM-DD';

/**
 * @returns {number}
 */
function getDayOfWeek$1 () {
  return this._start.getDayOfWeek();
}

/**
 * @returns {number}
 */
function getDayOfMonth$1 () {
  return this._start.getDayOfMonth();
}

/**
 * @returns {number}
 */
function getHour$1 () {
  return this._start.getHour();
}

/**
 * @returns {number}
 */
function getISODayOfWeek$1 () {
  return this._start.getISODayOfWeek();
}

/**
 * @returns {number}
 */
function getMinute$1 () {
  return this._start.getMinute();
}

/**
 * @returns {number}
 */
function getMonth$1 () {
  return this._start.getMonth();
}

/**
 * @returns {number}
 */
function getSecond$1 () {
  return this._start.getSecond();
}

/**
 * @returns {number}
 */
function getWeekOfYear$1 () {
  return this._start.getWeekOfYear();
}

/**
 * @returns {number}
 */
function getYear$1 () {
  return this._start.getYear();
}

/**
 * @returns {boolean}
 */
function isToday$1 () {
  return isDateTimeToday(this._start);
}

/**
 * @returns {boolean}
 */
function isLeap () {
  return isLeapYear(this._start.getYear());
}

/**
 * @returns {boolean}
 */
function isWeekend$1 () {
  return isDateTimeWeekend(this._start, getLocaleData());
}

/**
 * @returns {Day}
 */


/**
 * @returns {Day}
 */
function toDayISOString () {
  return this._start.format(ISO_DAY_FORMAT);
}

/**
 * @returns {Month}
 */
function toMonth$1 () {
  return new Month(this._start);
}

/**
 * @returns {MonthWeeks}
 */
function toMonthWeeks$1 () {
  return new MonthWeeks(this._start);
}

/**
 * @returns {Week}
 */
function toWeek$1 () {
  return new Week(this._start);
}

/**
 * @returns {Year}
 */
function toYear$1 () {
  return new Year(this._start);
}

function Second () {
  init$3.apply(this, arguments);
}

inherit(ACalendar, Second);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init$3 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfSecond();

  this._end = this._start.clone();
  this._end.setSecond(this._start.getSecond() + 1);
}

extend(Second.prototype, {
  getDayOfMonth: getDayOfMonth$1,
  getDayOfWeek: getDayOfWeek$1,
  getHour: getHour$1,
  getISODayOfWeek: getISODayOfWeek$1,
  getMinute: getMinute$1,
  getMonth: getMonth$1,
  getSecond: getSecond$1,
  getYear: getYear$1
});

function Minute () {
  init$2.apply(this, arguments);
}

inherit(ACalendar, Minute);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init$2 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfMinute();

  this._end = this._start.clone();
  this._end.setMinute(this._start.getMinute() + 1);
}

/**
 * @returns {Array.<Second>}
 * @public
 */
function toSeconds () {
  var minuteEnd = this.toEnd();
  var seconds = [];

  var second = new Second(this.toStart());

  // Number of seconds in a minute
  var count = 60;

  while (count--) {
    seconds.push(second);
    second = second.toNext();
  }

  return seconds;
}

extend(Minute.prototype, {
  getDayOfMonth: getDayOfMonth$1,
  getDayOfWeek: getDayOfWeek$1,
  getHour: getHour$1,
  getISODayOfWeek: getISODayOfWeek$1,
  getMinute: getMinute$1,
  getMonth: getMonth$1,
  getYear: getYear$1,
  toSeconds: toSeconds
});

function Hour () {
  init$1.apply(this, arguments);
}

inherit(ACalendar, Hour);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init$1 (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfHour();

  this._end = this._start.clone();
  this._end.add(HOUR_MS);
}

/**
 * @returns {Array.<Minute>}
 * @public
 */
function toMinutes () {
  var hourEnd = this.toEnd();
  var minutes = [];

  var minute = new Minute(this.toStart());

  // Number of minutes in a hour
  var count = 60;

  while (count--) {
    minutes.push(minute);
    minute = minute.toNext();
  }

  return minutes;
}

extend(Hour.prototype, {
  getDayOfMonth: getDayOfMonth$1,
  getDayOfWeek: getDayOfWeek$1,
  getHour: getHour$1,
  getISODayOfWeek: getISODayOfWeek$1,
  getMonth: getMonth$1,
  getYear: getYear$1,
  toMinutes: toMinutes
});

/**
 * @class Day
 */
function Day () {
  init.apply(this, arguments);
}

inherit(ACalendar, Day);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfDay();

  this._end = this._start.clone();
  this._end.setDayOfMonth(this._start.getDayOfMonth() + 1);
}

/**
 * @returns {Array.<Day>}
 * @public
 */
function toHours () {
  var hours = [];
  var dayEnd = this.toEnd();

  var hour = new Hour(this.toStart());

  // Maximum possible number of hours in a day
  var count = 48;

  while (count--) {
    if (hour.toEnd() > dayEnd) {
      break;
    }

    hours.push(hour);
    hour = hour.toNext();
  }

  return hours;
}

extend(Day.prototype, {
  getDayOfMonth: getDayOfMonth$1,
  getDayOfWeek: getDayOfWeek$1,
  getISODayOfWeek: getISODayOfWeek$1,
  getMonth: getMonth$1,
  getYear: getYear$1,
  isToday: isToday$1,
  isWeekend: isWeekend$1,
  toDayISOString: toDayISOString,
  toHours: toHours,
  toMonth: toMonth$1,
  toMonthWeeks: toMonthWeeks$1,
  toWeek: toWeek$1,
  toYear: toYear$1
});

var RE_ISO8601 = /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?)?$/;

/**
 * @param {Duration} duration
 * @param {string} str
 * @inner
 */
function createFromString$1 (duration, str) {
  if (!isParsableAsDuration(str)) {
    setInvalid$2(duration);
    return;
  }

  var matches = str.match(RE_ISO8601);
  var sign = Number((matches[1] || '').toString() + '1');

  duration.sign = sign;

  duration.years = toInteger(matches[2]) * sign;
  duration.months = toInteger(matches[3]) * sign;
  duration.days = toInteger(matches[4]) * sign;
  duration.hours = toInteger(matches[6]) * sign;
  duration.minutes = toInteger(matches[7]) * sign;
  duration.seconds = toInteger(matches[8]) * sign;

  duration.invalid = false;
}

/**
 * @param {Duration} duration
 * @inner
 */
function createFromUndefined (duration) {
  duration.sign = 1;

  duration.years = 0;
  duration.months = 0;
  duration.days = 0;
  duration.hours = 0;
  duration.minutes = 0;
  duration.seconds = 0;

  duration.invalid = false;
}

/**
 * @param {string} str
 * @returns {boolean}
 */
function isParsableAsDuration (str) {
  var matches = String(str).match(RE_ISO8601);
  return Boolean(matches && matches[0]);
}

/**
 * @param {Duration} duration
 * @inner
 */
function setInvalid$2 (duration) {
  duration.invalid = true;
}

/**
 * @private
 */
function getDateStr (duration) {
  var dateStr = '';

  if (duration.getYears() !== 0) {
    dateStr = dateStr + (Math.abs(duration.getYears())) + "Y";
  }

  if (duration.getMonths() !== 0) {
    dateStr = dateStr + (Math.abs(duration.getMonths())) + "M";
  }

  if (duration.getDays() !== 0) {
    dateStr = dateStr + (Math.abs(duration.getDays())) + "D";
  }

  return dateStr;
}

/**
 * @private
 */
function getTimeStr (duration) {
  var timeStr = '';

  if (duration.getHours() !== 0) {
    timeStr = timeStr + (Math.abs(duration.getHours())) + "H";
  }

  if (duration.getMinutes() !== 0) {
    timeStr = timeStr + (Math.abs(duration.getMinutes())) + "M";
  }

  if (duration.getSeconds() !== 0) {
    timeStr = timeStr + (Math.abs(duration.getSeconds())) + "S";
  }

  return timeStr;
}

/**
 * @returns {boolean}
 * @public
 */
function isInvalid$2 () {
  return Boolean(this.invalid);
}

/**
 * @returns {string}
 * @public
 */
function toISOString$2 () {
  return this.toString();
}

/**
 * @returns {string}
 * @public
 */
function toString$2 () {
  var timeStr = getTimeStr(this);
  var str = "P" + (getDateStr(this));

  if (timeStr) {
    str = str + "T" + timeStr;
  }

  var sign = this.sign === -1 ? '-' : '';

  return ("" + sign + str);
}

/**
 * @name Duration
 * @param {string} arg
 * @class
 */
function Duration (arg) {
  var duration = this;

  duration.invalid = false;

  if (arg === void 0) {
    createFromUndefined(duration);
    return;
  }

  if (isString(arg)) {
    createFromString$1(duration, arg);
    return;
  }

  setInvalid$2(duration);
}

/**
 * @returns {number}
 * @public
 */
function getYears () {
  return this.years;
}

/**
 * @returns {number}
 * @public
 */
function getMonths () {
  return this.months;
}

/**
 * @returns {number}
 * @public
 */
function getDays () {
  return this.days;
}

/**
 * @returns {number}
 * @public
 */
function getHours () {
  return this.hours;
}

/**
 * @returns {number}
 * @public
 */
function getMinutes () {
  return this.minutes;
}

/**
 * @returns {number}
 * @public
 */
function getSeconds () {
  return this.seconds;
}

extend(Duration, { isParsableAsDuration: isParsableAsDuration });

extend(Duration.prototype, {
  getDays: getDays,
  getHours: getHours,
  getMinutes: getMinutes,
  getMonths: getMonths,
  getSeconds: getSeconds,
  getYears: getYears,
  isInvalid: isInvalid$2,
  toISOString: toISOString$2,
  toString: toString$2
});

var PADDINGS = [
  '',
  '0',
  '00',
  '000'
];

var RE_TRIM = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

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
  var dayIndex = 0;
  var year = date[0];
  var yearsDiff = year - 1970;
  var currYear;
  var idx;

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

    var restDaysInMonth = calcDaysInMonth(date[1], year) - date[2];

    dayIndex = dayIndex - restDaysInMonth - 1;
  }

  return dayIndex;
}

/**
 * @param {Object} tzdata
 * @inner
 */
function getAmbiguousIntervals (tzdata) {
  var intervals = [];

  var offsets = tzdata.offset;
  var untils = tzdata.until;

  for (var idx = 0; idx < untils.length; idx++) {
    var until = untils[idx];
    if (until !== null) {
      var offset = offsets[idx];
      var nextOffset = offsets[idx + 1];
      var hasAmbiguousInterval = offset < nextOffset;

      if (hasAmbiguousInterval) {
        var offsetDiff = (nextOffset - offset) * 60 * 1000;
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
function getTimestampFromAttrs (dateAttrs, offset, preferLateAmbiguous, tzdata) {
  // Timestamp from attributes if they were attributes of UTC date
  var utcTimestamp = utcDateToTimestamp(dateAttrs);

  // If offset is specified, we just use it
  // Otherwise the offset needs to be calculated based on tzdata
  if (isNumber(offset)) {
    return utcTimestamp + offset;
  }

  // Preliminary tzrule, based on UTC timestamp
  var preliminaryTzrule = getTzrule(utcTimestamp, tzdata);

  // Preliminary offset, based on UTC timestamp
  var preliminaryOffset = preliminaryTzrule.offset;

  // Preliminary timestamp, based on UTC timestamp and preliminary offset
  var preliminaryTimestamp = utcTimestamp + preliminaryOffset;

  // Check if the preliminary timestamp is valid for the preliminary timezone rule
  var isPreliminaryTimestampValid = tzruleIncludes(preliminaryTzrule, preliminaryTimestamp);

  if (isPreliminaryTimestampValid) {
    var isAmbiguousEarly = isDateAmbiguousEarly(preliminaryTimestamp, tzdata);
    var isAmbiguousLate = isDateAmbiguousLate(preliminaryTimestamp, tzdata);

    var isAmbiguous = isAmbiguousEarly || isAmbiguousLate;

    if (isAmbiguous) {
      var earlyTzrule = isAmbiguousEarly
        ? preliminaryTzrule
        : getPreviousTzrule(preliminaryTzrule, tzdata);

      var lateTzrule = isAmbiguousEarly
        ? getNextTzrule(preliminaryTzrule, tzdata)
        : preliminaryTzrule;

      var tzrule = preferLateAmbiguous ? lateTzrule : earlyTzrule;

      return utcTimestamp + tzrule.offset;
    }

    return preliminaryTimestamp;
  }

  var preliminaryTzrule2 = getTzrule(preliminaryTimestamp, tzdata);
  var preliminaryOffset2 = preliminaryTzrule2.offset;

  var preliminaryTimestamp2 = utcTimestamp + preliminaryOffset2;

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
  var startTimestamp = 0;
  var startYear = EPOCH_START;

  var ms = startTimestamp;
  var prev;
  var year;

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

  var remainder = timestamp - prev;

  return {
    remainder: remainder,
    year: year
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
function copyArray (arr) {
  var copy = new Array(arr.length);

  for (var idx = 0; idx < copy.length; idx++) {
    copy[idx] = arr[idx];
  }

  return copy;
}

/**
 * @inner
 */
function calcDayOfWeek (dt, useUTC, mondayFirst) {
  var dateAttrs = useUTC ? getDateUTCAttributes(dt) : dt.date;
  var dayIndex = dateToDayIndex(dateAttrs);

  return getDayOfWeekByDayIndex(dayIndex, mondayFirst);
}

/**
 * @inner
 */
function calcDaysInMonth (month, year) {
  var addedYears;

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
function getDateUTCAttributes (dt) {
  if (dt.utc === null) {
    dt.utc = timestampToUTCDate(dt.timestamp);
  }
  return dt.utc;
}

/**
 * @param {string} tzName
 * @inner
 */
function getZoneTzdata (tzName) {
  var zoneTzdata = getTzdata().zones[tzName];
  if (!zoneTzdata.ambiguous) {
    zoneTzdata.ambiguous = getAmbiguousIntervals(zoneTzdata);
  }
  return zoneTzdata;
}

/**
 * @inner
 */
function getTzrule (timestamp, timezoneTzdata) {
  var untils = timezoneTzdata.until;
  var len = untils.length;
  var index = -1;

  for (var idx = 0; idx < len; idx++) {
    if (untils[idx] !== null) {
      if (timestamp >= untils[idx]) {
        index = idx + 1;
      }
    }
  }

  index = index === -1 ? 0 : index;

  var abbr = timezoneTzdata.abbr[index];
  var dst = timezoneTzdata.dst[index];

  var offset = Math.round(timezoneTzdata.offset[index] * 60) * 1000;
  var name = timezoneTzdata.name;

  var starts = index !== 0 ? untils[index - 1] : -Infinity;
  var ends = untils[index] !== null ? untils[index] : Infinity;

  return {
    abbr: abbr,
    dst: dst,
    ends: ends,
    index: index,
    name: name,
    offset: offset,
    starts: starts
  };
}

/**
 *
 */
function getNextTzrule (tzrule, timezoneTzdata) {
  var index = tzrule.index + 1;
  var untils = timezoneTzdata.until;

  var abbr = timezoneTzdata.abbr[index];
  var dst = timezoneTzdata.dst[index];

  var offset = Math.round(timezoneTzdata.offset[index] * 60) * 1000;
  var name = timezoneTzdata.name;

  var starts = index !== 0 ? untils[index - 1] : -Infinity;
  var ends = untils[index] !== null ? untils[index] : Infinity;

  return {
    abbr: abbr,
    dst: dst,
    ends: ends,
    index: index,
    name: name,
    offset: offset,
    starts: starts
  };
}

/**
 * @inner
 */
function getPreviousTzrule (tzrule, timezoneTzdata) {
  var index = tzrule.index - 1;
  var untils = timezoneTzdata.until;

  var abbr = timezoneTzdata.abbr[index];
  var dst = timezoneTzdata.dst[index];

  var offset = Math.round(timezoneTzdata.offset[index] * 60) * 1000;
  var name = timezoneTzdata.name;

  var starts = index !== 0 ? untils[index - 1] : -Infinity;
  var ends = untils[index] !== null ? untils[index] : Infinity;

  return {
    abbr: abbr,
    dst: dst,
    ends: ends,
    index: index,
    name: name,
    offset: offset,
    starts: starts
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
  var intervals = tzdata.ambiguous;
  var idx = intervals.length;

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
function isDateAmbiguousLate (timestamp, tzdata) {
  var intervals = tzdata.ambiguous;
  var idx = intervals.length;

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
function isLeapYear (year) {
  return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isArrayLike (arg) {
  return arg !== null && typeof arg === 'object' && typeof arg.length === 'number';
}

/**
 * @inner
 */
function isDateTime (arg) {
  return arg instanceof DateTime$2;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isDay (arg) {
  return arg instanceof Day;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isDuration (arg) {
  return arg instanceof Duration;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */


/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isHour (arg) {
  return arg instanceof Hour;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isInterval (arg) {
  return arg instanceof Interval;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isMinute (arg) {
  return arg instanceof Minute;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isMonth (arg) {
  return arg instanceof Month;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isMonthWeeks (arg) {
  return arg instanceof MonthWeeks;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isNumber (arg) {
  return typeof arg === 'number';
}

/**
 * @param {DateTime} dt1
 * @param {DateTime} dt2
 * @returns {boolean}
 * @inner
 */
function isSameDay (dt1, dt2) {
  return isSameMonth(dt1, dt2) && dt1.getDayOfMonth() === dt2.getDayOfMonth();
}

/**
 * @param {DateTime} dt1
 * @param {DateTime} dt2
 * @returns {boolean}
 * @inner
 */
function isSameMonth (dt1, dt2) {
  return isSameYear(dt1, dt2) && dt1.getMonth() === dt2.getMonth();
}

/**
 * @param {DateTime} dt1
 * @param {DateTime} dt2
 * @returns {boolean}
 * @inner
 */
function isSameYear (dt1, dt2) {
  return dt1.getYear() === dt2.getYear();
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isSecond (arg) {
  return arg instanceof Second;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isString (arg) {
  return typeof arg === 'string';
}

/**
 * @param {DateTime} dt
 * @returns {boolean}
 * @inner
 */
function isDateTimeToday (dt) {
  var today = new DateTime$2();
  return isSameDay(dt, today);
}

/**
 * @param {DateTime} dt
 * @param {Object} localeData
 * @returns {boolean}
 * @inner
 */
function isDateTimeWeekend (dt, localeData) {
  var dayOfWeek = dt.getDayOfWeek();
  return localeData.mondayFirst
    ? dayOfWeek === 5 || dayOfWeek === 6
    : dayOfWeek === 6 || dayOfWeek === 0;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isWeek (arg) {
  return arg instanceof Week;
}

/**
 * @param {*} arg
 * @returns {boolean}
 * @inner
 */
function isYear (arg) {
  return arg instanceof Year;
}

/**
 * @inner
 */
function leftPad (str, len) {
  str = String(str);

  var padSize = len - str.length;

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
function validateDateAttributes (dateAttrs) {
  var idx = dateAttrs.length;
  while (idx--) {
    if (!isNumber(dateAttrs[idx]) || !isFinite(dateAttrs[idx])) {
      return false;
    }
  }
  return true;
}

function normalizeDayOfMonth (dateAttrs) {
  var daysInMonth = calcDaysInMonth(dateAttrs[1], dateAttrs[0]);
  if (dateAttrs[2] > daysInMonth) {
    dateAttrs[2] = daysInMonth;
  }
}

function normalizeMonth (givenDateAttrs) {
  var year = givenDateAttrs[0];
  var month = givenDateAttrs[1];

  var addedYears;

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
function normalizeDateAttributes (givenDateAttrs) {
  var undef = void 0;
  // @todo check and coerce type
  var year = givenDateAttrs[0];
  var month = givenDateAttrs[1] !== undef ? givenDateAttrs[1] : 1;
  var day = givenDateAttrs[2] !== undef ? givenDateAttrs[2] : 1;
  var hour = givenDateAttrs[3] || 0;
  var minute = givenDateAttrs[4] || 0;
  var second = givenDateAttrs[5] || 0;
  var millisecond = givenDateAttrs[6] || 0;

  var addedSeconds;
  var addedMinutes;
  var addedHours;
  var addedDays;
  var addedYears;

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

  var daysInMonth;

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
function setDateAttribute (dt, attrIndex, value) {
  var dateAttrs = getDateAttributes(dt);

  dateAttrs[attrIndex] = value;

  setDateAttributes(dt, dateAttrs);
}

/**
 * @inner
 */
function setDateAttributes (dt, dateAttrs) {
  var preferLateAmbiguous = isDateAmbiguousLate(dt.timestamp, dt.tzdata);

  normalizeDateAttributes(dateAttrs);

  dt.timestamp = getTimestampFromAttrs(dateAttrs, null, preferLateAmbiguous, dt.tzdata);
  dt.tzrule = getTzrule(dt.timestamp, dt.tzdata);
  dt.date = timestampToDate(dt.timestamp, dt.tzrule);
  dt.utc = null;
}

/**
 * @inner
 */
function setDateUTCAttribute (dt, attrIndex, value) {
  var utc = getDateUTCAttributes(dt);

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
function _setDayOfWeek (dt, dayOfWeek, mondayFirst) {
  var diff = dayOfWeek - calcDayOfWeek(dt, false, mondayFirst);
  if (diff !== 0) {
    setDateAttribute(dt, 2/** attrIndex */, dt.date[2] + diff);
  }
}

/**
 * @inner
 */
function timestampToDate (timestamp, tzrule) {
  return timestampToUTCDate(timestamp - tzrule.offset);
}

/**
 * @inner
 */
function utcDateToTimestamp (dateAttrs) {
  var startTimestamp = 0;
  var startYear = EPOCH_START;

  var year = dateAttrs[0];
  var isAfterStartPoint = year >= startYear;

  var year_ = startYear;
  var timestamp = startTimestamp;

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

  var monthPoints = isLeapYear(year) ? LEAP_MONTH_POINTS : MONTH_POINTS;
  var msWithinYear = monthPoints[dateAttrs[1] - 1] +
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
function timestampToUTCDate (timestamp) {
  var approxMonth;
  var month;

  var monthPoints;

  var day;
  var hour;
  var minute;
  var second;

  // Calculate actual year, comparing the approximate value with reference points
  var _year = timestampToYear(timestamp);

  var year = _year.year;
  var remainder = _year.remainder;

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
function extend (target, source) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  for (var key in source) {
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
function isValidTimestamp (timestamp) {
  return timestamp > MIN_TIMESTAMP_VALUE && timestamp < MAX_TIMESTAMP_VALUE;
}

/**
 * @param {Function} Parent
 * @param {Function} Child
 * @inner
 */
function inherit (Parent, Child) {
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
function trim (str) {
  return str.replace(RE_TRIM, '');
}

/**
 * @param {DateTime} dt
 * @inner
 */
function setInvalid$$1 (dt) {
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

function toInteger (arg) {
  return parseInt(arg, 10) || 0;
}

function now () {
  return getNow()();
}

function warn (msg) {
  try {
    console.warn(msg);
  } catch (ex) {
    //
  }
}

/*
 * -------------------------------------------------------------------------------------
 * Settings
 * -------------------------------------------------------------------------------------
 */
var tzdata = null;
var defaultTimezone = 'UTC';
var locale = 'en';

var locales = {};

var hasOwnProperty = locales.hasOwnProperty;

/**
 * @param {function} nowFn
 * @returns {boolean}
 * @inner
 */
function testNow (nowFn) {
  return isNumber(nowFn()) && !isNaN(nowFn());
}

/**
 * @returns {number}
 * @inner
 */
function defaultNow () {
  return (new Date()).valueOf();
}

/**
 * @returns {number}
 * @public
 */
var nowFn = defaultNow;

/**
 * @param {string} localeName
 * @param {Object} localeData
 * @public
 */
function defineLocale (localeName, localeData) {
  locales[localeName] = localeData;
}

/**
 * @returns {string}
 * @public
 */
function getDefaultTimezone () {
  return defaultTimezone;
}

/**
 * @param {string} timezoneName
 * @public
 */
function setDefaultTimezone (timezoneName) {
  defaultTimezone = timezoneName;
}

/**
 * @param {string} localeName
 * @public
 */
function setLocale (localeName) {
  if (!hasOwnProperty.call(locales, localeName)) {
    throw new Error(("Locale \"" + localeName + "\" is not available"));
  }
  locale = localeName;
}

/**
 * @returns {string}
 * @public
 */
function getLocale () {
  return locale;
}

/**
 * @returns {Object}
 * @public
 */
function getLocaleData () {
  return locales[locale];
}

/**
 * @param {string} localeName
 * @returns {Object}
 * @public
 */
function getLocaleDataFor (localeName) {
  return locales[localeName];
}

/**
 * @returns {function} nowFn
 * @public
 */
function getNow () {
  return nowFn;
}

/**
 * @returns {Object}
 * @public
 */
function getTzdata () {
  return tzdata;
}

/**
 * @param {Object} newTzdata
 * @public
 */
function setTzdata (newTzdata) {
  tzdata = newTzdata;
}

/**
 * @param {function} fn
 * @public
 */
function setNow (fn) {
  if (testNow(fn)) {
    nowFn = fn;
  }
}

/*
 * -------------------------------------------------------------------------------------
 * Parse
 * -------------------------------------------------------------------------------------
 */

var isoRe = [
  /^([^\s]{4,})[T]?$/,
  /^([^\s]{4,})[T\s]([^\s]{2,12}?)(Z|[+-][^\s]{2,5})?$/
];

var dateRe = [
  /^(\d{4})$/,                               // YYYY
  /^(\d{4})-(\d{1,2})$/,                     // YYYY-MM, YYYY-M
  /^(\d{4})(\d{2})(\d{2})$/,                 // YYYYMMDD, YYYY-M-D
  /^([-+]?\d{4,6})-(\d{1,2})-(\d{1,2})$/ ];

var timeRe = [
  /^(\d{2})$/,                               // HH
  /^(\d{2})(\d{2})$/,                        // HHmm
  /^(\d{2}):(\d{2})$/,                       // HH:mm
  /^(\d{2})(\d{2})(\d{2})([.,](\d{3}))?$/,   // HHmmss, HHmmss.SSS, HHmmss,SSS
  /^(\d{2}):(\d{2}):(\d{2})([.,](\d{3}))?$/ ];

var offsetRe = [
  /^([+-])(\d{2})$/,                         // +-HH
  /^([+-])(\d{2})(:)?(\d{2})$/ ];

var parseTokens = [
  {
    kind: 'year',
    pattern: '\\d{1,4}',
    reg: /YYYY/g,
    token: 'YYYY'
  },
  {
    kind: 'year',
    pattern: '\\d{1,2}',
    reg: /YY/g,
    token: 'YY'
  },
  {
    kind: 'year',
    pattern: '[-+]?\\d{1,}',
    reg: /Y/g,
    token: 'Y'
  },
  {
    kind: 'quarter',
    pattern: '[1-4]',
    reg: /Q/g,
    token: 'Q'
  },
  {
    kind: 'month',
    // pattern: '\\d{2}',
    reg: /MMM/g,
    token: 'MMM'
  },
  {
    kind: 'month',
    pattern: '\\d{2}',
    reg: /MM/g,
    token: 'MM'
  },
  {
    kind: 'month',
    pattern: '\\d{1,2}',
    reg: /Mo/g,
    token: 'Mo'
  },
  {
    kind: 'month',
    pattern: '\\d{1,2}',
    reg: /M/g,
    token: 'M'
  },
  {
    kind: 'day',
    pattern: '\\d{2}',
    reg: /DD/g,
    token: 'DD'
  },
  {
    kind: 'day',
    pattern: '\\d{1,2}',
    reg: /D/g,
    token: 'D'
  },
  {
    kind: 'hour',
    pattern: '\\d{2}',
    reg: /HH/g,
    token: 'HH'
  },
  {
    kind: 'hour',
    pattern: '\\d{1,2}',
    reg: /H/g,
    token: 'H'
  },
  {
    kind: 'hour',
    pattern: '\\d{2}',
    reg: /hh/g,
    token: 'hh'
  },
  {
    kind: 'hour',
    pattern: '\\d{1,2}',
    reg: /h/g,
    token: 'h'
  },
  {
    kind: 'meridiem',
    pattern: '\\u0061\\u006D?|\\u0070\\u006D?',
    reg: /a/g,
    token: 'a'
  },
  {
    kind: 'meridiem',
    pattern: '\\u0061\\u006D?|\\u0070\\u006D?',
    reg: /A/g,
    token: 'A'
  },
  {
    kind: 'minute',
    pattern: '\\d{2}',
    reg: /mm/g,
    token: 'mm'
  },
  {
    kind: 'minute',
    pattern: '\\d{1,2}',
    reg: /m/g,
    token: 'm'
  },
  {
    kind: 'second',
    pattern: '\\d{2}',
    reg: /ss/g,
    token: 'ss'
  },
  {
    kind: 'second',
    pattern: '\\d{1,2}',
    reg: /s/g,
    token: 's'
  },
  {
    kind: 'millisecond',
    pattern: '\\d{3}',
    reg: /SSS/g,
    token: 'SSS'
  },
  {
    kind: 'millisecond',
    pattern: '\\d{2,3}',
    reg: /SS/g,
    token: 'SS'
  },
  {
    kind: 'millisecond',
    pattern: '\\d{1,3}',
    reg: /S/g,
    token: 'S'
  },
  {
    kind: 'offset',
    pattern: '[+-]\\d{2}:?\\d{2}|\\u005A',
    reg: /ZZ/g,
    token: 'ZZ'
  },
  {
    kind: 'offset',
    pattern: '[+-]\\d{2}:?\\d{2}|\\u005A',
    reg: /Z/g,
    token: 'Z'
  }
];

var cache = {};

// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * @param {String} timezone
 * @returns {DateTime}
 * @private
 */
function createCurrentDate (timezone) {
  return new DateTime(now(), timezone);
}

/**
 * @returns {Object}
 * @private
 */
function getMatch (str, re) {
  var idx = re.length;
  while (idx--) {
    var match = str.match(re[idx]);
    if (match) {
      return match;
    }
  }

  return null;
}

/**
 * @param {String} format
 * @private
 */
function parseFormat (format) {
  if (cache[format]) {
    return cache[format];
  }

  var regexStr = escapeRegExp(format);
  var origFormat = format;

  var tokens = [];

  function parseToken (token) {
    regexStr = regexStr.replace(token.reg, function replaceToken () {
      var idx = origFormat.search(token.reg);
      tokens.push({
        index: idx,
        token: token
      });

      return ("(" + (token.pattern) + ")");
    });
  }

  for (var idx = 0, len = parseTokens.length; idx < len; idx++) {
    parseToken(parseTokens[idx]);
  }

  var regex = new RegExp(("^" + regexStr + "$"));

  tokens.sort(function sortTokens (tokenA, tokenB) {
    return tokenA.index - tokenB.index;
  });

  var result = {
    regex: regex,
    tokens: tokens
  };

  cache[format] = result;

  return result;
}

/**
 * Parses given string as a datetime according to ISO-8601
 * @param {String} dateTimeStr
 * @private
 */
function parse (dateTimeStr) {
  dateTimeStr = trim(dateTimeStr);

  var match = getMatch(dateTimeStr, isoRe);

  if (!match) {
    return null;
  }

  var date = parseDateStr(match[1]);
  var time = parseTimeStr(match[2] || '');
  var offset = parseOffsetStr(match[3] || '');

  if (date === null || time === null || isNaN(offset)) {
    return null;
  }

  return [
    date[0],
    date[1],
    date[2],
    time[0],
    time[1],
    time[2],
    time[3],
    offset
  ];
}

/**
 * Parses given string as a datetime according to given format
 * @param {String} dateTimeStr
 * @param {String} format
 * @param {String} timezone
 * @private
 */
function parseWithFormat (dateTimeStr, format, timezone) {
  var reg = parseFormat(format);
  var match = dateTimeStr.match(reg.regex);
  var tokens = reg.tokens;
  var undef = void 0;

  if (!match) {
    return null;
  }

  var currDate;

  var useCurrYear = true;
  var useCurrMonth = true;
  var useCurrDay = true;
  var useCurrHour = true;
  var useCurrMinute = true;
  var useCurrSecond = true;
  var useCurrMillisecond = true;

  var year;
  var month;
  var day;
  var hour;
  var minute;
  var second;
  var millisecond;
  var offset = null;

  var useMeridiem = false;
  var useAm = false;
  var usePm = false;

  for (var idx = 1; idx < match.length; idx++) {
    var value = match[idx];
    var token = tokens[idx - 1].token;

    switch (token.kind) {
    case 'year':
      year = Number(value);
      if (token.token === 'YY') {
        year = 1900 + year;
      }

      useCurrYear = false;
      useCurrMonth = false;
      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'quarter':
      month = Number(value) * 3 - 2;

      useCurrMonth = false;
      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'month':
      month = Number(value);

      useCurrMonth = false;
      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'day':
      day = Number(value);

      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'hour':
      if (token.token === 'hh' || token.token === 'h') {
        useMeridiem = true;
      }

      hour = Number(value);

      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'meridiem':
      if (value === 'pm' || value === 'p') {
        usePm = true;
      } else {
        useAm = true;
      }

      break;

    case 'minute':
      minute = Number(value);

      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'second':
      second = Number(value);

      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'millisecond':
      millisecond = Number(value);

      useCurrMillisecond = false;

      break;

    case 'offset':
      offset = parseOffsetStr(value);
      break;
    }
  }

  if (useMeridiem) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    if (useAm) {
      if (hour === 12) {
        hour = 0;
      }
    }

    if (usePm && hour !== undef) {
      if (hour !== 12) {
        hour = hour + 12;
      }
    }
  }

  if (useCurrYear || useCurrMonth || useCurrDay || useCurrHour ||
    useCurrMinute || useCurrSecond || useCurrMillisecond) {
    currDate = createCurrentDate(timezone);
  }

  if (useCurrYear && year === undef) {
    year = currDate.getYear();
  }

  if (useCurrMonth && month === undef) {
    month = currDate.getMonth();
  }

  if (useCurrDay && day === undef) {
    day = currDate.getDayOfMonth();
  }

  if (useCurrHour && hour === undef) {
    hour = currDate.getHour();
  }

  if (useCurrMinute && minute === undef) {
    minute = currDate.getMinute();
  }

  if (useCurrSecond && second === undef) {
    second = currDate.getSecond();
  }

  if (useCurrMillisecond && millisecond === undef) {
    millisecond = currDate.getMillisecond();
  }

  return [
    year,
    month !== undef ? month : 1,
    day !== undef ? day : 1,
    hour !== undef ? hour : 0,
    minute !== undef ? minute : 0,
    second !== undef ? second : 0,
    millisecond !== undef ? millisecond : 0,
    offset
  ];
}

/**
 * Parses given string as a date according to ISO-8601
 * @param {String} dateStr
 * @returns {Array}
 * @private
 */
function parseDateStr (dateStr) {
  var match = getMatch(dateStr, dateRe);
  if (match) {
    return [
      Number(match[1]),
      Number(match[2] || 1),
      Number(match[3] || 1)
    ];
  }

  return null;
}

/**
 * @param offsetStr {String}
 * @private
 */
function parseOffsetStr (offsetStr) {
  if (offsetStr === '') {
    return null;
  }

  if (offsetStr === 'Z') {
    return 0;
  }

  var hours;
  var minutes;
  var sign;

  var match = getMatch(offsetStr, offsetRe);

  if (match) {
    sign = match[1];
    hours = Number(match[2]);
    minutes = Number(match[4] || 0);

    if (sign === '+') {
      return -(hours * 60 + minutes) * 60 * 1000;
    }

    return (hours * 60 + minutes) * 60 * 1000;
  }

  return NaN;
}

/**
 * Parses given string as a time according to ISO-8601
 * @param {String} timeStr
 * @returns {Array}
 * @private
 */
function parseTimeStr (timeStr) {
  if (!timeStr) {
    return [0, 0, 0];
  }

  var match = getMatch(timeStr, timeRe);

  if (match) {
    return [
      Number(match[1]),
      Number(match[2] || 0),
      Number(match[3] || 0),
      Number(match[5] || 0)
    ];
  }

  return null;
}

/*
 * -------------------------------------------------------------------------------------
 * Format
 * -------------------------------------------------------------------------------------
 */

/* eslint max-len: ["off"] */
var REG = /YYYY|YY|Y|Qo|Q|MMMM|MMM|MM|Mo|M|DDDD|DDDo|DDD|DD|Do|D|dddd|ddd|dd|do|d|E|e|HH|H|hh|h|kk|k|A|a|mm|m|ss|s|SSS|SS|S|WW|Wo|W|ww|wo|w|GGGG|gggg|X|x|ZZ|Z|zz|z/g;

/**
 * @inner
 */
function getOffsetString (offset, separator) {
  var sign = offset <= 0 ? '+' : '-';

  offset = Math.abs(offset);

  var minutes = offset / 60000 | 0;
  var hours = minutes / 60 | 0;

  minutes = minutes - hours * 60;

  return sign + leftPad(hours, 2) + separator + leftPad(minutes, 2);
}

/**
 * @param {Number} num
 * @param {Number} [kind]
 * @inner
 */
function getOrdinalSuffix (num, kind) {
  var locale = getLocaleData();
  var remainder10 = num % 10;
  var remainder100 = num % 100;
  var suffixes = kind === 2 ? locale.ordinal2 : locale.ordinal;

  if (remainder10 === 1 && remainder100 !== 11) {
    return suffixes[0];
  }

  if (remainder10 === 2 && remainder100 !== 12) {
    return suffixes[1];
  }

  if (remainder10 === 3 && remainder100 !== 13) {
    return suffixes[2];
  }

  return suffixes[3];
}

/**
 * @param {DateTime} dt
 * @param {String} format
 * @param {String} localeName
 * @inner
 */
function formatDate (dt, format, localeName) {
  var locale = localeName
    ? getLocaleDataFor(localeName)
    : getLocaleData();

  if (!format) {
    format = 'YYYY-MM-DDTHH:mm:ssZ';
  }

  var useUTC = false;

  var year = dt.date[0];
  var yearStr = String(year);

  var month = dt.date[1];
  var dayOfMonth = dt.date[2];
  var hour = dt.date[3];
  var minute = dt.date[4];
  var second = dt.date[5];
  var millisecond = dt.date[6];

  var prevToken;
  var suffix;

  format = format.replace(REG, function replaceToken (token) {
    var str = '';

    switch (token) {
    case 'YYYY': {
      str = leftPad(year, token.length);
      break;
    }

    case 'YY': {
      var shortYearStr = yearStr.slice(2, 4);
      str = leftPad(shortYearStr, token.length);
      break;
    }

    case 'Y': {
      str = yearStr;
      break;
    }

    case 'Qo': {
      var quarter = dt.getQuarter();
      str = quarter + getOrdinalSuffix(quarter);
      break;
    }

    case 'Q': {
      str = String(dt.getQuarter());
      break;
    }

    case 'MMMM': {
      var caseIdx = 0;

      if (prevToken === 'D' || prevToken === 'DD' || prevToken === 'Do') {
        caseIdx = 1;
      }

      str = locale.monthNames[month - 1][caseIdx];
      break;
    }

    case 'MMM': {
      str = locale.monthNamesShort[month - 1];
      break;
    }

    case 'M':
    case 'MM': {
      str = leftPad(month, token.length);
      break;
    }

    case 'Mo': {
      str = month + getOrdinalSuffix(month);
      break;
    }

    case 'WW': {
      str = leftPad(dt.getISOWeekOfYear(), 2);
      break;
    }

    case 'Wo': {
      var isoWeekOfYear = dt.getISOWeekOfYear();
      str = isoWeekOfYear + getOrdinalSuffix(isoWeekOfYear, 2);
      break;
    }

    case 'W': {
      str = String(dt.getISOWeekOfYear());
      break;
    }

    case 'ww': {
      str = leftPad(dt.getWeekOfYear(), 2);
      break;
    }

    case 'wo': {
      var weekOfYear = dt.getWeekOfYear();
      str = weekOfYear + getOrdinalSuffix(weekOfYear, 2);
      break;
    }

    case 'w': {
      str = String(dt.getWeekOfYear());
      break;
    }

    case 'GGGG': {
      str = String(dt.getISOWeekYear());
      break;
    }

    case 'gggg': {
      str = String(dt.getWeekYear());
      break;
    }

    case 'DDDD': {
      str = leftPad(dt.getDayOfYear(), 3);
      break;
    }

    case 'DDDo': {
      var dayOfYear = dt.getDayOfYear();
      suffix = getOrdinalSuffix(dayOfYear);
      str = dayOfYear + suffix;
      break;
    }

    case 'DDD': {
      str = String(dt.getDayOfYear());
      break;
    }

    case 'DD': {
      if (dayOfMonth < 10) {
        str = "0" + dayOfMonth;
      } else {
        str = dayOfMonth;
      }
      break;
    }

    case 'Do': {
      str = dayOfMonth + getOrdinalSuffix(dayOfMonth);
      break;
    }

    case 'D': {
      str = String(dayOfMonth);
      break;
    }

    case 'dddd': {
      str = locale.weekDayNames[calcDayOfWeek(dt, useUTC, locale.mondayFirst)];
      break;
    }

    case 'ddd': {
      str = locale.weekDayNamesShort[calcDayOfWeek(dt, useUTC, locale.mondayFirst)];
      break;
    }

    case 'dd': {
      str = locale.weekDayNamesShortest[calcDayOfWeek(dt, useUTC, locale.mondayFirst)];
      break;
    }

    case 'do': {
      var dayOfWeek = calcDayOfWeek(dt, useUTC, locale.mondayFirst);
      suffix = getOrdinalSuffix(dayOfWeek);
      str = dayOfWeek + suffix;
      break;
    }

    case 'd': {
      str = String(calcDayOfWeek(dt, useUTC, locale.mondayFirst));
      break;
    }

    case 'e': {
      str = String(dt.getDayOfWeek());
      break;
    }

    case 'E': {
      str = String(dt.getISODayOfWeek());
      break;
    }

    case 'H':
    case 'HH': {
      str = leftPad(hour, token.length);
      break;
    }

    case 'h':
    case 'hh': {
      var meridiemHour = dt.getHourMeridiem();
      str = leftPad(meridiemHour, token.length);
      break;
    }

    case 'k':
    case 'kk': {
      var hour24 = hour === 0 ? 24 : hour;
      str = leftPad(hour24, token.length);
      break;
    }

    case 'A': {
      str = dt.getMeridiem().toUpperCase();
      break;
    }

    case 'a': {
      str = dt.getMeridiem();
      break;
    }

    case 'm':
    case 'mm': {
      str = leftPad(minute, token.length);
      break;
    }

    case 's':
    case 'ss': {
      str = leftPad(second, token.length);
      break;
    }

    case 'S':
    case 'SS':
    case 'SSS': {
      str = leftPad(millisecond, token.length);
      break;
    }

    case 'X': {
      str = String(dt.getUnixTimestamp());
      break;
    }

    case 'x': {
      str = String(dt.valueOf());
      break;
    }

    case 'ZZ': {
      str = getOffsetString(dt.getTimezoneOffset(), '');
      break;
    }

    case 'Z': {
      str = getOffsetString(dt.getTimezoneOffset(), ':');
      break;
    }

    case 'z':
    case 'zz': {
      str = dt.getTimezoneAbbr();
      break;
    }
    }

    prevToken = token;

    return str;
  });

  return format;
}

/**
 * @param {DateTime} dt
 * @returns {String}
 * @inner
 */
function formatDateISO (dt) {
  var yearStr = String(dt.getUTCYear());
  var monthStr = leftPad(dt.getUTCMonth(), 2);
  var dayOfMonthStr = leftPad(dt.getUTCDayOfMonth(), 2);
  var hourStr = leftPad(dt.getUTCHour(), 2);
  var minuteStr = leftPad(dt.getUTCMinute(), 2);
  var secondStr = leftPad(dt.getUTCSecond(), 2);
  var millisecondStr = leftPad(dt.getUTCMillisecond(), 3);

  return (yearStr + "-" + monthStr + "-" + dayOfMonthStr + "T" + hourStr + ":" + minuteStr + ":" + secondStr + "." + millisecondStr + "Z");
}

/**
 * @param {DateTime} dt
 * @returns {String}
 * @inner
 */
function formatDateUTC (dt) {
  var locale = getLocaleDataFor('en');

  var yearStr = String(dt.getUTCYear());

  var month = dt.getUTCMonth();
  var monthStr = locale.monthNamesShort[month - 1];

  var dayOfMonthStr = leftPad(dt.getUTCDayOfMonth(), 2);
  var dayOfWeek = calcDayOfWeek(dt, false, locale.mondayFirst);
  var dayOfWeekStr = locale.weekDayNamesShort[dayOfWeek];

  var hourStr = leftPad(dt.getUTCHour(), 2);
  var minuteStr = leftPad(dt.getUTCMinute(), 2);
  var secondStr = leftPad(dt.getUTCSecond(), 2);

  return (dayOfWeekStr + ", " + dayOfMonthStr + " " + monthStr + " " + yearStr + " " + hourStr + ":" + minuteStr + ":" + secondStr + " GMT");
}

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
 * @param {string} timezoneName
 */
function createFromTimestamp (dt, timestamp, timezoneName) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezoneName;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezoneName);

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
 * @param {string} timezoneName
 */
function createFromAttributes (dt, dateAttrs, offset, timezoneName) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezoneName;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezoneName);

  if (!validateDateAttributes(dateAttrs)) {
    warn(message[E_INVALID_ATTRIBUTE]());
    setInvalid$$1(dt);
    return;
  }

  createFromAttributesSafe(dt, dateAttrs, offset, timezoneName);
}

/**
 * @param {DateTime} dt
 * @param {Array.<number>} dateAttrs
 * @param {number} offset
 * @param {string} timezoneName
 * @param {boolean} preferLateAmbiguous
 */
function createFromAttributesSafe (dt, dateAttrs, offset, timezoneName, preferLateAmbiguous) {
  if ( preferLateAmbiguous === void 0 ) preferLateAmbiguous = false;

  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezoneName;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezoneName);

  // Attributes
  var givenAttrs = copyArray(dateAttrs);

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
 * @param {string} timezoneName
 */
function createFromString (dt, dateStr, formatStr, timezoneName) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezoneName;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezoneName);

  // Attributes
  var dateAttrs = formatStr ? parseWithFormat(dateStr, formatStr, timezoneName) : parse(dateStr);

  if (!dateAttrs) {
    var msg = formatStr
      ? message[E_PARSE_FORMAT](dateStr, formatStr)
      : message[E_PARSE_ISO](dateStr);

    warn(msg);
    setInvalid$$1(dt);

    return;
  }

  // Requested offset
  var offset = dateAttrs[7];

  createFromAttributesSafe(dt, dateAttrs, offset, timezoneName);
}

/**
 * @param {DateTime} dt
 * @param {string} timezoneName
 * @param {string} error
 * @param {*} arg
 */
function createFromInvalidArguments (dt, timezoneName, error, arg) {
  // Validity status
  dt.invalid = false;

  // Timezone
  dt.timezone = timezoneName;

  // Timezone tzdata
  dt.tzdata = getZoneTzdata(timezoneName);

  warn(message[error](arg));

  setInvalid$$1(dt);
}

/**
 * @constructor
 */
function DateTime$2 (arg0, arg1, arg2) {
  var dt = this;

  // Normalize arguments
  var noargs = arguments.length === 0;

  var timezoneName = arg1;
  var formatStr = '';

  if (arguments.length === 3 && isString(arg1) && isString(arg2)) {
    formatStr = arg1;
    timezoneName = arg2;
  }

  timezoneName = timezoneName || getDefaultTimezone();

  // Create from timestamp
  if (noargs || isNumber(arg0)) {
    var timestamp = noargs ? now() : arg0;

    // Handle invalid number
    if (!isFinite(timestamp)) {
      return createFromInvalidArguments(dt, timezoneName, E_INVALID_ARGUMENT, timestamp);
    }

    // Handle invalid number that out of the supported range
    if (!isValidTimestamp(timestamp)) {
      return createFromInvalidArguments(dt, timezoneName, E_RANGE, timestamp);
    }

    return createFromTimestamp(dt, timestamp, timezoneName);
  }

  // Create from string
  if (isString(arg0)) {
    return createFromString(dt, arg0, formatStr, timezoneName);
  }

  // Create from DateTime
  if (arg0 instanceof DateTime$2) {
    return createFromDateTime(dt, arg0);
  }

  // Create from array of attributes
  if (isArrayLike(arg0)) {
    return createFromAttributes(dt, arg0, null/** offset */, timezoneName);
  }

  // Handle invalid arguments
  return createFromInvalidArguments(dt, timezoneName, E_INVALID_ARGUMENT, arg0);
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

  var localeData = getLocaleData();
  var thursdayIndex = localeData.mondayFirst ? 3 : 4;

  var currentWeekThursday = this.clone()
    .setDayOfWeek(thursdayIndex);

  var firstYearThursday = currentWeekThursday.clone()
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

  var currentWeekThursday = this.clone()
    .setISODayOfWeek(4);

  var firstYearThursday = currentWeekThursday.clone()
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

  var AVERAGE_WEEK_MS = 604800000; // 7 * 24 * 3600 * 1000

  var localeData = getLocaleData();
  var thursdayIndex = localeData.mondayFirst ? 3 : 4;

  var currentWeekThursday = this.clone()
    .setDayOfWeek(thursdayIndex);

  var firstYearThursday = currentWeekThursday.clone()
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

  var AVERAGE_WEEK_MS = 604800000; // 7 * 24 * 3600 * 1000

  var currentWeekThursday = this.clone()
    .setISODayOfWeek(4);

  var firstYearThursday = currentWeekThursday.clone()
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
  var year = this.getYear();
  var month = this.getMonth();
  var day = 0;

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
  var localeData = getLocaleData();

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
  var hour = this.getHour();
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
  var hour = this.getHour();
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
  var timestamp = this.timestamp / 1000;
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
  var utc = getDateUTCAttributes(this);
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
  var mondayFirst = getLocaleData().mondayFirst;
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
  var diff = dayOfWeek - this.getUTCDayOfWeek();
  if (diff !== 0) {
    var utcDayOfMonth = getDateUTCAttributes(this)[2];
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
    setInvalid$$1(dt);
    return dt;
  }

  var preferLateAmbiguous = isDateAmbiguousLate(dt.timestamp, dt.tzdata);
  var dateAttrs = dt.date;

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
  var value = interval.valueOf();
  if (!isFinite(value)) {
    return setInvalid$$1(inst);
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
  var dt = this;

  // Number
  if (isNumber(arg)) {
    if (!isFinite(arg)) {
      return setInvalid$$1(dt);
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
  var dateAttrs = this.date;

  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfMinute () {
  var dateAttrs = this.date;

  dateAttrs[5] = 0; // Second
  dateAttrs[6] = 0; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setStartOfHour () {
  var dateAttrs = this.date;

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
  var dateAttrs = this.date;

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
  var dateAttrs = this.date;

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
  var dateAttrs = this.date;

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
  var dateAttrs = this.date;

  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfMinute () {
  var dateAttrs = this.date;

  dateAttrs[5] = 59; // Second
  dateAttrs[6] = 999; // Millisecond

  setDateAttributes(this, dateAttrs);

  return this;
}

/**
 * TBD
 */
function setEndOfHour () {
  var dateAttrs = this.date;

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
  var dateAttrs = this.date;

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
  var dateAttrs = this.date;
  var year = this.date[0];
  var month = this.date[1];

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
  var dateAttrs = this.date;

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
  var res = formatDate(this, FORMAT_RFC822, 'en');
  var parts = res.split(' ');
  var abbr = parts.pop();
  var tz = parts.pop();

  return ((parts.join(' ')) + " GMT" + tz + " " + abbr);
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

  var locale = getLocaleData();
  var formatStr = locale.formats[0];

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
  return new DateTime$2(this);
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

extend(DateTime$2, {
  defineLocale: defineLocale,
  getDefaultTimezone: getDefaultTimezone,
  getLocale: getLocale,
  isDateTime: isDateTime,
  isDay: isDay,
  isDuration: isDuration,
  isHour: isHour,
  isInterval: isInterval,
  isLeapYear: isLeapYear,
  isMinute: isMinute,
  isMonth: isMonth,
  isMonthWeeks: isMonthWeeks,
  isSecond: isSecond,
  isWeek: isWeek,
  isYear: isYear,
  now: now,
  setDefaultTimezone: setDefaultTimezone,
  setLocale: setLocale,
  setNow: setNow,
  setTzdata: setTzdata
});

DateTime$2.prototype = {
  add: add,
  clone: clone,
  format: format,
  getDayOfMonth: getDayOfMonth,
  getDayOfWeek: getDayOfWeek,
  getDayOfYear: getDayOfYear,
  getHour: getHour,
  getHourMeridiem: getHourMeridiem,
  getISODayOfWeek: getISODayOfWeek,
  getISOWeekOfYear: getISOWeekOfYear,
  getISOWeekYear: getISOWeekYear,
  getMeridiem: getMeridiem,
  getMillisecond: getMillisecond,
  getMinute: getMinute,
  getMonth: getMonth,
  getQuarter: getQuarter,
  getSecond: getSecond,
  getTime: getTime,
  getTimezoneAbbr: getTimezoneAbbr,
  getTimezoneInfo: getTimezoneInfo,
  getTimezoneName: getTimezoneName,
  getTimezoneOffset: getTimezoneOffset,
  getUnixTimestamp: getUnixTimestamp,
  getUTCDayOfMonth: getUTCDayOfMonth,
  getUTCDayOfWeek: getUTCDayOfWeek,
  getUTCHour: getUTCHour,
  getUTCMillisecond: getUTCMillisecond,
  getUTCMinute: getUTCMinute,
  getUTCMonth: getUTCMonth,
  getUTCOffset: getUTCOffset,
  getUTCSecond: getUTCSecond,
  getUTCYear: getUTCYear,
  getWeekOfYear: getWeekOfYear,
  getWeekYear: getWeekYear,
  getYear: getYear,
  isDST: isDST,
  isEqual: isEqual,
  isInvalid: isInvalid,
  isToday: isToday,
  isValid: isValid,
  isWeekend: isWeekend,
  setDayOfMonth: setDayOfMonth,
  setDayOfWeek: setDayOfWeek,
  setEndOfDay: setEndOfDay,
  setEndOfHour: setEndOfHour,
  setEndOfMinute: setEndOfMinute,
  setEndOfMonth: setEndOfMonth,
  setEndOfSecond: setEndOfSecond,
  setEndOfWeek: setEndOfWeek,
  setEndOfYear: setEndOfYear,
  setHour: setHour,
  setISODayOfWeek: setISODayOfWeek,
  setMillisecond: setMillisecond,
  setMinute: setMinute,
  setMonth: setMonth,
  setSecond: setSecond,
  setStartOfDay: setStartOfDay,
  setStartOfHour: setStartOfHour,
  setStartOfMinute: setStartOfMinute,
  setStartOfMonth: setStartOfMonth,
  setStartOfSecond: setStartOfSecond,
  setStartOfWeek: setStartOfWeek,
  setStartOfYear: setStartOfYear,
  setTime: setTime,
  setUTCDayOfMonth: setUTCDayOfMonth,
  setUTCDayOfWeek: setUTCDayOfWeek,
  setUTCHour: setUTCHour,
  setUTCMillisecond: setUTCMillisecond,
  setUTCMinute: setUTCMinute,
  setUTCMonth: setUTCMonth,
  setUTCSecond: setUTCSecond,
  setUTCYear: setUTCYear,
  setWeek: setWeek,
  setYear: setYear,
  toDay: toDay,
  toEndOfDay: toEndOfDay,
  toEndOfHour: toEndOfHour,
  toEndOfMinute: toEndOfMinute,
  toEndOfMonth: toEndOfMonth,
  toEndOfSecond: toEndOfSecond,
  toEndOfWeek: toEndOfWeek,
  toEndOfYear: toEndOfYear,
  toHour: toHour,
  toISOString: toISOString,
  toJSON: toJSON,
  toLocaleString: toLocaleString,
  toMinute: toMinute,
  toMonth: toMonth,
  toMonthWeeks: toMonthWeeks,
  toSecond: toSecond,
  toStartOfDay: toStartOfDay,
  toStartOfHour: toStartOfHour,
  toStartOfMinute: toStartOfMinute,
  toStartOfMonth: toStartOfMonth,
  toStartOfSecond: toStartOfSecond,
  toStartOfWeek: toStartOfWeek,
  toStartOfYear: toStartOfYear,
  toString: toString,
  toUTCString: toUTCString,
  toWeek: toWeek,
  toYear: toYear,
  valueOf: valueOf
};

DateTime$2.prototype.constructor = DateTime$2;

var localeEn = {
  formats: [
    'M/D/YYYY, h:mm:ss A'
  ],
  mondayFirst: false,
  monthNames: [
    ['January', 'January'],
    ['February', 'February'],
    ['March', 'March'],
    ['April', 'April'],
    ['May', 'May'],
    ['June', 'June'],
    ['July', 'July'],
    ['August', 'August'],
    ['September', 'September'],
    ['October', 'October'],
    ['November', 'November'],
    ['December', 'December']
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  ordinal: ['st', 'nd', 'rd', 'th'],
  ordinal2: ['st', 'nd', 'rd', 'th'],
  weekDayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  weekDayNamesShort: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ],
  weekDayNamesShortest: [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ]
};

extend(DateTime$2, {
  Day: Day,
  Duration: Duration,
  Hour: Hour,
  Interval: Interval,
  Minute: Minute,
  Month: Month,
  MonthWeeks: MonthWeeks,
  Second: Second,
  Week: Week,
  Year: Year
});

DateTime$2.defineLocale('en', localeEn);

return DateTime$2;

})));
