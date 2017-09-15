/*
 * -------------------------------------------------------------------------------------
 * Parse
 * -------------------------------------------------------------------------------------
 */

import { now, trim } from './utils';

const isoRe = [
  /^([^\s]{4,})[T]?$/,
  /^([^\s]{4,})[T\s]([^\s]{2,12}?)(Z|[+-][^\s]{2,5})?$/
];

const dateRe = [
  /^(\d{4})$/,                               // YYYY
  /^(\d{4})-(\d{1,2})$/,                     // YYYY-MM, YYYY-M
  /^(\d{4})(\d{2})(\d{2})$/,                 // YYYYMMDD, YYYY-M-D
  /^([-+]?\d{4,6})-(\d{1,2})-(\d{1,2})$/     // (+-)YYYY-MM-DD, (+-)YYYYYY-MM-DD
];

const timeRe = [
  /^(\d{2})$/,                               // HH
  /^(\d{2})(\d{2})$/,                        // HHmm
  /^(\d{2}):(\d{2})$/,                       // HH:mm
  /^(\d{2})(\d{2})(\d{2})([.,](\d{3}))?$/,   // HHmmss, HHmmss.SSS, HHmmss,SSS
  /^(\d{2}):(\d{2}):(\d{2})([.,](\d{3}))?$/  // HH:mm:ss, HH:mm:ss.SSS, HH:mm:ss,SSS
];

const offsetRe = [
  /^([+-])(\d{2})$/,                         // +-HH
  /^([+-])(\d{2})(:)?(\d{2})$/               // +-HH:mm, +-HHmm
];

const formatCache = {};

const parseTokens = [
  {
    kind: 'year',
    pattern: '\\d{1,4}',
    reg: /YYYY/g,
    token: 'YYYY'
  },
  {
    kind: 'year',
    pattern: '\\d{1,2}',
    reg: /YY/g,
    token: 'YY'
  },
  {
    kind: 'year',
    pattern: '[-+]?\\d{1,}',
    reg: /Y/g,
    token: 'Y'
  },
  {
    kind: 'quarter',
    pattern: '[1-4]',
    reg: /Q/g,
    token: 'Q'
  },
  {
    kind: 'month',
    // pattern: '\\d{2}',
    reg: /MMM/g,
    token: 'MMM'
  },
  {
    kind: 'month',
    pattern: '\\d{2}',
    reg: /MM/g,
    token: 'MM'
  },
  {
    kind: 'month',
    pattern: '\\d{1,2}',
    reg: /Mo/g,
    token: 'Mo'
  },
  {
    kind: 'month',
    pattern: '\\d{1,2}',
    reg: /M/g,
    token: 'M'
  },
  {
    kind: 'day',
    pattern: '\\d{2}',
    reg: /DD/g,
    token: 'DD'
  },
  {
    kind: 'day',
    pattern: '\\d{1,2}',
    reg: /D/g,
    token: 'D'
  },
  {
    kind: 'hour',
    pattern: '\\d{2}',
    reg: /HH/g,
    token: 'HH'
  },
  {
    kind: 'hour',
    pattern: '\\d{1,2}',
    reg: /H/g,
    token: 'H'
  },
  {
    kind: 'hour',
    pattern: '\\d{2}',
    reg: /hh/g,
    token: 'hh'
  },
  {
    kind: 'hour',
    pattern: '\\d{1,2}',
    reg: /h/g,
    token: 'h'
  },
  {
    kind: 'meridiem',
    pattern: '\\u0061\\u006D?|\\u0070\\u006D?',
    reg: /a/g,
    token: 'a'
  },
  {
    kind: 'meridiem',
    pattern: '\\u0061\\u006D?|\\u0070\\u006D?',
    reg: /A/g,
    token: 'A'
  },
  {
    kind: 'minute',
    pattern: '\\d{2}',
    reg: /mm/g,
    token: 'mm'
  },
  {
    kind: 'minute',
    pattern: '\\d{1,2}',
    reg: /m/g,
    token: 'm'
  },
  {
    kind: 'second',
    pattern: '\\d{2}',
    reg: /ss/g,
    token: 'ss'
  },
  {
    kind: 'second',
    pattern: '\\d{1,2}',
    reg: /s/g,
    token: 's'
  },
  {
    kind: 'millisecond',
    pattern: '\\d{3}',
    reg: /SSS/g,
    token: 'SSS'
  },
  {
    kind: 'millisecond',
    pattern: '\\d{2,3}',
    reg: /SS/g,
    token: 'SS'
  },
  {
    kind: 'millisecond',
    pattern: '\\d{1,3}',
    reg: /S/g,
    token: 'S'
  },
  {
    kind: 'offset',
    pattern: '[+-]\\d{2}:?\\d{2}|\\u005A',
    reg: /ZZ/g,
    token: 'ZZ'
  },
  {
    kind: 'offset',
    pattern: '[+-]\\d{2}:?\\d{2}|\\u005A',
    reg: /Z/g,
    token: 'Z'
  }
];

