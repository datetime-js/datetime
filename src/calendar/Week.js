import { updateValidity } from '../interval/Interval';

import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Day from './Day';

import { getWeekOfYear } from './shared';
import { extend, inherit } from '../utils';

/**
 * @name Week
 * @class
 */
export default function Week () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Week);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  const start = parseArgument.apply(null, arguments);
  start.setStartOfWeek();

  const end = start.clone();
  end.setDayOfMonth(start.getDayOfMonth() + 7);

  this._start = start;
  this._end = end;

  updateValidity(this);
}

/**
 * @returns {Array<Day>}
 * @public
 */
function toDays () {
  const days = [];

  let day = new Day(this.toStart());
  let count = 7;

  while (count--) {
    days.push(day);
    day = day.toNext();
  }

  return days;
}

extend(Week.prototype, {
  getWeekOfYear,
  toDays
});
