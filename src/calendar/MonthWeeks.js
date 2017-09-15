import ACalendar, { parseArgument } from './ACalendar';
import Week from './Week';
import { extend, inherit } from '../utils';

/**
 * @name MonthWeeks
 * @class
 */
export default function MonthWeeks () {
  init.apply(this, arguments);
}

inherit(ACalendar, MonthWeeks);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  this._start = parseArgument.apply(null, arguments);

  this._end = this._start.clone();

  this._start
    .setStartOfMonth()
    .setStartOfWeek();

  this._end
    .setEndOfMonth()
    .setEndOfWeek()
    .add(1);
}

/**
 * @returns {Array<Week>}
 * @public
 */
function toWeeks () {
  const weeks = [];
  const dtend = this.toEnd();

  let week = new Week(this.toStart());
  let count = 6;

  while (count--) {
    if (week.toEnd() > dtend) {
      break;
    }

    weeks.push(week);
    week = week.toNext();
  }

  return weeks;
}

extend(MonthWeeks.prototype, { toWeeks });
