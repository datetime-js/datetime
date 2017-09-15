import ACalendar, { parseArgument } from './ACalendar';

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

inherit(ACalendar, Second);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfSecond();

  this._end = this._start.clone();
  this._end.setSecond(this._start.getSecond() + 1);
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
