import {
  getLocaleData,
  getLocaleDataFor
} from './settings';

import {
  calcDayOfWeek,
  leftPad
} from './utils';

/*
 * -------------------------------------------------------------------------------------
 * Format
 * -------------------------------------------------------------------------------------
 */

/* eslint max-len: ["off"] */
const REG = /YYYY|YY|Y|Qo|Q|MMMM|MMM|MM|Mo|M|DDDD|DDDo|DDD|DD|Do|D|dddd|ddd|dd|do|d|E|e|HH|H|hh|h|kk|k|A|a|mm|m|ss|s|SSS|SS|S|WW|Wo|W|ww|wo|w|GGGG|gggg|X|x|ZZ|Z|zz|z/g;

/**
 * @inner
 */
function getOffsetString (offset, separator) {
  const sign = offset <= 0 ? '+' : '-';

  offset = Math.abs(offset);

  let minutes = offset / 60000 | 0;
  const hours = minutes / 60 | 0;

  minutes = minutes - hours * 60;

  return sign + leftPad(hours, 2) + separator + leftPad(minutes, 2);
}

/**
 * @param {Number} num
 * @param {Number} [kind]
 * @inner
 */
function getOrdinalSuffix (num, kind) {
  const locale = getLocaleData();
  const remainder10 = num % 10;
  const remainder100 = num % 100;
  const suffixes = kind === 2 ? locale.ordinal2 : locale.ordinal;

  if (remainder10 === 1 && remainder100 !== 11) {
    return suffixes[0];
  }

  if (remainder10 === 2 && remainder100 !== 12) {
    return suffixes[1];
  }

  if (remainder10 === 3 && remainder100 !== 13) {
    return suffixes[2];
  }

  return suffixes[3];
}

/**
 * @param {DateTime} dt
 * @param {String} format
 * @param {String} localeName
 * @inner
 */
