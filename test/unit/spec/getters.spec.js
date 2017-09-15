(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';
  var MOSCOW_TIMEZONE = 'Europe/Moscow';

  var test = createTestFn();
  var dt;

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getYear', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300');
    ok(dt.getYear() === 2015);
  });

  test('[Getters] getMonth', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300');
    ok(dt.getMonth() === 10);
  });

  test('[Getters] getDayOfMonth', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300');
    ok(dt.getDayOfMonth() === 5);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getISOWeekOfYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getISOWeekOfYear :: UTC :: Regular year', function () {
    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 10, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 11, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 2);

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 19);

    dt = new DateTime([2016, 12, 25, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 51);

    dt = new DateTime([2016, 12, 26, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2016, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 1, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 2, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);
  });

  test('[Getters] getISOWeekOfYear :: UTC :: Year with leap week', function () {
    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 27, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 53);

    dt = new DateTime([2015, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);
  });

  test('[Getters] getISOWeekOfYear :: UTC :: Before UNIX epoch', function () {
    dt = new DateTime([1950, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([1950, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);
  });

  test('[Getters] getISOWeekOfYear :: Timezone :: Regular year', function () {
    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 10, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 11, 0, 0, 0, 9], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 2);

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 19);

    dt = new DateTime([2016, 12, 25, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 51);

    dt = new DateTime([2016, 12, 26, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2016, 12, 31, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 1, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 2, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);
  });

  test('[Getters] getISOWeekOfYear :: Timezone :: Year with leap week', function () {
    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 27, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 53);

    dt = new DateTime([2015, 12, 31, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);
  });

  test('[Getters] getISOWeekOfYear :: Timezone :: Before UNIX epoch', function () {
    dt = new DateTime([1950, 1, 1, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 52);

    dt = new DateTime([1950, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISOWeekOfYear() === 1);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getISOWeekYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getISOWeekYear :: UTC', function () {
    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2015);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2016);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2016);

    dt = new DateTime([2017, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2017);

    dt = new DateTime([2018, 12, 30, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2018);

    dt = new DateTime([2018, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2019);
  });

  test('[Getters] getISOWeekYear :: Timezone', function () {
    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2015);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2016);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2016);

    dt = new DateTime([2017, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2017);

    dt = new DateTime([2018, 12, 30, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2018);

    dt = new DateTime([2018, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISOWeekYear() === 2019);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getDayOfWeek
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getDayOfWeek :: UTC :: Unit Epoch', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 2, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([1970, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 5, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 6, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 7, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 8, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([2015, 12, 2, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);
  });

  test('[Getters] getDayOfWeek :: UTC :: Before Unix Epoch', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 30, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 29, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 26, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 25, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 24, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 23, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 22, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 21, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 20, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 19, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 18, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 17, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 16, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 14, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1912, 5, 8, 14, 30, 45, 555], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);
  });

  test('[Getters] getDayOfWeek :: Timezone :: Unit Epoch', function () {
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
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 2, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 5, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 6, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 7, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 8, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([2015, 12, 2, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);
  });

  test('[Getters] getDayOfWeek :: Timezone :: Before Unix Epoch', function () {
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
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 31, 23, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 30, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 29, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 28, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 27, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 26, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 25, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 24, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 23, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 22, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 21, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 20, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 19, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 18, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 17, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 16, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 15, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 14, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([1912, 5, 8, 14, 30, 45, 555], TEST_TIMEZONE);
    ok(dt.getDayOfWeek() === 3);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCDayOfWeek
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCDayOfWeek :: UTC :: Unit Epoch', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 2, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1970, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 5, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 6, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 7, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 8, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([2015, 12, 2, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);
  });

  test('[Getters] getUTCDayOfWeek :: UTC :: Before Unix Epoch', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 30, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 29, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 26, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 25, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 24, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 23, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 22, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 21, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 20, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 19, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 18, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 17, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 16, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 14, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1912, 5, 8, 14, 30, 45, 555], UTC_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);
  });

  test('[Getters] getUTCDayOfWeek :: Timezone :: Unit Epoch', function () {
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
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1970, 1, 2, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1970, 1, 5, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1970, 1, 6, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1970, 1, 7, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1970, 1, 8, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([2015, 12, 2, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);
  });

  test('[Getters] getUTCDayOfWeek :: Timezone :: Before Unix Epoch', function () {
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
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 31, 23, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 30, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 29, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 28, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 27, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 26, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 25, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 24, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 23, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 22, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 21, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1969, 12, 20, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 5);

    dt = new DateTime([1969, 12, 19, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 4);

    dt = new DateTime([1969, 12, 18, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1969, 12, 17, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);

    dt = new DateTime([1969, 12, 16, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 1);

    dt = new DateTime([1969, 12, 15, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 0);

    dt = new DateTime([1969, 12, 14, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 6);

    dt = new DateTime([1912, 5, 8, 14, 30, 45, 555], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 3);

    dt = new DateTime([1912, 5, 8, 5, 30, 45, 555], TEST_TIMEZONE);
    ok(dt.getUTCDayOfWeek() === 2);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getHour
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getHour', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getHour() === 11);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getMinute
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getMinute', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', TEST_TIMEZONE);
    ok(dt.getMinute() === 23);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getSecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getSecond', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getSecond() === 52);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getMillisecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getMillisecond', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getMillisecond() === 0);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getTime
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getTime', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getTime() === 1444044232000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCYear', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCYear() === 2015);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCMonth', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCMonth() === 10);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCDayOfMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCDayOfMonth', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCDayOfMonth() === 5);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCHour
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCHour', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCHour() === 11);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCMinute
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCMinute', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCMinute() === 23);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCSecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCSecond', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCSecond() === 52);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCMillisecond
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCMillisecond', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCMillisecond() === 0);
  });

  // @todo getUTCDayOfWeek

  /**
   * ----------------------------------------------------------------------------------------
   * getUTCOffset
   * ----------------------------------------------------------------------------------------
   */

  test('[Getters] getUTCOffset :: UTC', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', UTC_TIMEZONE);
    ok(dt.getUTCOffset() === 0);
  });

  test('[Getters] getUTCOffset :: Timezone', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -180, // -0300
        -240
      ],
      until: [
        172800000, // 2 days
        null
      ]
    });

    dt = new DateTime([1970, 1, 3, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.getUTCOffset() === 240);
  });
})();
