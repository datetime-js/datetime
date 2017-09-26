import { updateValidity } from '../interval/Interval';

import ACalendarInterval, { parseArgument } from './ACalendarInterval';
import Week from './Week';

import { extend, inherit } from '../utils';

/**
 * @name MonthWeeks
 * @class
 */
export default function MonthWeeks () {
  init.apply(this, arguments);
}

inherit(ACalendarInterval, MonthWeeks);

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 */
function init (dt, timezone) {
  const start = parseArgument.apply(null, arguments);
  const end = start.clone();

  start
    .setStartOfMonth()
    .setStartOfWeek();

  end
    .setEndOfMonth()
    .setEndOfWeek()
    .add(1);

  this._start = start;
  this._end = end;

  updateValidity(this);
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
