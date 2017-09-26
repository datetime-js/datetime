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
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfWeek();

  this._end = this._start.clone();
  this._end.setDayOfMonth(this._start.getDayOfMonth() + 7);
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
