(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();
  var dt;

  function getDateAttributes (date) {
    return [
      date.getYear(),
      date.getMonth(),
      date.getDayOfMonth(),
      date.getHour(),
      date.getMinute(),
      date.getSecond(),
      date.getMillisecond()
    ];
  }

  function getUTCDateAttributes (date) {
    return [
      date.getUTCYear(),
      date.getUTCMonth(),
      date.getUTCDayOfMonth(),
      date.getUTCHour(),
      date.getUTCMinute(),
      date.getUTCSecond(),
      date.getUTCMillisecond()
    ];
  }

  /**
   * ----------------------------------------------------------------------------------------
   * setTime
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setTime :: UTC :: Unix Epoch', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setTime(1002281032000);

    ok(equalArrays(getDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1002281032000);
  });

  test('[Setters] setTime :: UTC :: Before Unix Epoch', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setTime(-2816080568000);

    ok(equalArrays(getDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === -2816080568000);
  });

  test('[Setters] setTime :: Timezone :: Unix Epoch', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-01-01T02:23:52+0300', TEST_TIMEZONE);
    dt.setTime(978305032000);

    ok(equalArrays(getDateAttributes(dt), [2001, 1, 1, 6, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2000, 12, 31, 23, 23, 52, 0]));
    ok(dt.valueOf() === 978305032000);
  });

  test('[Setters] setTime :: Timezone :: Before Unix Epoch', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setTime(-2816076968000);

    ok(equalArrays(getDateAttributes(dt), [1880, 10, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1880, 10, 5, 12, 23, 52, 0]));
    ok(dt.valueOf() === -2816076968000);
    ok(dt.getTimezoneOffset() / 60000 === -360);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setYear :: UTC :: Unix Epoch', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setYear(2001);

    ok(equalArrays(getDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1002281032000);
  });

  test('[Setters] setYear :: UTC :: Before Unix Epoch', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setYear(1880);

    ok(equalArrays(getDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === -2816080568000);
  });

  test('[Setters] setYear :: Timezone :: Unix Epoch', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-01-01T02:23:52+0300', TEST_TIMEZONE);
    dt.setYear(2001);

    ok(equalArrays(getDateAttributes(dt), [2001, 1, 1, 6, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2000, 12, 31, 23, 23, 52, 0]));
    ok(dt.valueOf() === 978305032000);
  });

  test('[Setters] setYear :: Timezone :: Before Unix Epoch', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setYear(1880);

    ok(equalArrays(getDateAttributes(dt), [1880, 10, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1880, 10, 5, 12, 23, 52, 0]));
    ok(dt.valueOf() === -2816076968000);
    ok(dt.getTimezoneOffset() / 60000 === -360);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setMonth :: UTC :: Between 1 and 12', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 1, 5, 11, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 1, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1420457452000);

    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setMonth(5);

    ok(equalArrays(getDateAttributes(dt), [2015, 5, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1430825032000);

    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setMonth(12);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 5, 11, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1449315052000);
  });

  test('[Setters] setMonth :: UTC :: Greater than 12', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setMonth(27);

    ok(equalArrays(getDateAttributes(dt), [2017, 3, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2017, 3, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1488713032000);
  });

  test('[Setters] setMonth :: UTC :: Less than 1', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setMonth(-14);

    ok(equalArrays(getDateAttributes(dt), [2013, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2013, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1380972232000);
  });

  test('[Setters] setMonth :: Timezone :: Between 1 and 12', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-01T00:30:52+0300', TEST_TIMEZONE);
    dt.setMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 1, 1, 4, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 12, 31, 21, 30, 52, 0]));
    ok(dt.valueOf() === 1420061452000);

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setMonth(5);

    ok(equalArrays(getDateAttributes(dt), [2015, 5, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1430825032000);

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setMonth(12);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 5, 18, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1449315052000);
  });

  test('[Setters] setMonth :: Timezone :: Greater than 12', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setMonth(27);

    ok(equalArrays(getDateAttributes(dt), [2017, 3, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2017, 3, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1488713032000);
  });

  test('[Setters] setMonth :: Timezone :: Less than 1', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setMonth(-14);

    ok(equalArrays(getDateAttributes(dt), [2013, 10, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2013, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1380972232000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setDayOfWeek
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setDayOfWeek :: UTC :: Valid value', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(0);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 28, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(1);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 29, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(2);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 30, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(3);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 31, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(4);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 1, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(5);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 2, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setDayOfWeek(6);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 3, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 6);
  });

  test('[Setters] setDayOfWeek :: UTC :: Invalid value', function () {
    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(7);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 17, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(17);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 27, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(4020);
    ok(equalArrays(getDateAttributes(dt), [2026, 5, 12, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(-1);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 9, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(-6);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 4, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(-16);
    ok(equalArrays(getDateAttributes(dt), [2015, 4, 24, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setDayOfWeek(-5555);
    ok(equalArrays(getDateAttributes(dt), [2000, 2, 23, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 3);
  });

  test('[Setters] setDayOfWeek :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(0);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 28, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(1);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 29, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(2);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 30, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(3);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 31, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(4);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 1, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(5);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 2, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setDayOfWeek(6);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 3, 0, 0, 0, 0]));
    ok(dt.getDayOfWeek() === 6);
  });

  test('[Setters] setDayOfWeek :: Timezone :: Invalid value', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(7);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 17, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(17);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 27, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(4020);
    ok(equalArrays(getDateAttributes(dt), [2026, 5, 12, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(-1);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 9, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(-6);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 4, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(-16);
    ok(equalArrays(getDateAttributes(dt), [2015, 4, 24, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setDayOfWeek(-5555);
    ok(equalArrays(getDateAttributes(dt), [2000, 2, 23, 14, 30, 45, 555]));
    ok(dt.getDayOfWeek() === 3);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setDayOfMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setDayOfMonth :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 1, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1443698632000);

    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(25);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1445772232000);

    dt = new DateTime('2015-12-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 31, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1451561032000);

    dt = new DateTime('2016-02-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 2, 29, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1456745032000);
  });

  test('[Setters] setDayOfMonth :: UTC :: Greater than last day of month', function () {
    dt = new DateTime('2015-11-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 1, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1448969032000);

    dt = new DateTime('2015-02-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2015, 3, 1, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 3, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1425209032000);

    dt = new DateTime('2015-05-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(105);

    ok(equalArrays(getDateAttributes(dt), [2015, 8, 13, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 8, 13, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1439465032000);
  });

  test('[Setters] setDayOfMonth :: UTC :: Negative', function () {
    dt = new DateTime('2015-11-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 31, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1446290632000);

    dt = new DateTime('2015-03-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(-10);

    ok(equalArrays(getDateAttributes(dt), [2015, 2, 18, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 2, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1424258632000);

    dt = new DateTime('2015-02-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setDayOfMonth(-105);

    ok(equalArrays(getDateAttributes(dt), [2014, 10, 18, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 10, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1413631432000);
  });

  test('[Setters] setDayOfMonth :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T02:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 1, 6, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 9, 30, 23, 23, 52, 0]));
    ok(dt.valueOf() === 1443655432000);

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(25);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1445772232000);

    dt = new DateTime('2015-12-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 31, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1451561032000);

    dt = new DateTime('2016-02-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 2, 29, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1456745032000);
  });

  test('[Setters] setDayOfMonth :: Timezone :: Greater than last day of month', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-11-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 1, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1448969032000);

    dt = new DateTime('2015-02-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2015, 3, 1, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 3, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1425209032000);

    dt = new DateTime('2015-05-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(105);

    ok(equalArrays(getDateAttributes(dt), [2015, 8, 13, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 8, 13, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1439465032000);
  });

  test('[Setters] setDayOfMonth :: Timezone :: Negative', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-11-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 31, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1446290632000);

    dt = new DateTime('2015-03-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(-10);

    ok(equalArrays(getDateAttributes(dt), [2015, 2, 18, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 2, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1424258632000);

    dt = new DateTime('2015-02-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setDayOfMonth(-105);

    ok(equalArrays(getDateAttributes(dt), [2014, 10, 18, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 10, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1413631432000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setHour
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setHour :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setHour(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 0, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 0, 23, 52, 0]));
    ok(dt.valueOf() === 1444004632000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setHour(14);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 14, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 14, 23, 52, 0]));
    ok(dt.valueOf() === 1444055032000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setHour(23);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 23, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 23, 23, 52, 0]));
    ok(dt.valueOf() === 1444087432000);
  });

  test('[Setters] setHour :: UTC :: Greater than 23', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setHour(24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 6, 0, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 6, 0, 23, 52, 0]));
    ok(dt.valueOf() === 1444091032000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setHour(49);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 7, 1, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 7, 1, 23, 52, 0]));
    ok(dt.valueOf() === 1444181032000);

    dt = new DateTime('2015-10-25T05:30:52+0300', UTC_TIMEZONE);
    dt.setHour(245);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 4, 5, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 4, 5, 30, 52, 0]));
    ok(dt.valueOf() === 1446615052000);
  });

  test('[Setters] setHour :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setHour(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 23, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 23, 30, 52, 0]));
    ok(dt.valueOf() === 1444001452000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setHour(-24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 3, 0, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 3, 0, 30, 52, 0]));
    ok(dt.valueOf() === 1443832252000);
  });

  test('[Setters] setHour :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setHour(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 0, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 17, 30, 52, 0]));
    ok(dt.valueOf() === 1443979852000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setHour(14);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 14, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 7, 30, 52, 0]));
    ok(dt.valueOf() === 1444030252000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setHour(23);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 23, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 16, 30, 52, 0]));
    ok(dt.valueOf() === 1444062652000);
  });

  test('[Setters] setHour :: Timezone :: Greater than 23', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setHour(24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 6, 0, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 17, 30, 52, 0]));
    ok(dt.valueOf() === 1444066252000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setHour(49);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 7, 1, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 6, 18, 30, 52, 0]));
    ok(dt.valueOf() === 1444156252000);

    dt = new DateTime('2015-10-25T05:30:52+0300', TEST_TIMEZONE);
    dt.setHour(245);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 4, 5, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 3, 22, 30, 52, 0]));
    ok(dt.valueOf() === 1446589852000);
  });

  test('[Setters] setHour :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setHour(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 23, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 16, 30, 52, 0]));
    ok(dt.valueOf() === 1443976252000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setHour(-24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 0, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 3, 17, 30, 52, 0]));
    ok(dt.valueOf() === 1443893452000);
  });

  test('[Setters] setHour :: Timezone :: Non-existing date', function () {
    setTestTimezone({
      abbr: [
        'TST',
        'TST_1',
        'TST'
      ],
      dst: [
        false,
        true,
        false
      ],
      offset: [
        0,
        -60, // +0100
        0
      ],
      until: [
        180000000, // 1970-01-03T02:00:00
        262800000, // 1970-01-04T02:00:00
        null
      ]
    });

    dt = new DateTime('1970-01-03T01:00:00', TEST_TIMEZONE);
    dt.setHour(dt.getHour() + 1);

    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0100 (TST_1)');
    ok(dt.valueOf() === 180000000);
    ok(dt.getHour() === 3);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setMinute
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setMinute :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setMinute(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 0, 52, 0]));
    ok(dt.valueOf() === 1444042852000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setMinute(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 45, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 45, 52, 0]));
    ok(dt.valueOf() === 1443995152000);

    dt = new DateTime('1900-10-05T20:00:59-0300', UTC_TIMEZONE);
    dt.setMinute(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setMinute :: UTC :: Greater than 59', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setMinute(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 12, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 12, 0, 52, 0]));
    ok(dt.valueOf() === 1444046452000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setMinute(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 3, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 3, 59, 52, 0]));
    ok(dt.valueOf() === 1444017592000);

    dt = new DateTime('2015-10-25T05:30:52+0300', UTC_TIMEZONE);
    dt.setMinute(600010);

    ok(equalArrays(getDateAttributes(dt), [2016, 12, 14, 18, 10, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 12, 14, 18, 10, 52, 0]));
    ok(dt.valueOf() === 1481739052000);
  });

  test('[Setters] setMinute :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setMinute(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(dt.valueOf() === 1444042792000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setMinute(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 20, 1, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 20, 1, 52, 0]));
    ok(dt.valueOf() === 1443988912000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setMinute(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 0, 26, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 0, 26, 52, 0]));
    ok(dt.valueOf() === 1443918412000);
  });

  test('[Setters] setMinute :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 0, 52, 0]));
    ok(dt.valueOf() === 1444042852000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 45, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 45, 52, 0]));
    ok(dt.valueOf() === 1443995152000);

    dt = new DateTime('1900-10-05T20:00:59-0300', TEST_TIMEZONE);
    dt.setMinute(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 6, 6, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setMinute :: Timezone :: Greater than 59', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 19, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 12, 0, 52, 0]));
    ok(dt.valueOf() === 1444046452000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 3, 59, 52, 0]));
    ok(dt.valueOf() === 1444017592000);

    dt = new DateTime('2015-10-25T05:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(600010);

    ok(equalArrays(getDateAttributes(dt), [2016, 12, 15, 1, 10, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 12, 14, 18, 10, 52, 0]));
    ok(dt.valueOf() === 1481739052000);
  });

  test('[Setters] setMinute :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 17, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(dt.valueOf() === 1444042792000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 3, 1, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 20, 1, 52, 0]));
    ok(dt.valueOf() === 1443988912000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setMinute(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 7, 26, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 0, 26, 52, 0]));
    ok(dt.valueOf() === 1443918412000);
  });

  test('[Setters] setMinute :: Timezone :: Ambiguous date', function () {
    setTestTimezone({
      abbr: [
        'TST',
        'TST_1',
        'TST'
      ],
      dst: [
        false,
        true,
        false
      ],
      offset: [
        -180, // +0300
        -240, // +0400
        -180  // +0300
      ],
      until: [
        169200000, // 1970-01-03T02:00:00
        252000000, // 1970-01-04T02:00:00
        null
      ]
    });

    // Early ambiguous date stays early after setter
    dt = new DateTime('1970-01-04T01:30:00+0400', TEST_TIMEZONE);
    dt.setMinute(31);

    ok(dt.toString() === 'Sun Jan 04 1970 01:31:00 GMT+0400 (TST_1)');
    ok(dt.valueOf() === 250260000);

    // Late ambiguous date stays early after setter
    dt = new DateTime('1970-01-04T01:30:00+0300', TEST_TIMEZONE);
    dt.setMinute(31);

    ok(dt.toString() === 'Sun Jan 04 1970 01:31:00 GMT+0300 (TST)');
    ok(dt.valueOf() === 253860000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setSecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setSecond :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setSecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 30, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 0, 0]));
    ok(dt.valueOf() === 1444044600000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setSecond(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 45, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 45, 0]));
    ok(dt.valueOf() === 1443994245000);

    dt = new DateTime('1900-10-05T20:59:30-0300', UTC_TIMEZONE);
    dt.setSecond(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setSecond :: UTC :: Greater than 59', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setSecond(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 24, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 24, 0, 0]));
    ok(dt.valueOf() === 1444044240000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setSecond(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 2, 24, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 24, 59, 0]));
    ok(dt.valueOf() === 1444011899000);

    dt = new DateTime('2015-10-25T05:30:52+0300', UTC_TIMEZONE);
    dt.setSecond(600010);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 1, 1, 10, 10, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 1, 1, 10, 10, 0]));
    ok(dt.valueOf() === 1446340210000);
  });

  test('[Setters] setSecond :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setSecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 29, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 29, 59, 0]));
    ok(dt.valueOf() === 1444044599000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setSecond(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 29, 1, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 29, 1, 0]));
    ok(dt.valueOf() === 1443994141000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setSecond(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 9, 26, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 9, 26, 0]));
    ok(dt.valueOf() === 1443992966000);
  });

  test('[Setters] setSecond :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setSecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 30, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 0, 0]));
    ok(dt.valueOf() === 1444044600000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setSecond(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 45, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 45, 0]));
    ok(dt.valueOf() === 1443994245000);

    dt = new DateTime('1900-10-05T20:59:30-0300', TEST_TIMEZONE);
    dt.setSecond(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 6, 6, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setSecond :: Timezone :: Greater than 59', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setSecond(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 24, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 24, 0, 0]));
    ok(dt.valueOf() === 1444044240000);

    dt = new DateTime('2015-10-05T05:23:52+0300', TEST_TIMEZONE);
    dt.setSecond(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 9, 24, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 24, 59, 0]));
    ok(dt.valueOf() === 1444011899000);

    dt = new DateTime('2015-10-25T05:30:52+0300', TEST_TIMEZONE);
    dt.setSecond(600010);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 1, 8, 10, 10, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 1, 1, 10, 10, 0]));
    ok(dt.valueOf() === 1446340210000);
  });

  test('[Setters] setSecond :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setSecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 29, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 29, 59, 0]));
    ok(dt.valueOf() === 1444044599000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setSecond(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 29, 1, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 29, 1, 0]));
    ok(dt.valueOf() === 1443994141000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setSecond(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 9, 26, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 9, 26, 0]));
    ok(dt.valueOf() === 1443992966000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setMillisecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setMillisecond :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:30:52.555+0300', UTC_TIMEZONE);
    dt.setMillisecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1444044652000);

    dt = new DateTime('2015-10-05T00:30:52.555+0300', UTC_TIMEZONE);
    dt.setMillisecond(500);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 52, 500]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 52, 500]));
    ok(dt.valueOf() === 1443994252500);

    dt = new DateTime('1900-10-05T20:59:59-0300', UTC_TIMEZONE);
    dt.setMillisecond(999);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 999]));
    ok(dt.valueOf() === -2184969600001);
  });

  test('[Setters] setMillisecond :: UTC :: Greater than 59', function () {
    dt = new DateTime('2015-10-05T14:23:52.555+0300', UTC_TIMEZONE);
    dt.setMillisecond(1000);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 23, 53, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 23, 53, 0]));
    ok(dt.valueOf() === 1444044233000);

    dt = new DateTime('2015-10-05T05:23:52.500+0300', UTC_TIMEZONE);
    dt.setMillisecond(2300);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 2, 23, 54, 300]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 23, 54, 300]));
    ok(dt.valueOf() === 1444011834300);

    dt = new DateTime('2015-10-25T05:30:52.100+0300', UTC_TIMEZONE);
    dt.setMillisecond(600100);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 2, 40, 52, 100]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 2, 40, 52, 100]));
    ok(dt.valueOf() === 1445740852100);
  });

  test('[Setters] setMillisecond :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52.100+0300', UTC_TIMEZONE);
    dt.setMillisecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 30, 51, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 51, 999]));
    ok(dt.valueOf() === 1444044651999);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', UTC_TIMEZONE);
    dt.setMillisecond(-999);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 51, 1]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 51, 1]));
    ok(dt.valueOf() === 1443994251001);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', UTC_TIMEZONE);
    dt.setMillisecond(-12345);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 39, 655]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 39, 655]));
    ok(dt.valueOf() === 1443994239655);
  });

  test('[Setters] setMillisecond :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52.555+0300', TEST_TIMEZONE);
    dt.setMillisecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1444044652000);

    dt = new DateTime('2015-10-05T00:30:52.555+0300', TEST_TIMEZONE);
    dt.setMillisecond(500);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 52, 500]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 52, 500]));
    ok(dt.valueOf() === 1443994252500);

    dt = new DateTime('1900-10-05T20:59:59-0300', TEST_TIMEZONE);
    dt.setMillisecond(999);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 6, 6, 59, 59, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 999]));
    ok(dt.valueOf() === -2184969600001);
  });

  test('[Setters] setMillisecond :: Timezone :: Greater than 59', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52.555+0300', TEST_TIMEZONE);
    dt.setMillisecond(1000);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 23, 53, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 23, 53, 0]));
    ok(dt.valueOf() === 1444044233000);

    dt = new DateTime('2015-10-05T05:23:52.500+0300', TEST_TIMEZONE);
    dt.setMillisecond(2300);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 9, 23, 54, 300]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 23, 54, 300]));
    ok(dt.valueOf() === 1444011834300);

    dt = new DateTime('2015-10-25T05:30:52.100+0300', TEST_TIMEZONE);
    dt.setMillisecond(600100);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 9, 40, 52, 100]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 2, 40, 52, 100]));
    ok(dt.valueOf() === 1445740852100);
  });

  test('[Setters] setMillisecond :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52.100+0300', TEST_TIMEZONE);
    dt.setMillisecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 30, 51, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 51, 999]));
    ok(dt.valueOf() === 1444044651999);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', TEST_TIMEZONE);
    dt.setMillisecond(-999);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 51, 1]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 51, 1]));
    ok(dt.valueOf() === 1443994251001);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', TEST_TIMEZONE);
    dt.setMillisecond(-12345);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 39, 655]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 39, 655]));
    ok(dt.valueOf() === 1443994239655);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCYear :: UTC :: Unix Epoch', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCYear(2001);

    ok(equalArrays(getDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1002281032000);
  });

  test('[Setters] setUTCYear :: UTC :: Before Unix Epoch', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCYear(1880);

    ok(equalArrays(getDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === -2816080568000);
  });

  test('[Setters] setUTCYear :: Timezone :: Unix Epoch', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCYear(2001);

    ok(equalArrays(getDateAttributes(dt), [2001, 10, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2001, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1002281032000);
  });

  test('[Setters] setUTCYear :: Timezone :: Before Unix Epoch', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCYear(1880);

    ok(equalArrays(getDateAttributes(dt), [1880, 10, 5, 17, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1880, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === -2816080568000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCMonth :: UTC :: Between 1 and 12', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 1, 5, 11, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 1, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1420457452000);

    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCMonth(5);

    ok(equalArrays(getDateAttributes(dt), [2015, 5, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1430825032000);

    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMonth(12);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 5, 11, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1449315052000);
  });

  test('[Setters] setUTCMonth :: UTC :: Greater than 12', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCMonth(27);

    ok(equalArrays(getDateAttributes(dt), [2017, 3, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2017, 3, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1488713032000);
  });

  test('[Setters] setUTCMonth :: UTC :: Less than 1', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCMonth(-14);

    ok(equalArrays(getDateAttributes(dt), [2013, 10, 5, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2013, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1380972232000);
  });

  test('[Setters] setUTCMonth :: Timezone :: Between 1 and 12', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-31T22:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 2, 1, 2, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 1, 31, 19, 30, 52, 0]));
    ok(dt.valueOf() === 1422732652000);

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCMonth(5);

    ok(equalArrays(getDateAttributes(dt), [2015, 5, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1430825032000);

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMonth(12);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 5, 18, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1449315052000);
  });

  test('[Setters] setUTCMonth :: Timezone :: Greater than 12', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCMonth(27);

    ok(equalArrays(getDateAttributes(dt), [2017, 3, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2017, 3, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1488713032000);
  });

  test('[Setters] setUTCMonth :: Timezone :: Less than 1', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCMonth(-14);

    ok(equalArrays(getDateAttributes(dt), [2013, 10, 5, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2013, 10, 5, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1380972232000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCDayOfWeek
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCDayOfWeek :: UTC :: Valid value', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(0);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 28, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(1);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 29, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(2);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 30, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(3);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 31, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(4);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 1, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(5);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 2, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(6);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 3, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 6);
  });

  test('[Setters] setUTCDayOfWeek :: UTC :: Invalid value', function () {
    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(7);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 17, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(17);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 27, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(4020);
    ok(equalArrays(getDateAttributes(dt), [2026, 5, 12, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(-1);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 9, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(-6);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 4, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(-16);
    ok(equalArrays(getDateAttributes(dt), [2015, 4, 24, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], UTC_TIMEZONE);
    dt.setUTCDayOfWeek(-5555);
    ok(equalArrays(getDateAttributes(dt), [2000, 2, 23, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 3);
  });

  test('[Setters] setUTCDayOfWeek :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(0);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 29, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(1);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 30, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(2);
    ok(equalArrays(getDateAttributes(dt), [1969, 12, 31, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(3);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 1, 0, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(4);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 2, 1, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(5);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 3, 1, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(6);
    ok(equalArrays(getDateAttributes(dt), [1970, 1, 4, 1, 0, 0, 0]));
    ok(dt.getUTCDayOfWeek() === 6);
  });

  test('[Setters] setUTCDayOfWeek :: Timezone :: Invalid value', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        -420  // +0700
      ],
      until: [
        0,
        null
      ]
    });

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(7);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 17, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(17);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 27, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(4020);
    ok(equalArrays(getDateAttributes(dt), [2026, 5, 12, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(-1);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 9, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(-6);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 4, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(-16);
    ok(equalArrays(getDateAttributes(dt), [2015, 4, 24, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([2015, 5, 15, 14, 30, 45, 555], TEST_TIMEZONE);
    dt.setUTCDayOfWeek(-5555);
    ok(equalArrays(getDateAttributes(dt), [2000, 2, 23, 14, 30, 45, 555]));
    ok(dt.getUTCDayOfWeek() === 3);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCDayOfMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCDayOfMonth :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 1, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1443698632000);

    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(25);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1445772232000);

    dt = new DateTime('2015-12-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 31, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1451561032000);

    dt = new DateTime('2016-02-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 2, 29, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1456745032000);
  });

  test('[Setters] setUTCDayOfMonth :: UTC :: Greater than last day of month', function () {
    dt = new DateTime('2015-11-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 1, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1448969032000);

    dt = new DateTime('2015-02-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2015, 3, 1, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 3, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1425209032000);

    dt = new DateTime('2015-05-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(105);

    ok(equalArrays(getDateAttributes(dt), [2015, 8, 13, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 8, 13, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1439465032000);
  });

  test('[Setters] setUTCDayOfMonth :: UTC :: Negative', function () {
    dt = new DateTime('2015-11-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 31, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1446290632000);

    dt = new DateTime('2015-03-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(-10);

    ok(equalArrays(getDateAttributes(dt), [2015, 2, 18, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 2, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1424258632000);

    dt = new DateTime('2015-02-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCDayOfMonth(-105);

    ok(equalArrays(getDateAttributes(dt), [2014, 10, 18, 11, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 10, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1413631432000);
  });

  test('[Setters] setUTCDayOfMonth :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T02:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 2, 6, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 1, 23, 23, 52, 0]));
    ok(dt.valueOf() === 1443741832000);

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(25);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1445772232000);

    dt = new DateTime('2015-12-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 31, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1451561032000);

    dt = new DateTime('2016-02-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 2, 29, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1456745032000);
  });

  test('[Setters] setUTCDayOfMonth :: Timezone :: Greater than last day of month', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-11-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(31);

    ok(equalArrays(getDateAttributes(dt), [2015, 12, 1, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 12, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1448969032000);

    dt = new DateTime('2015-02-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(29);

    ok(equalArrays(getDateAttributes(dt), [2015, 3, 1, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 3, 1, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1425209032000);

    dt = new DateTime('2015-05-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(105);

    ok(equalArrays(getDateAttributes(dt), [2015, 8, 13, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 8, 13, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1439465032000);
  });

  test('[Setters] setUTCDayOfMonth :: Timezone :: Negative', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-11-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 31, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 31, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1446290632000);

    dt = new DateTime('2015-03-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(-10);

    ok(equalArrays(getDateAttributes(dt), [2015, 2, 18, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 2, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1424258632000);

    dt = new DateTime('2015-02-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCDayOfMonth(-105);

    ok(equalArrays(getDateAttributes(dt), [2014, 10, 18, 18, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 10, 18, 11, 23, 52, 0]));
    ok(dt.valueOf() === 1413631432000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCHour
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCHour :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 0, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 0, 23, 52, 0]));
    ok(dt.valueOf() === 1444004632000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(14);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 14, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 14, 23, 52, 0]));
    ok(dt.valueOf() === 1444055032000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(23);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 23, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 23, 23, 52, 0]));
    ok(dt.valueOf() === 1444087432000);
  });

  test('[Setters] setUTCHour :: UTC :: Greater than 23', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 6, 0, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 6, 0, 23, 52, 0]));
    ok(dt.valueOf() === 1444091032000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(49);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 7, 1, 23, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 7, 1, 23, 52, 0]));
    ok(dt.valueOf() === 1444181032000);

    dt = new DateTime('2015-10-25T05:30:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(245);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 4, 5, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 4, 5, 30, 52, 0]));
    ok(dt.valueOf() === 1446615052000);
  });

  test('[Setters] setUTCHour :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 23, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 23, 30, 52, 0]));
    ok(dt.valueOf() === 1444001452000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCHour(-24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 3, 0, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 3, 0, 30, 52, 0]));
    ok(dt.valueOf() === 1443832252000);
  });

  test('[Setters] setUTCHour :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 7, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 0, 30, 52, 0]));
    ok(dt.valueOf() === 1444005052000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(14);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 21, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 14, 30, 52, 0]));
    ok(dt.valueOf() === 1444055452000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(23);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 6, 6, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 23, 30, 52, 0]));
    ok(dt.valueOf() === 1444087852000);
  });

  test('[Setters] setUTCHour :: Timezone :: Greater than 23', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 6, 7, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 6, 0, 30, 52, 0]));
    ok(dt.valueOf() === 1444091452000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(49);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 7, 8, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 7, 1, 30, 52, 0]));
    ok(dt.valueOf() === 1444181452000);

    dt = new DateTime('2015-10-25T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(245);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 4, 12, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 4, 5, 30, 52, 0]));
    ok(dt.valueOf() === 1446615052000);
  });

  test('[Setters] setUTCHour :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 6, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 23, 30, 52, 0]));
    ok(dt.valueOf() === 1444001452000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCHour(-24);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 7, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 0, 30, 52, 0]));
    ok(dt.valueOf() === 1443918652000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCMinute
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCMinute :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 0, 52, 0]));
    ok(dt.valueOf() === 1444042852000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 45, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 45, 52, 0]));
    ok(dt.valueOf() === 1443995152000);

    dt = new DateTime('1900-10-05T20:00:59-0300', UTC_TIMEZONE);
    dt.setUTCMinute(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setUTCMinute :: UTC :: Greater than 59', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 12, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 12, 0, 52, 0]));
    ok(dt.valueOf() === 1444046452000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 3, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 3, 59, 52, 0]));
    ok(dt.valueOf() === 1444017592000);

    dt = new DateTime('2015-10-25T05:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(600010);

    ok(equalArrays(getDateAttributes(dt), [2016, 12, 14, 18, 10, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 12, 14, 18, 10, 52, 0]));
    ok(dt.valueOf() === 1481739052000);
  });

  test('[Setters] setUTCMinute :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(dt.valueOf() === 1444042792000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 20, 1, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 20, 1, 52, 0]));
    ok(dt.valueOf() === 1443988912000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCMinute(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 0, 26, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 0, 26, 52, 0]));
    ok(dt.valueOf() === 1443918412000);
  });

  test('[Setters] setUTCMinute :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 0, 52, 0]));
    ok(dt.valueOf() === 1444042852000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 45, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 45, 52, 0]));
    ok(dt.valueOf() === 1443995152000);

    dt = new DateTime('1900-10-05T20:00:59-0300', TEST_TIMEZONE);
    dt.setUTCMinute(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 6, 6, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setUTCMinute :: Timezone :: Greater than 59', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 19, 0, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 12, 0, 52, 0]));
    ok(dt.valueOf() === 1444046452000);

    dt = new DateTime('2015-10-05T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 3, 59, 52, 0]));
    ok(dt.valueOf() === 1444017592000);

    dt = new DateTime('2015-10-25T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(600010);

    ok(equalArrays(getDateAttributes(dt), [2016, 12, 15, 1, 10, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 12, 14, 18, 10, 52, 0]));
    ok(dt.valueOf() === 1481739052000);
  });

  test('[Setters] setUTCMinute :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 17, 59, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 10, 59, 52, 0]));
    ok(dt.valueOf() === 1444042792000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 3, 1, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 20, 1, 52, 0]));
    ok(dt.valueOf() === 1443988912000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setUTCMinute(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 7, 26, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 0, 26, 52, 0]));
    ok(dt.valueOf() === 1443918412000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCSecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCSecond :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 30, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 0, 0]));
    ok(dt.valueOf() === 1444044600000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 45, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 45, 0]));
    ok(dt.valueOf() === 1443994245000);

    dt = new DateTime('1900-10-05T20:59:30-0300', UTC_TIMEZONE);
    dt.setUTCSecond(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setUTCSecond :: UTC :: Greater than 59', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 24, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 24, 0, 0]));
    ok(dt.valueOf() === 1444044240000);

    dt = new DateTime('2015-10-05T05:23:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 2, 24, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 24, 59, 0]));
    ok(dt.valueOf() === 1444011899000);

    dt = new DateTime('2015-10-25T05:30:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(600010);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 1, 1, 10, 10, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 1, 1, 10, 10, 0]));
    ok(dt.valueOf() === 1446340210000);
  });

  test('[Setters] setUTCSecond :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 29, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 29, 59, 0]));
    ok(dt.valueOf() === 1444044599000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 29, 1, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 29, 1, 0]));
    ok(dt.valueOf() === 1443994141000);

    dt = new DateTime('2015-10-05T00:30:52+0300', UTC_TIMEZONE);
    dt.setUTCSecond(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 9, 26, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 9, 26, 0]));
    ok(dt.valueOf() === 1443992966000);
  });

  test('[Setters] setUTCSecond :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 30, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 0, 0]));
    ok(dt.valueOf() === 1444044600000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(45);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 45, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 45, 0]));
    ok(dt.valueOf() === 1443994245000);

    dt = new DateTime('1900-10-05T20:59:30-0300', TEST_TIMEZONE);
    dt.setUTCSecond(59);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 6, 6, 59, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 0]));
    ok(dt.valueOf() === -2184969601000);
  });

  test('[Setters] setUTCSecond :: Timezone :: Greater than 59', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(60);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 24, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 24, 0, 0]));
    ok(dt.valueOf() === 1444044240000);

    dt = new DateTime('2015-10-05T05:23:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(119);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 9, 24, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 24, 59, 0]));
    ok(dt.valueOf() === 1444011899000);

    dt = new DateTime('2015-10-25T05:30:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(600010);

    ok(equalArrays(getDateAttributes(dt), [2015, 11, 1, 8, 10, 10, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 11, 1, 1, 10, 10, 0]));
    ok(dt.valueOf() === 1446340210000);
  });

  test('[Setters] setUTCSecond :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 29, 59, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 29, 59, 0]));
    ok(dt.valueOf() === 1444044599000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(-59);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 29, 1, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 29, 1, 0]));
    ok(dt.valueOf() === 1443994141000);

    dt = new DateTime('2015-10-05T00:30:52+0300', TEST_TIMEZONE);
    dt.setUTCSecond(-1234);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 9, 26, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 9, 26, 0]));
    ok(dt.valueOf() === 1443992966000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setUTCMillisecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Setters] setUTCMillisecond :: UTC :: Valid value', function () {
    dt = new DateTime('2015-10-05T14:30:52.555+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1444044652000);

    dt = new DateTime('2015-10-05T00:30:52.555+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(500);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 52, 500]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 52, 500]));
    ok(dt.valueOf() === 1443994252500);

    dt = new DateTime('1900-10-05T20:59:59-0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(999);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 999]));
    ok(dt.valueOf() === -2184969600001);
  });

  test('[Setters] setUTCMillisecond :: UTC :: Greater than 59', function () {
    dt = new DateTime('2015-10-05T14:23:52.555+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(1000);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 23, 53, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 23, 53, 0]));
    ok(dt.valueOf() === 1444044233000);

    dt = new DateTime('2015-10-05T05:23:52.500+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(2300);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 2, 23, 54, 300]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 23, 54, 300]));
    ok(dt.valueOf() === 1444011834300);

    dt = new DateTime('2015-10-25T05:30:52.100+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(600100);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 2, 40, 52, 100]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 2, 40, 52, 100]));
    ok(dt.valueOf() === 1445740852100);
  });

  test('[Setters] setUTCMillisecond :: UTC :: Less than 0', function () {
    dt = new DateTime('2015-10-05T14:30:52.100+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 11, 30, 51, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 51, 999]));
    ok(dt.valueOf() === 1444044651999);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(-999);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 51, 1]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 51, 1]));
    ok(dt.valueOf() === 1443994251001);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', UTC_TIMEZONE);
    dt.setUTCMillisecond(-12345);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 4, 21, 30, 39, 655]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 39, 655]));
    ok(dt.valueOf() === 1443994239655);
  });

  test('[Setters] setUTCMillisecond :: Timezone :: Valid value', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52.555+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(0);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 30, 52, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 52, 0]));
    ok(dt.valueOf() === 1444044652000);

    dt = new DateTime('2015-10-05T00:30:52.555+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(500);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 52, 500]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 52, 500]));
    ok(dt.valueOf() === 1443994252500);

    dt = new DateTime('1900-10-05T20:59:59-0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(999);

    ok(equalArrays(getDateAttributes(dt), [1900, 10, 6, 6, 59, 59, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 10, 5, 23, 59, 59, 999]));
    ok(dt.valueOf() === -2184969600001);
  });

  test('[Setters] setUTCMillisecond :: Timezone :: Greater than 59', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:23:52.555+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(1000);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 23, 53, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 23, 53, 0]));
    ok(dt.valueOf() === 1444044233000);

    dt = new DateTime('2015-10-05T05:23:52.500+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(2300);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 9, 23, 54, 300]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 2, 23, 54, 300]));
    ok(dt.valueOf() === 1444011834300);

    dt = new DateTime('2015-10-25T05:30:52.100+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(600100);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 25, 9, 40, 52, 100]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 25, 2, 40, 52, 100]));
    ok(dt.valueOf() === 1445740852100);
  });

  test('[Setters] setUTCMillisecond :: Timezone :: Less than 0', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime('2015-10-05T14:30:52.100+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(-1);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 18, 30, 51, 999]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 11, 30, 51, 999]));
    ok(dt.valueOf() === 1444044651999);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(-999);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 51, 1]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 51, 1]));
    ok(dt.valueOf() === 1443994251001);

    dt = new DateTime('2015-10-05T00:30:52.001+0300', TEST_TIMEZONE);
    dt.setUTCMillisecond(-12345);

    ok(equalArrays(getDateAttributes(dt), [2015, 10, 5, 4, 30, 39, 655]));
    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 4, 21, 30, 39, 655]));
    ok(dt.valueOf() === 1443994239655);
  });
})();
