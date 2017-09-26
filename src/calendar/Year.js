import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Month from './Month';
import MonthWeeks from './MonthWeeks';
import { getYear, isLeap } from './shared';
import { extend, inherit } from '../utils';

/**
 * @name Year
 * @class
 */
export default function Year () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, Year);

/**
 * @param {DateTime|string|number|Array.<number>} dt
 * @param {string} [timezone]
 */
function init (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);
  this._start.setStartOfYear();

  this._end = this._start.clone();
  this._end.setYear(this._start.getYear() + 1);
}

/**
 * @returns {Array.<Month>}
 * @public
 */
function toMonths () {
  let count = 12;
  const months = [];

  let month = new Month(this.toStart());

  while (count--) {
    months.push(month);
    month = month.toNext();
  }

  return months;
}

/**
 * @returns {Array.<MonthWeeks>}
 * @public
 */
function toMonthWeeks () {
  let count = 12;
  const monthWeeksList = [];

  let monthWeeks = new MonthWeeks(this.toStart());

  while (count--) {
    monthWeeksList.push(monthWeeks);
    monthWeeks = monthWeeks.toNext();
  }

  return monthWeeksList;
}

extend(Year.prototype, {
  getYear,
  isLeap,
  toMonths,
  toMonthWeeks
});
