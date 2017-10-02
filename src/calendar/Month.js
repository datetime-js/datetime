import { updateValidity } from '../interval/Interval';

import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Day from './Day';

import { getMonth, getYear } from './shared';
import { extend, inherit } from '../utils';

/**
 * @name Month
 * @class
 */
export default function Month () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Month);

/**
 * @param {DateTime|string|number|Array.<number>} dt
 * @param {string} [timezoneName]
 */
function init (dt, timezoneName) {
  const start = parseArgument.apply(null, arguments);
  start.setStartOfMonth();

  const end = start.clone();
  end.setMonth(start.getMonth() + 1);

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
  const dtend = this.toEnd();

  let day = new Day(this.toStart());
  let count = 31;

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
  getMonth,
  getYear,
  toDays
});
