(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  var Second = DateTime.Second;
  var Interval = DateTime.Interval;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] Class', function () {
    ok(typeof Second === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(880235400);

    var second = new Second();

    ok(second instanceof Second);
    ok(second instanceof Interval);

    ok(second.toStart().isEqual(new DateTime([1970, 1, 11, 4, 30, 35, 0])));
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 11, 4, 30, 36, 0])));
  });

  test('[Second] Create :: DateTime', function () {
    var dt = new DateTime([1970, 1, 11, 14, 25, 15, 555], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var second = new Second(dt);

    ok(second.toStart() !== dt);
    ok(second.toStart().isEqual(new DateTime([1970, 1, 11, 14, 25, 15, 0])) === true);
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 11, 14, 25, 16, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 25, 15, 555])) === true);
  });

  test('[Second] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var second = new Second('1970-01-11');

    ok(second.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 11, 0, 0, 1, 0])));
  });

  test('[Second] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var second = new Second(914423100);

    ok(second.toStart().isEqual(new DateTime([1970, 1, 11, 14, 0, 23, 0])));
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 11, 14, 0, 24, 0])));
  });

  test('[Second] Create :: String and timezone', function () {
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

    var second = new Second('1970-01-03T03:27:59+0100', TEST_TIMEZONE);

    ok(second.toStart().isEqual(new DateTime([1970, 1, 3, 3, 27, 59, 0], TEST_TIMEZONE)));
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 28, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] getSecond', function () {
    var second = new Second('1979-05-03T11:55:44+0100', UTC_TIMEZONE);
    ok(second.getSecond() === 44);
  });

  test('[Second] getMinute', function () {
    var second = new Second('1979-05-03T11:55:44+0100', UTC_TIMEZONE);
    ok(second.getMinute() === 55);
  });

  test('[Second] getHour', function () {
    var second = new Second('1979-05-03T11:00:44+0100', UTC_TIMEZONE);
    ok(second.getHour() === 10);
  });

  test('[Second] getDayOfWeek', function () {
    var second;

    second = new Second('1979-04-29T03:00:44+0100', UTC_TIMEZONE);
    ok(second.getDayOfWeek() === 0);

    second = new Second('1979-05-05T03:00:44+0100', UTC_TIMEZONE);
    ok(second.getDayOfWeek() === 6);
  });

  test('[Second] getDayOfMonth', function () {
    var second = new Second('1979-05-03T03:00:44+0100', UTC_TIMEZONE);
    ok(second.getDayOfMonth() === 3);
  });

  test('[Second] getMonth', function () {
    var second = new Second('1979-05-03T03:00:44+0100', UTC_TIMEZONE);
    ok(second.getMonth() === 5);
  });

  test('[Second] getYear', function () {
    var second = new Second('1979-01-03T03:00:44+0100', UTC_TIMEZONE);
    ok(second.getYear() === 1979);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next second
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] toNext', function () {
    var second = new Second('1970-01-03T03:59:59.125', UTC_TIMEZONE);
    var nextSecond = second.toNext();

    ok(nextSecond !== second);

    ok(nextSecond.toStart().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0])));
    ok(nextSecond.toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 1, 0])));

    // Original second isn't altered
    ok(second.toStart().isEqual(new DateTime([1970, 1, 3, 3, 59, 59, 0])));
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0])));
  });

  test('[Second] toNext :: Next month', function () {
    var second = new Second('1970-01-31T23:59:58', UTC_TIMEZONE);
    var nextSecond = second.toNext();

    ok(nextSecond.toStart().isEqual(new DateTime([1970, 1, 31, 23, 59, 59, 0])));
    ok(nextSecond.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Second] toNext :: Next year', function () {
    var second = new Second('2016-12-31T23:59:58', UTC_TIMEZONE);
    var nextSecond = second.toNext();

    ok(nextSecond.toStart().isEqual(new DateTime([2016, 12, 31, 23, 59, 59, 0])));
    ok(nextSecond.toEnd().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0])));
  });

  test('[Second] toNext :: Timezone', function () {
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

    var second = new Second('1970-01-03T00:30:45', TEST_TIMEZONE);
    var nextSecond = second.toNext();

    ok(nextSecond !== second);

    ok(nextSecond.toStart().isEqual(new DateTime([1970, 1, 3, 0, 30, 46, 0], TEST_TIMEZONE)));
    ok(nextSecond.toEnd().isEqual(new DateTime([1970, 1, 3, 0, 30, 47, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous second
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] toPrev', function () {
    var second = new Second('1970-01-03T03:00:00', UTC_TIMEZONE);
    var prevSecond = second.toPrev();

    ok(prevSecond !== second);

    ok(prevSecond.toStart().isEqual(new DateTime([1970, 1, 3, 2, 59, 59, 0])));
    ok(prevSecond.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));

    // Original second isn't altered
    ok(second.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
    ok(second.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 1, 0])));
  });

  test('[Second] toPrev :: Previous month', function () {
    var second = new Second('1970-02-01T00:00:00.999', UTC_TIMEZONE);
    var prevSecond = second.toPrev();

    ok(prevSecond.toStart().isEqual(new DateTime([1970, 1, 31, 23, 59, 59, 0])));
    ok(prevSecond.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Second] toPrev :: Previous year', function () {
    var second = new Second('2017-01-01T00:00:00', UTC_TIMEZONE);
    var prevSecond = second.toPrev();

    ok(prevSecond.toStart().isEqual(new DateTime([2016, 12, 31, 23, 59, 59, 0])));
    ok(prevSecond.toEnd().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0])));
  });

  test('[Second] toPrev :: Timezone', function () {
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

    var second = new Second('1970-01-03T03:00:00', TEST_TIMEZONE);
    var prevSecond = second.toPrev();

    ok(prevSecond !== second);

    ok(prevSecond.toStart().isEqual(new DateTime('1970-01-03T01:59:59+0000', TEST_TIMEZONE)));
    ok(prevSecond.toEnd().isEqual(new DateTime('1970-01-03T03:00:00+0100', TEST_TIMEZONE)));
    ok(prevSecond.valueOf() === 1000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] Display :: format', function () {
    var second = new Second('1970-01-03T03:00:00', UTC_TIMEZONE);
    ok(second.format('YYYY-MM-DD') === '1970-01-03 – 1970-01-03');
  });

  test('[Second] Display :: toISOString', function () {
    var second = new Second('1970-01-03T03:00:00', UTC_TIMEZONE);
    ok(second.toISOString() === '1970-01-03T03:00:00.000Z – 1970-01-03T03:00:01.000Z');
  });

  test('[Second] Display :: toLocaleString', function () {
    var second = new Second('1970-01-03T03:25:00', UTC_TIMEZONE);
    ok(second.toLocaleString() === '1/3/1970, 3:25:00 AM – 1/3/1970, 3:25:01 AM');
  });

  test('[Second] Display :: toString', function () {
    var second = new Second('1970-01-03T23:59:59', UTC_TIMEZONE);
    ok(second.toString() === 'Sat Jan 03 1970 23:59:59 GMT+0000 (UTC) – Sun Jan 04 1970 00:00:00 GMT+0000 (UTC)');
  });

  test('[Second] Display :: toUTCString', function () {
    var second = new Second('1970-01-03T14:59:45', UTC_TIMEZONE);
    ok(second.toUTCString() === 'Sat, 03 Jan 1970 14:59:45 GMT – Sat, 03 Jan 1970 14:59:46 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Second] toJSON', function () {
    var second = new Second('2016-05-01T14:30:59', UTC_TIMEZONE);
    ok(second.toJSON() === 'Sun May 01 2016 14:30:59 GMT+0000 (UTC) – Sun May 01 2016 14:31:00 GMT+0000 (UTC)');
  });

  test('[Second] valueOf', function () {
    var second;

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

    second = new Second('2016-08-01T12:59:59.444', UTC_TIMEZONE);
    ok(second.valueOf() === 1000);

    second = new Second('1970-01-03T02:59:59+0100', TEST_TIMEZONE);
    ok(second.valueOf() === 1000);
  });
})();
