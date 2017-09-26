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
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfMonth();

  this._end = this._start.clone();
  this._end.setMonth(this._start.getMonth() + 1);
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
