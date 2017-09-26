import { updateValidity } from '../interval/Interval';
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
  const start = parseArgument.apply(null, arguments);
  start.setStartOfYear();

  const end = start.clone();
  end.setYear(start.getYear() + 1);

  this._start = start;
  this._end = end;

  updateValidity(this);
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
