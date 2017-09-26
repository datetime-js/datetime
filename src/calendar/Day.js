import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Hour from './Hour';

import {
  getDayOfMonth,
  getDayOfWeek,
  getISODayOfWeek,
  getMonth,
  getYear,
  isToday,
  isWeekend,
  toDayISOString
} from './shared';

import {
  toDay,
  toMonth,
  toMonthWeeks,
  toWeek,
  toYear
} from './shared';

import { extend, inherit } from '../utils';

/**
 * @class Day
 */
export default function Day () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Day);

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
  const hours = [];
  const dayEnd = this.toEnd();

  let hour = new Hour(this.toStart());

  // Maximum possible number of hours in a day
  let count = 48;

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
  getDayOfMonth,
  getDayOfWeek,
  getISODayOfWeek,
  getMonth,
  getYear,
  isToday,
  isWeekend,
  toDayISOString,
  toHours,
  toMonth,
  toMonthWeeks,
  toWeek,
  toYear
});
