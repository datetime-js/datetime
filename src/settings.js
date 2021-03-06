/*
 * -------------------------------------------------------------------------------------
 * Settings
 * -------------------------------------------------------------------------------------
 */
import {
  isFiniteNumber,
  isValidTzdata,
  warn
} from './utils';

import {
  E_INVALID_TZDATA,
  UTC_TIMEZONE,
  message
} from './constants';

let tzdata = null;
let defaultTimezone = UTC_TIMEZONE;
let locale = 'en';

const locales = {};

const hasOwnProperty = locales.hasOwnProperty;

/**
 * @param {function} nowFn
 * @returns {boolean}
 * @inner
 */
function testNow (nowFn) {
  return isFiniteNumber(nowFn());
}

/**
 * @returns {number}
 * @inner
 */
function defaultNow () {
  return (new Date()).valueOf();
}

/**
 * @returns {number}
 * @public
 */
let nowFn = defaultNow;

/**
 * @param {string} localeName
 * @param {Object} localeData
 * @public
 */
export function defineLocale (localeName, localeData) {
  locales[localeName] = localeData;
}

/**
 * @returns {string}
 * @public
 */
export function getDefaultTimezone () {
  return defaultTimezone;
}

/**
 * @param {string} timezoneName
 * @public
 */
export function setDefaultTimezone (timezoneName) {
  defaultTimezone = timezoneName;
}

/**
 * @param {string} localeName
 * @public
 */
export function setLocale (localeName) {
  if (!hasOwnProperty.call(locales, localeName)) {
    throw new Error(`Locale "${localeName}" is not available`);
  }
  locale = localeName;
}

/**
 * @returns {string}
 * @public
 */
export function getLocale () {
  return locale;
}

/**
 * @returns {Object}
 * @public
 */
export function getLocaleData () {
  return locales[locale];
}

/**
 * @param {string} localeName
 * @returns {Object}
 * @public
 */
export function getLocaleDataFor (localeName) {
  return locales[localeName];
}

/**
 * @returns {function} nowFn
 * @public
 */
export function getNow () {
  return nowFn;
}

/**
 * @returns {Object}
 * @public
 */
export function getTzdata () {
  return tzdata;
}

/**
 * @returns {boolean}
 * @public
 */
export function isTzdataSet () {
  return Boolean(tzdata);
}

/**
 * @param {Object} newTzdata
 * @public
 */
export function setTzdata (newTzdata) {
  if (!isValidTzdata(newTzdata)) {
    warn(message[E_INVALID_TZDATA](newTzdata));
    return;
  }
  tzdata = newTzdata;
}

/**
 * @param {function} fn
 * @public
 */
export function setNow (fn) {
  if (testNow(fn)) {
    nowFn = fn;
  }
}