export function formatDate (dt, format, localeName) {
  const locale = localeName
    ? getLocaleDataFor(localeName)
    : getLocaleData();

  if (!format) {
    format = 'YYYY-MM-DDTHH:mm:ssZ';
  }

  const useUTC = false;

  const year = dt.date[0];
  const yearStr = String(year);

  const month = dt.date[1];
  const dayOfMonth = dt.date[2];
  const hour = dt.date[3];
  const minute = dt.date[4];
  const second = dt.date[5];
  const millisecond = dt.date[6];

  let prevToken;
  let suffix;

  format = format.replace(REG, function replaceToken (token) {
    let str = '';

    switch (token) {
    case 'YYYY': {
      str = leftPad(year, token.length);
      break;
    }

    case 'YY': {
      const shortYearStr = yearStr.slice(2, 4);
      str = leftPad(shortYearStr, token.length);
      break;
    }

    case 'Y': {
      str = yearStr;
      break;
    }

    case 'Qo': {
      const quarter = dt.getQuarter();
      str = quarter + getOrdinalSuffix(quarter);
      break;
    }

    case 'Q': {
      str = String(dt.getQuarter());
      break;
    }

    case 'MMMM': {
      let caseIdx = 0;

      if (prevToken === 'D' || prevToken === 'DD' || prevToken === 'Do') {
        caseIdx = 1;
      }

      str = locale.monthNames[month - 1][caseIdx];
      break;
    }

    case 'MMM': {
      str = locale.monthNamesShort[month - 1];
      break;
    }

    case 'M':
    case 'MM': {
      str = leftPad(month, token.length);
      break;
    }

    case 'Mo': {
      str = month + getOrdinalSuffix(month);
      break;
    }

    case 'WW': {
      str = leftPad(dt.getISOWeekOfYear(), 2);
      break;
    }

    case 'Wo': {
      const isoWeekOfYear = dt.getISOWeekOfYear();
      str = isoWeekOfYear + getOrdinalSuffix(isoWeekOfYear, 2);
      break;
    }

    case 'W': {
      str = String(dt.getISOWeekOfYear());
      break;
    }

    case 'ww': {
      str = leftPad(dt.getWeekOfYear(), 2);
      break;
    }

    case 'wo': {
      const weekOfYear = dt.getWeekOfYear();
      str = weekOfYear + getOrdinalSuffix(weekOfYear, 2);
      break;
    }

    case 'w': {
      str = String(dt.getWeekOfYear());
      break;
    }

    case 'GGGG': {
      str = String(dt.getISOWeekYear());
      break;
    }

    case 'gggg': {
      str = String(dt.getWeekYear());
      break;
    }

    case 'DDDD': {
      str = leftPad(dt.getDayOfYear(), 3);
      break;
    }

    case 'DDDo': {
      const dayOfYear = dt.getDayOfYear();
      suffix = getOrdinalSuffix(dayOfYear);
      str = dayOfYear + suffix;
      break;
    }

    case 'DDD': {
      str = String(dt.getDayOfYear());
      break;
    }

    case 'DD': {
      if (dayOfMonth < 10) {
        str = `0${dayOfMonth}`;
      } else {
        str = dayOfMonth;
      }
      break;
    }

    case 'Do': {
      str = dayOfMonth + getOrdinalSuffix(dayOfMonth);
      break;
    }

    case 'D': {
      str = String(dayOfMonth);
      break;
    }

    case 'dddd': {
      str = locale.weekDayNames[calcDayOfWeek(dt, useUTC, locale.mondayFirst)];
      break;
    }

    case 'ddd': {
      str = locale.weekDayNamesShort[calcDayOfWeek(dt, useUTC, locale.mondayFirst)];
      break;
    }

    case 'dd': {
      str = locale.weekDayNamesShortest[calcDayOfWeek(dt, useUTC, locale.mondayFirst)];
      break;
    }

    case 'do': {
      const dayOfWeek = calcDayOfWeek(dt, useUTC, locale.mondayFirst);
      suffix = getOrdinalSuffix(dayOfWeek);
      str = dayOfWeek + suffix;
      break;
    }

    case 'd': {
      str = String(calcDayOfWeek(dt, useUTC, locale.mondayFirst));
      break;
    }

    case 'e': {
      str = String(dt.getDayOfWeek());
      break;
    }

    case 'E': {
      str = String(dt.getISODayOfWeek());
      break;
    }

    case 'H':
    case 'HH': {
      str = leftPad(hour, token.length);
      break;
    }

    case 'h':
    case 'hh': {
      const meridiemHour = dt.getHourMeridiem();
      str = leftPad(meridiemHour, token.length);
      break;
    }

    case 'k':
    case 'kk': {
      const hour24 = hour === 0 ? 24 : hour;
      str = leftPad(hour24, token.length);
      break;
    }

    case 'A': {
      str = dt.getMeridiem().toUpperCase();
      break;
    }

    case 'a': {
      str = dt.getMeridiem();
      break;
    }

    case 'm':
    case 'mm': {
      str = leftPad(minute, token.length);
      break;
    }

    case 's':
    case 'ss': {
      str = leftPad(second, token.length);
      break;
    }

    case 'S':
    case 'SS':
    case 'SSS': {
      str = leftPad(millisecond, token.length);
      break;
    }

    case 'X': {
      str = String(dt.getUnixTimestamp());
      break;
    }

    case 'x': {
      str = String(dt.valueOf());
      break;
    }

    case 'ZZ': {
      str = getOffsetString(dt.getTimezoneOffset(), '');
      break;
    }

    case 'Z': {
      str = getOffsetString(dt.getTimezoneOffset(), ':');
      break;
    }

    case 'z':
    case 'zz': {
      str = dt.getTimezoneAbbr();
      break;
    }
    }

    prevToken = token;

    return str;
  });

  return format;
}

/**
 * @param {DateTime} dt
 * @returns {String}
 * @inner
 */
export function formatDateISO (dt) {
  const yearStr = String(dt.getUTCYear());
  const monthStr = leftPad(dt.getUTCMonth(), 2);
  const dayOfMonthStr = leftPad(dt.getUTCDayOfMonth(), 2);
  const hourStr = leftPad(dt.getUTCHour(), 2);
  const minuteStr = leftPad(dt.getUTCMinute(), 2);
  const secondStr = leftPad(dt.getUTCSecond(), 2);
  const millisecondStr = leftPad(dt.getUTCMillisecond(), 3);

  return `${yearStr}-${monthStr}-${dayOfMonthStr}T${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}Z`;
}

/**
 * @param {DateTime} dt
 * @returns {String}
 * @inner
 */
export function formatDateUTC (dt) {
  const locale = getLocaleDataFor('en');

  const yearStr = String(dt.getUTCYear());

  const month = dt.getUTCMonth();
  const monthStr = locale.monthNamesShort[month - 1];

  const dayOfMonthStr = leftPad(dt.getUTCDayOfMonth(), 2);
  const dayOfWeek = calcDayOfWeek(dt, false, locale.mondayFirst);
  const dayOfWeekStr = locale.weekDayNamesShort[dayOfWeek];

  const hourStr = leftPad(dt.getUTCHour(), 2);
  const minuteStr = leftPad(dt.getUTCMinute(), 2);
  const secondStr = leftPad(dt.getUTCSecond(), 2);

  return `${dayOfWeekStr}, ${dayOfMonthStr} ${monthStr} ${yearStr} ${hourStr}:${minuteStr}:${secondStr} GMT`;
}
