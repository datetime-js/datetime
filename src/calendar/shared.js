import Day from './Day';
import Month from './Month';
import MonthWeeks from './MonthWeeks';
import Week from './Week';
import Year from './Year';

import { isDateTimeToday, isDateTimeWeekend, isLeapYear } from '../utils';
import { getLocaleData } from '../settings';

const ISO_DAY_FORMAT = 'YYYY-MM-DD';

/**
 * @returns {number}
 */
export function getDayOfWeek () {
  return this._start.getDayOfWeek();
}

/**
 * @returns {number}
 */
export function getDayOfMonth () {
  return this._start.getDayOfMonth();
}

/**
 * @returns {number}
 */
export function getHour () {
  return this._start.getHour();
}

/**
 * @returns {number}
 */
export function getISODayOfWeek () {
  return this._start.getISODayOfWeek();
}

/**
 * @returns {number}
 */
export function getMinute () {
  return this._start.getMinute();
}

/**
 * @returns {number}
 */
export function getMonth () {
  return this._start.getMonth();
}

/**
 * @returns {number}
 */
export function getSecond () {
  return this._start.getSecond();
}

/**
 * @returns {number}
 */
export function getWeekOfYear () {
  return this._start.getWeekOfYear();
}

/**
 * @returns {number}
 */
export function getYear () {
  return this._start.getYear();
}

/**
 * @returns {boolean}
 */
export function isToday () {
  return isDateTimeToday(this._start);
}

/**
 * @returns {boolean}
 */
export function isLeap () {
  return isLeapYear(this._start.getYear());
}

/**
 * @returns {boolean}
 */
export function isWeekend () {
  return isDateTimeWeekend(this._start, getLocaleData());
}

/**
 * @returns {Day}
 */
export function toDay () {
  return new Day(this._start);
}

/**
 * @returns {Day}
 */
export function toDayISOString () {
  return this._start.format(ISO_DAY_FORMAT);
}

/**
 * @returns {Month}
 */
export function toMonth () {
  return new Month(this._start);
}

/**
 * @returns {MonthWeeks}
 */
export function toMonthWeeks () {
  return new MonthWeeks(this._start);
}

/**
 * @returns {Week}
 */
export function toWeek () {
  return new Week(this._start);
}

/**
 * @returns {Year}
 */
export function toYear () {
  return new Year(this._start);
}
