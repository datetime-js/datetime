(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  var Minute = DateTime.Minute;
  var Interval = DateTime.Interval;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] Class', function () {
    ok(typeof Minute === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(880235000);

    var minute = new Minute();

    ok(minute instanceof Minute);
    ok(minute instanceof Interval);

    ok(minute.toStart().isEqual(new DateTime([1970, 1, 11, 4, 30, 0, 0])));
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 11, 4, 31, 0, 0])));
  });

  test('[Minute] Create :: DateTime', function () {
    var dt = new DateTime([1970, 1, 11, 14, 25, 15, 0], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var minute = new Minute(dt);

    ok(minute.toStart() !== dt);
    ok(minute.toStart().isEqual(new DateTime([1970, 1, 11, 14, 25, 0, 0])) === true);
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 11, 14, 26, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 25, 15, 0])) === true);
  });

  test('[Minute] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var minute = new Minute('1970-01-11');

    ok(minute.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 11, 0, 1, 0, 0])));
  });

  test('[Minute] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var minute = new Minute(914420000);

    ok(minute.toStart().isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])));
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 11, 14, 1, 0, 0])));
  });

  test('[Minute] Create :: String and timezone', function () {
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

    var minute = new Minute('1970-01-03T03:27:00+0100', TEST_TIMEZONE);

    ok(minute.toStart().isEqual(new DateTime([1970, 1, 3, 3, 27, 0, 0], TEST_TIMEZONE)));
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 28, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] getMinute', function () {
    var minute = new Minute('1979-05-03T11:55:44+0100', UTC_TIMEZONE);
    ok(minute.getMinute() === 55);
  });

  test('[Minute] getHour', function () {
    var minute = new Minute('1979-05-03T11:00:44+0100', UTC_TIMEZONE);
    ok(minute.getHour() === 10);
  });

  test('[Minute] getDayOfWeek', function () {
    var minute;

    minute = new Minute('1979-04-29T03:00:44+0100', UTC_TIMEZONE);
    ok(minute.getDayOfWeek() === 0);

    minute = new Minute('1979-05-05T03:00:44+0100', UTC_TIMEZONE);
    ok(minute.getDayOfWeek() === 6);
  });

  test('[Minute] getDayOfMonth', function () {
    var minute = new Minute('1979-05-03T03:00:44+0100', UTC_TIMEZONE);
    ok(minute.getDayOfMonth() === 3);
  });

  test('[Minute] getMonth', function () {
    var minute = new Minute('1979-05-03T03:00:44+0100', UTC_TIMEZONE);
    ok(minute.getMonth() === 5);
  });

  test('[Minute] getYear', function () {
    var minute = new Minute('1979-01-03T03:00:44+0100', UTC_TIMEZONE);
    ok(minute.getYear() === 1979);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next minute
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] toNext', function () {
    var minute = new Minute('1970-01-03T03:59:59+0100', UTC_TIMEZONE);
    var nextMinute = minute.toNext();

    ok(nextMinute !== minute);

    ok(nextMinute.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
    ok(nextMinute.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 1, 0, 0])));

    // Original minute isn't altered
    ok(minute.toStart().isEqual(new DateTime([1970, 1, 3, 2, 59, 0, 0])));
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
  });

  test('[Minute] toNext :: Next month', function () {
    var minute = new Minute('1970-01-31T23:58:59', UTC_TIMEZONE);
    var nextMinute = minute.toNext();

    ok(nextMinute.toStart().isEqual(new DateTime([1970, 1, 31, 23, 59, 0, 0])));
    ok(nextMinute.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Minute] toNext :: Next year', function () {
    var minute = new Minute('2016-12-31T23:58:59', UTC_TIMEZONE);
    var nextMinute = minute.toNext();

    ok(nextMinute.toStart().isEqual(new DateTime([2016, 12, 31, 23, 59, 0, 0])));
    ok(nextMinute.toEnd().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0])));
  });

  test('[Minute] toNext :: Timezone', function () {
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

    var minute = new Minute('1970-01-03T00:30:45', TEST_TIMEZONE);
    var nextMinute = minute.toNext();

    ok(nextMinute !== minute);

    ok(nextMinute.toStart().isEqual(new DateTime([1970, 1, 3, 0, 31, 0, 0], TEST_TIMEZONE)));
    ok(nextMinute.toEnd().isEqual(new DateTime([1970, 1, 3, 0, 32, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous minute
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] toPrev', function () {
    var minute = new Minute('1970-01-03T03:00:00', UTC_TIMEZONE);
    var prevMinute = minute.toPrev();

    ok(prevMinute !== minute);

    ok(prevMinute.toStart().isEqual(new DateTime([1970, 1, 3, 2, 59, 0, 0])));
    ok(prevMinute.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));

    // Original minute isn't altered
    ok(minute.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
    ok(minute.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 1, 0, 0])));
  });

  test('[Minute] toPrev :: Previous month', function () {
    var minute = new Minute('1970-02-01T00:00:30', UTC_TIMEZONE);
    var prevMinute = minute.toPrev();

    ok(prevMinute.toStart().isEqual(new DateTime([1970, 1, 31, 23, 59, 0, 0])));
    ok(prevMinute.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Minute] toPrev :: Previous year', function () {
    var minute = new Minute('2017-01-01T00:00:00', UTC_TIMEZONE);
    var prevMinute = minute.toPrev();

    ok(prevMinute.toStart().isEqual(new DateTime([2016, 12, 31, 23, 59, 0, 0])));
    ok(prevMinute.toEnd().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0])));
  });

  test('[Minute] toPrev :: Timezone', function () {
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

    var minute = new Minute('1970-01-03T03:00:00', TEST_TIMEZONE);
    var prevMinute = minute.toPrev();

    ok(prevMinute !== minute);

    ok(prevMinute.toStart().isEqual(new DateTime('1970-01-03T01:59:00+0000', TEST_TIMEZONE)));
    ok(prevMinute.toEnd().isEqual(new DateTime('1970-01-03T03:00:00+0100', TEST_TIMEZONE)));
    ok(prevMinute.valueOf() === 60000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toSeconds
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] toSeconds', function () {
    var minute = new Minute('2017-05-15T14:30:00', UTC_TIMEZONE);
    var seconds = minute.toSeconds();
    var idx = seconds.length;

    var expectedMinute;
    var expectedSecond;

    ok(seconds.length === 60);

    while (idx--) {
      ok(seconds[idx].toStart().isEqual(
        new DateTime([2017, 5, 15, 14, 30, idx, 0], UTC_TIMEZONE)
      ));

      expectedMinute = idx === 59 ? 31 : 30;
      expectedSecond = idx === 59 ? 0 : idx + 1;

      ok(seconds[idx].toEnd().isEqual(
        new DateTime([2017, 5, 15, 14, expectedMinute, expectedSecond, 0], UTC_TIMEZONE)
      ));
    }
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] Display :: format', function () {
    var minute = new Minute('1970-01-03T03:00:00', UTC_TIMEZONE);
    ok(minute.format('YYYY-MM-DD') === '1970-01-03 – 1970-01-03');
  });

  test('[Minute] Display :: toISOString', function () {
    var minute = new Minute('1970-01-03T03:00:00', UTC_TIMEZONE);
    ok(minute.toISOString() === '1970-01-03T03:00:00.000Z – 1970-01-03T03:01:00.000Z');
  });

  test('[Minute] Display :: toLocaleString', function () {
    var minute = new Minute('1970-01-03T03:25:00', UTC_TIMEZONE);
    ok(minute.toLocaleString() === '1/3/1970, 3:25:00 AM – 1/3/1970, 3:26:00 AM');
  });

  test('[Minute] Display :: toString', function () {
    var minute = new Minute('1970-01-03T23:59:00', UTC_TIMEZONE);
    ok(minute.toString() === 'Sat Jan 03 1970 23:59:00 GMT+0000 (UTC) – Sun Jan 04 1970 00:00:00 GMT+0000 (UTC)');
  });

  test('[Minute] Display :: toUTCString', function () {
    var minute = new Minute('1970-01-03T14:59:45', UTC_TIMEZONE);
    ok(minute.toUTCString() === 'Sat, 03 Jan 1970 14:59:00 GMT – Sat, 03 Jan 1970 15:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Minute] toJSON', function () {
    var minute = new Minute('2016-05-01T14:30:59', UTC_TIMEZONE);
    ok(minute.toJSON() === 'Sun May 01 2016 14:30:00 GMT+0000 (UTC) – Sun May 01 2016 14:31:00 GMT+0000 (UTC)');
  });

  test('[Minute] valueOf', function () {
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

    var minute = new Minute('2016-08-01T12:59:59.444', UTC_TIMEZONE);
    ok(minute.valueOf() === 60000);

    minute = new Minute('1970-01-03T02:59:59+0100', TEST_TIMEZONE);
    ok(minute.valueOf() === 60000);
  });
})();
