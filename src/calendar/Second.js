import { updateValidity } from '../interval/Interval';

import ACalendarInterval, { parseArgument } from './ACalendarInterval';

import {
  getDayOfMonth,
  getDayOfWeek,
  getHour,
  getISODayOfWeek,
  getMinute,
  getMonth,
  getSecond,
  getYear
} from './shared';

import { extend, inherit } from '../utils';

export default function Second () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Second);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  const start = parseArgument.apply(null, arguments);
  start.setStartOfSecond();

  const end = start.clone();
  end.setSecond(start.getSecond() + 1);

  this._start = start;
  this._end = end;

  updateValidity(this);
}

extend(Second.prototype, {
  getDayOfMonth,
  getDayOfWeek,
  getHour,
  getISODayOfWeek,
  getMinute,
  getMonth,
  getSecond,
  getYear
});
