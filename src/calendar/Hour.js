import { updateValidity } from '../interval/Interval';

import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Minute from './Minute';

import {
  getDayOfMonth,
  getDayOfWeek,
  getHour,
  getISODayOfWeek,
  getMonth,
  getYear
} from './shared';

import { extend, inherit } from '../utils';
import { HOUR_MS } from '../constants';

export default function Hour () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Hour);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  const start = parseArgument.apply(null, arguments);
  start.setStartOfHour();

  const end = start.clone();
  end.add(HOUR_MS);

  this._start = start;
  this._end = end;

  updateValidity(this);
}

/**
 * @returns {Array.<Minute>}
 * @public
 */
function toMinutes () {
  const hourEnd = this.toEnd();
  const minutes = [];

  let minute = new Minute(this.toStart());

  // Number of minutes in a hour
  let count = 60;

  while (count--) {
    minutes.push(minute);
    minute = minute.toNext();
  }

  return minutes;
}

extend(Hour.prototype, {
  getDayOfMonth,
  getDayOfWeek,
  getHour,
  getISODayOfWeek,
  getMonth,
  getYear,
  toMinutes
});