const cache = {};

// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp (str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * @param {String} timezone
 * @returns {DateTime}
 * @private
 */
function createCurrentDate (timezone) {
  return new DateTime(now(), timezone);
}

/**
 * @returns {Object}
 * @private
 */
function getMatch (str, re) {
  let idx = re.length;
  while (idx--) {
    const match = str.match(re[idx]);
    if (match) {
      return match;
    }
  }

  return null;
}

/**
 * @param {String} format
 * @private
 */
function parseFormat (format) {
  if (cache[format]) {
    return cache[format];
  }

  let regexStr = escapeRegExp(format);
  const origFormat = format;

  const tokens = [];

  function parseToken (token) {
    regexStr = regexStr.replace(token.reg, function replaceToken () {
      const idx = origFormat.search(token.reg);
      tokens.push({
        index: idx,
        token: token
      });

      return `(${token.pattern})`;
    });
  }

  for (let idx = 0, len = parseTokens.length; idx < len; idx++) {
    parseToken(parseTokens[idx]);
  }

  const regex = new RegExp(`^${regexStr}$`);

  tokens.sort(function sortTokens (tokenA, tokenB) {
    return tokenA.index - tokenB.index;
  });

  const result = {
    regex: regex,
    tokens: tokens
  };

  cache[format] = result;

  return result;
}

/**
 * Parses given string as a datetime according to ISO-8601
 * @param {String} dateTimeStr
 * @private
 */
export function parse (dateTimeStr) {
  dateTimeStr = trim(dateTimeStr);

  const match = getMatch(dateTimeStr, isoRe);

  if (!match) {
    return null;
  }

  const date = parseDateStr(match[1]);
  const time = parseTimeStr(match[2] || '');
  const offset = parseOffsetStr(match[3] || '');

  if (date === null || time === null || isNaN(offset)) {
    return null;
  }

  return [
    date[0],
    date[1],
    date[2],
    time[0],
    time[1],
    time[2],
    time[3],
    offset
  ];
}

/**
 * Parses given string as a datetime according to given format
 * @param {String} dateTimeStr
 * @param {String} format
 * @param {String} timezone
 * @private
 */
