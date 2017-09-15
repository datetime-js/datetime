'use strict';

var TEST_TIMEZONE = 'TEST_TIMEZONE';

function isArray (arg) {
  return {}.toString.call(arg) === '[object Array]';
}

function equalArrays (arg1, arg2) {
  if (!isArray(arg1) || !isArray(arg2)) {
    return false;
  }

  if (arg1.length !== arg2.length) {
    return false;
  }

  var idx = arg1.length;

  while (idx--) {
    if (arg1[idx] !== arg2[idx]) {
      return false;
    }
  }

  return true;
}

function equalDates (date1, date2) {
  return (
    date1.valueOf() === date2.valueOf() &&
    date1.getTimezoneName() === date2.getTimezoneName() &&
    date1.getTimezoneOffset() === date2.getTimezoneOffset() &&
    date1.getTimezoneAbbr() === date2.getTimezoneAbbr() &&
    date1.isDST() === date2.isDST() &&
    date1.getYear() === date2.getYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDayOfMonth() === date2.getDayOfMonth() &&
    date1.getHour() === date2.getHour() &&
    date1.getMinute() === date2.getMinute() &&
    date1.getSecond() === date2.getSecond() &&
    date1.getMillisecond() === date2.getMillisecond() &&
    date1.getUTCYear() === date2.getUTCYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDayOfMonth() === date2.getUTCDayOfMonth() &&
    date1.getUTCHour() === date2.getUTCHour() &&
    date1.getUTCMinute() === date2.getUTCMinute() &&
    date1.getUTCSecond() === date2.getUTCSecond() &&
    date1.getUTCMillisecond() === date2.getUTCMillisecond()
  );
}

function mockNow (now) {
  DateTime.setNow(function nowMock () {
    return now;
  });
}

function setTestTimezone (params) {
  tzdata.zones[TEST_TIMEZONE] = {
    abbr: params.abbr || ['TST', 'TST'],
    dst: params.dst,
    name: TEST_TIMEZONE,
    offset: params.offset,
    until: params.until
  };
}

if (typeof exports === 'object') {
  module.exports = {
    equalArrays: equalArrays,
    equalDates: equalDates,
    mockNow: mockNow
  };
}

if (typeof global === 'object') {
  global.TEST_TIMEZONE = TEST_TIMEZONE;

  global.equalArrays = equalArrays;
  global.equalDates = equalDates;
  global.mockNow = mockNow;
  global.setTestTimezone = setTestTimezone;
}
