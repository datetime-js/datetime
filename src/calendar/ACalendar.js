import DateTime from '../DateTime';
import Interval from '../interval/Interval';
import { extend, inherit } from '../utils';

/**
 * @param {DateTime} dt
 * @class
 * @abstract
 */
export default function ACalendar (dt) {
}

inherit(Interval, ACalendar);

/**
 * ----------------------------------------------------------------------------------------
 * Private methods
 * ----------------------------------------------------------------------------------------
 */

/**
 * @param {DateTime|String|Number|Array<Number>} dt
 * @param {String} [timezone]
 * @returns {DateTime}
 * @inner
 */
export function parseArgument (dt, timezone) {
  const argsCount = arguments.length;

  if (argsCount === 0) {
    return new DateTime();
  }

  if (argsCount === 1) {
    return new DateTime(dt);
  }

  return new DateTime(dt, timezone);
}

/**
 * ----------------------------------------------------------------------------------------
 * Public methods
 * ----------------------------------------------------------------------------------------
 */

/**
 * @returns {Day}
 * @public
 */
function toNext () {
  const dt = this._end.clone();
  dt.add(1);
  return new this.constructor(dt);
}

/**
 * @returns {Day}
 * @public
 */
function toPrev () {
  const dt = this._start.clone();
  dt.setTime(dt - 1);
  return new this.constructor(dt);
}

/**
 * ----------------------------------------------------------------------------------------
 * Expose API
 * ----------------------------------------------------------------------------------------
 */

extend(ACalendar.prototype, {
  toNext,
  toPrev
});