export function parseWithFormat (dateTimeStr, format, timezone) {
  const reg = parseFormat(format);
  const match = dateTimeStr.match(reg.regex);
  const tokens = reg.tokens;
  const undef = void 0;

  if (!match) {
    return null;
  }

  let currDate;

  let useCurrYear = true;
  let useCurrMonth = true;
  let useCurrDay = true;
  let useCurrHour = true;
  let useCurrMinute = true;
  let useCurrSecond = true;
  let useCurrMillisecond = true;

  let year;
  let month;
  let day;
  let hour;
  let minute;
  let second;
  let millisecond;
  let offset = null;

  let useMeridiem = false;
  let useAm = false;
  let usePm = false;

  for (let idx = 1; idx < match.length; idx++) {
    const value = match[idx];
    const token = tokens[idx - 1].token;

    switch (token.kind) {
    case 'year':
      year = Number(value);
      if (token.token === 'YY') {
        year = 1900 + year;
      }

      useCurrYear = false;
      useCurrMonth = false;
      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'quarter':
      month = Number(value) * 3 - 2;

      useCurrMonth = false;
      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'month':
      month = Number(value);

      useCurrMonth = false;
      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'day':
      day = Number(value);

      useCurrDay = false;
      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'hour':
      if (token.token === 'hh' || token.token === 'h') {
        useMeridiem = true;
      }

      hour = Number(value);

      useCurrHour = false;
      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'meridiem':
      if (value === 'pm' || value === 'p') {
        usePm = true;
      } else {
        useAm = true;
      }

      break;

    case 'minute':
      minute = Number(value);

      useCurrMinute = false;
      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'second':
      second = Number(value);

      useCurrSecond = false;
      useCurrMillisecond = false;

      break;

    case 'millisecond':
      millisecond = Number(value);

      useCurrMillisecond = false;

      break;

    case 'offset':
      offset = parseOffsetStr(value);
      break;
    }
  }

  if (useMeridiem) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    if (useAm) {
      if (hour === 12) {
        hour = 0;
      }
    }

    if (usePm && hour !== undef) {
      if (hour !== 12) {
        hour = hour + 12;
      }
    }
  }

  if (useCurrYear || useCurrMonth || useCurrDay || useCurrHour ||
    useCurrMinute || useCurrSecond || useCurrMillisecond) {
    currDate = createCurrentDate(timezone);
  }

  if (useCurrYear && year === undef) {
    year = currDate.getYear();
  }

  if (useCurrMonth && month === undef) {
    month = currDate.getMonth();
  }

  if (useCurrDay && day === undef) {
    day = currDate.getDayOfMonth();
  }

  if (useCurrHour && hour === undef) {
    hour = currDate.getHour();
  }

  if (useCurrMinute && minute === undef) {
    minute = currDate.getMinute();
  }

  if (useCurrSecond && second === undef) {
    second = currDate.getSecond();
  }

  if (useCurrMillisecond && millisecond === undef) {
    millisecond = currDate.getMillisecond();
  }

  return [
    year,
    month !== undef ? month : 1,
    day !== undef ? day : 1,
    hour !== undef ? hour : 0,
    minute !== undef ? minute : 0,
    second !== undef ? second : 0,
    millisecond !== undef ? millisecond : 0,
    offset
  ];
}

/**
 * Parses given string as a date according to ISO-8601
 * @param {String} dateStr
 * @returns {Array}
 * @private
 */
function parseDateStr (dateStr) {
  const match = getMatch(dateStr, dateRe);
  if (match) {
    return [
      Number(match[1]),
      Number(match[2] || 1),
      Number(match[3] || 1)
    ];
  }

  return null;
}

/**
 * @param offsetStr {String}
 * @private
 */
function parseOffsetStr (offsetStr) {
  if (offsetStr === '') {
    return null;
  }

  if (offsetStr === 'Z') {
    return 0;
  }

  let hours;
  let minutes;
  let sign;

  const match = getMatch(offsetStr, offsetRe);

  if (match) {
    sign = match[1];
    hours = Number(match[2]);
    minutes = Number(match[4] || 0);

    if (sign === '+') {
      return -(hours * 60 + minutes) * 60 * 1000;
    }

    return (hours * 60 + minutes) * 60 * 1000;
  }

  return NaN;
}

/**
 * Parses given string as a time according to ISO-8601
 * @param {String} timeStr
 * @returns {Array}
 * @private
 */
function parseTimeStr (timeStr) {
  if (!timeStr) {
    return [0, 0, 0];
  }

  const match = getMatch(timeStr, timeRe);

  if (match) {
    return [
      Number(match[1]),
      Number(match[2] || 0),
      Number(match[3] || 0),
      Number(match[5] || 0)
    ];
  }

  return null;
}
