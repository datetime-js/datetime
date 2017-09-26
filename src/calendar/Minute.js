import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Second from './Second';

import {
  getDayOfMonth,
  getDayOfWeek,
  getHour,
  getISODayOfWeek,
  getMinute,
  getMonth,
  getYear
} from './shared';

import { extend, inherit } from '../utils';

export default function Minute () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Minute);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
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
  const minuteEnd = this.toEnd();
  const seconds = [];

  let second = new Second(this.toStart());

  // Number of seconds in a minute
  let count = 60;

  while (count--) {
    seconds.push(second);
    second = second.toNext();
  }

  return seconds;
}

extend(Minute.prototype, {
  getDayOfMonth,
  getDayOfWeek,
  getHour,
  getISODayOfWeek,
  getMinute,
  getMonth,
  getYear,
  toSeconds
});
