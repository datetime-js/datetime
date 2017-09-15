import DateTime from '../DateTime';
import { extend, isDateTime, isInterval, isNumber } from '../utils';

function parseArg (arg) {
  return new DateTime(arg);
}

/**
 * @name Interval
 * @param {DateTime|string|number} start
 * @param {DateTime|string|number} end
 * @class
 */
function Interval (start, end) {
  start = parseArg(start);
  end = parseArg(end);

  this._start = start;
  this._end = end;

  if (start.isInvalid() || end.isInvalid()) {
    setInvalid(this);
    return;
  }

  if (start > end) {
    setInvalid(this);
    return;
  }

  if (start.isInvalid() || end.isInvalid()) {
    setInvalid(this);
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
export function setInvalid (interval) {
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
function format (formatStr) {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return `${this._start.format(formatStr)} – ${this._end.format(formatStr)}`;
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
  const start = this._start > interval._start ? this._start : interval._start;
  const end = this._end < interval._end ? this._end : interval._end;

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
  const start = this._start > interval._start ? this._start : interval._start;
  const end = this._end < interval._end ? this._end : interval._end;

  return end > start;
}

/**
 * @public
 */
function isEqual (interval) {
  return this._start.isEqual(interval.toStart()) &&
    this._end.isEqual(interval.toEnd());
}

/**
 * @returns {boolean}
 * @public
 */
function isInvalid () {
  return this._invalid;
}

/**
 * @returns {boolean}
 * @public
 */
function isValid () {
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
  const intervalStart = this._start;
  const intervalEnd = this._end;

  const days = [];

  let day = intervalStart.toDay();

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
  const intervalStart = this._start;
  const intervalEnd = this._end;

  const days = [];

  let day = intervalStart.toDay();
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
function toISOString () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return `${this._start.toISOString()} – ${this._end.toISOString()}`;
}

/**
 * @public
 */
function toJSON () {
  return this.toString();
}

/**
 * @public
 */
function toLocaleString () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return `${this._start.toLocaleString()} – ${this._end.toLocaleString()}`;
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
function toString () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return `${this._start.toString()} – ${this._end.toString()}`;
}

/**
 * @returns {string}
 * @public
 */
function toUTCString () {
  if (this.isInvalid()) {
    return 'Invalid interval';
  }
  return `${this._start.toUTCString()} – ${this._end.toUTCString()}`;
}

/**
 * @param {Interval} interval
 * @returns {Interval}
 * @public
 */
function union (interval) {
  const start = this._start < interval._start ? this._start : interval._start;
  const end = this._end > interval._end ? this._end : interval._end;

  return new Interval(start, end);
}

/**
 * @public
 */
function valueOf () {
  return this.getDuration();
}

/**
 * ----------------------------------------------------------------------------------------
 * Expose API
 * ----------------------------------------------------------------------------------------
 */

extend(Interval.prototype, {
  format,
  getDuration,
  getIntersection,
  includes,
  intersects,
  isEqual,
  isInvalid,
  isValid,
  shift,
  toEnd,
  toIncludingDays,
  toIntersectingDays,
  toISOString,
  toJSON,
  toLocaleString,
  toPeriod,
  toStart,
  toString,
  toUTCString,
  union,
  valueOf
});

export default Interval;
