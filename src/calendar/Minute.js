import { updateValidity } from '../interval/Interval';

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
 * @param {DateTime|string|number|Array.<number>} dt
 * @param {String} [timezoneName]
 */
function init (dt, timezoneName) {
  const start = parseArgument.apply(null, arguments);
  start.setStartOfMinute();

  const end = start.clone();
  end.setMinute(start.getMinute() + 1);

  this._start = start;
  this._end = end;

  updateValidity(this);
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
