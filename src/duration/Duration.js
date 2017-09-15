import { extend, isString, toInteger } from '../utils';

const RE_ISO8601 = /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?)?$/;

/**
 * @param {Duration} duration
 * @param {string} str
 * @inner
 */
function createFromString (duration, str) {
  if (!isParsableAsDuration(str)) {
    setInvalid(duration);
    return;
  }

  const matches = str.match(RE_ISO8601);
  const sign = Number((matches[1] || '').toString() + '1');

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
  const matches = String(str).match(RE_ISO8601);
  return Boolean(matches && matches[0]);
}

/**
 * @param {Duration} duration
 * @inner
 */
function setInvalid (duration) {
  duration.invalid = true;
}

/**
 * @private
 */
function getDateStr (duration) {
  let dateStr = '';

  if (duration.getYears() !== 0) {
    dateStr = dateStr + `${Math.abs(duration.getYears())}Y`;
  }

  if (duration.getMonths() !== 0) {
    dateStr = dateStr + `${Math.abs(duration.getMonths())}M`;
  }

  if (duration.getDays() !== 0) {
    dateStr = dateStr + `${Math.abs(duration.getDays())}D`;
  }

  return dateStr;
}

/**
 * @private
 */
function getTimeStr (duration) {
  let timeStr = '';

  if (duration.getHours() !== 0) {
    timeStr = timeStr + `${Math.abs(duration.getHours())}H`;
  }

  if (duration.getMinutes() !== 0) {
    timeStr = timeStr + `${Math.abs(duration.getMinutes())}M`;
  }

  if (duration.getSeconds() !== 0) {
    timeStr = timeStr + `${Math.abs(duration.getSeconds())}S`;
  }

  return timeStr;
}

/**
 * @returns {boolean}
 * @public
 */
function isInvalid () {
  return Boolean(this.invalid);
}

/**
 * @returns {string}
 * @public
 */
function toISOString () {
  return this.toString();
}

/**
 * @returns {string}
 * @public
 */
function toString () {
  const timeStr = getTimeStr(this);
  let str = `P${getDateStr(this)}`;

  if (timeStr) {
    str = str + `T${timeStr}`;
  }

  const sign = this.sign === -1 ? '-' : '';

  return `${sign}${str}`;
}

/**
 * @name Duration
 * @param {string} arg
 * @class
 */
function Duration (arg) {
  const duration = this;

  duration.invalid = false;

  if (arg === void 0) {
    createFromUndefined(duration);
    return;
  }

  if (isString(arg)) {
    createFromString(duration, arg);
    return;
  }

  setInvalid(duration);
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

extend(Duration, { isParsableAsDuration });

extend(Duration.prototype, {
  getDays,
  getHours,
  getMinutes,
  getMonths,
  getSeconds,
  getYears,
  isInvalid,
  toISOString,
  toString
});

export default Duration;
