(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  var Month = DateTime.Month;
  var Interval = DateTime.Interval;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] Class', function () {
    ok(typeof Month === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(864000000);

    var month = new Month();

    ok(month instanceof Month);
    ok(month instanceof Interval);

    ok(month.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(month.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Month] Create :: DateTime', function () {
    var dt = new DateTime([1970, 1, 11, 14, 0, 0, 0], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var month = new Month(dt);

    ok(month.toStart() !== dt);
    ok(month.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])) === true);
    ok(month.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])) === true);
  });

  test('[Month] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var month = new Month('1970-02-11');

    ok(month.toStart().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
    ok(month.toEnd().isEqual(new DateTime([1970, 3, 1, 0, 0, 0, 0])));
  });

  test('[Month] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var month = new Month(914400000);

    ok(month.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(month.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Month] Create :: String and timezone', function () {
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

    var month = new Month('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    ok(month.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(month.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] getMonth', function () {
    var month = new Month('1979-05', UTC_TIMEZONE);
    ok(month.getMonth() === 5);
  });

  test('[Month] getYear', function () {
    var month = new Month('1979-01', UTC_TIMEZONE);
    ok(month.getYear() === 1979);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next month
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] toNext', function () {
    var month = new Month('1970-01-11T03:00:00', UTC_TIMEZONE);
    var nextMonth = month.toNext();

    ok(nextMonth !== month);

    ok(nextMonth.toStart().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
    ok(nextMonth.toEnd().isEqual(new DateTime([1970, 3, 1, 0, 0, 0, 0])));

    // Original month isn't altered
    ok(month.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(month.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[Month] toNext :: Next year', function () {
    var month = new Month('1970-11-26T14:00:00', UTC_TIMEZONE);
    var nextMonth = month.toNext();

    ok(nextMonth.toStart().isEqual(new DateTime([1970, 12, 1, 0, 0, 0, 0])));
    ok(nextMonth.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
  });

  test('[Month] toNext :: Timezone', function () {
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

    var month = new Month('1970-01-02T14:00:00', TEST_TIMEZONE);
    var nextMonth = month.toNext();

    ok(nextMonth !== month);

    ok(nextMonth.toStart().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextMonth.toEnd().isEqual(new DateTime([1970, 3, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous month
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] toPrev', function () {
    var month = new Month('1970-05-15T03:00:00+0100', UTC_TIMEZONE);
    var prevMonth = month.toPrev();

    ok(prevMonth !== month);

    ok(prevMonth.toStart().isEqual(new DateTime([1970, 4, 1, 0, 0, 0, 0])));
    ok(prevMonth.toEnd().isEqual(new DateTime([1970, 5, 1, 0, 0, 0, 0])));

    // Original month isn't altered
    ok(month.toStart().isEqual(new DateTime([1970, 5, 1, 0, 0, 0, 0])));
    ok(month.toEnd().isEqual(new DateTime([1970, 6, 1, 0, 0, 0, 0])));
  });

  test('[Month] toPrev :: Previous year', function () {
    var month = new Month('1970-01-05T00:30:00', UTC_TIMEZONE);
    var prevMonth = month.toPrev();

    ok(prevMonth.toStart().isEqual(new DateTime([1969, 12, 1, 0, 0, 0, 0])));
    ok(prevMonth.toEnd().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
  });

  test('[Month] toPrev :: Timezone', function () {
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

    var month = new Month('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    var prevMonth = month.toPrev();

    ok(prevMonth !== month);

    ok(prevMonth.toStart().isEqual(new DateTime([1969, 12, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(prevMonth.toEnd().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toDays
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] toDays :: 31 days', function () {
    var month = new Month('2017-05-15', UTC_TIMEZONE);
    var days = month.toDays();

    ok(days.length === 31);

    var idx = days.length;
    while (idx--) {
      ok(days[idx].toStart().isEqual(new DateTime([2017, 5, idx + 1, 0, 0, 0, 0], UTC_TIMEZONE)));
      ok(days[idx].toEnd().isEqual(new DateTime([2017, 5, idx + 2, 0, 0, 0, 0], UTC_TIMEZONE)));
    }
  });

  test('[Month] toDays :: 30 days', function () {
    var month = new Month('2017-04-15', UTC_TIMEZONE);
    var days = month.toDays();

    ok(days.length === 30);

    var idx = days.length;
    while (idx--) {
      ok(days[idx].toStart().isEqual(new DateTime([2017, 4, idx + 1, 0, 0, 0, 0], UTC_TIMEZONE)));
      ok(days[idx].toEnd().isEqual(new DateTime([2017, 4, idx + 2, 0, 0, 0, 0], UTC_TIMEZONE)));
    }
  });

  test('[Month] toDays :: 29 days', function () {
    var month = new Month('2016-02-15', UTC_TIMEZONE);
    var days = month.toDays();

    ok(days.length === 29);

    var idx = days.length;
    while (idx--) {
      ok(days[idx].toStart().isEqual(new DateTime([2016, 2, idx + 1, 0, 0, 0, 0], UTC_TIMEZONE)));
      ok(days[idx].toEnd().isEqual(new DateTime([2016, 2, idx + 2, 0, 0, 0, 0], UTC_TIMEZONE)));
    }
  });

  test('[Month] toDays :: 28 days', function () {
    var month = new Month('2015-02-15', UTC_TIMEZONE);
    var days = month.toDays();

    ok(days.length === 28);

    var idx = days.length;
    while (idx--) {
      ok(days[idx].toStart().isEqual(new DateTime([2015, 2, idx + 1, 0, 0, 0, 0], UTC_TIMEZONE)));
      ok(days[idx].toEnd().isEqual(new DateTime([2015, 2, idx + 2, 0, 0, 0, 0], UTC_TIMEZONE)));
    }
  });

  test('[Month] toDays :: Timezone', function () {
    setTestTimezone({
      abbr: [
        'TST',
        'TST_1'
      ],
      dst: [
        false,
        true
      ],
      offset: [
        0,
        -60 // +0100
      ],
      until: [
        180000000, // 1970-01-03T02:00:00
        null
      ]
    });

    var month = new Month('2017-05-15', TEST_TIMEZONE);
    var days = month.toDays();

    ok(days.length === 31);

    var idx = days.length;
    while (idx--) {
      ok(days[idx].toStart().isEqual(new DateTime([2017, 5, idx + 1, 0, 0, 0, 0], TEST_TIMEZONE)));
      ok(days[idx].toEnd().isEqual(new DateTime([2017, 5, idx + 2, 0, 0, 0, 0], TEST_TIMEZONE)));
    }
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] Display :: format', function () {
    var month = new Month('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(month.format('YYYY-MM-DD') === '1970-01-01 – 1970-02-01');
  });

  test('[Month] Display :: toISOString', function () {
    var month = new Month('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(month.toISOString() === '1970-01-01T00:00:00.000Z – 1970-02-01T00:00:00.000Z');
  });

  test('[Month] Display :: toLocaleString', function () {
    var month = new Month('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(month.toLocaleString() === '1/1/1970, 12:00:00 AM – 2/1/1970, 12:00:00 AM');
  });

  test('[Month] Display :: toString', function () {
    var month = new Month('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(month.toString() === 'Thu Jan 01 1970 00:00:00 GMT+0000 (UTC) – Sun Feb 01 1970 00:00:00 GMT+0000 (UTC)');
  });

  test('[Month] Display :: toUTCString', function () {
    var month = new Month('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(month.toUTCString() === 'Thu, 01 Jan 1970 00:00:00 GMT – Sun, 01 Feb 1970 00:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] toJSON', function () {
    var month = new Month('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(month.toJSON() === 'Sun May 01 2016 00:00:00 GMT+0000 (UTC) – Wed Jun 01 2016 00:00:00 GMT+0000 (UTC)');
  });

  test('[Month] valueOf', function () {
    setTestTimezone({
      abbr: [
        'TST',
        'TST_1'
      ],
      dst: [
        false,
        true
      ],
      offset: [
        0,
        -60 // +0100
      ],
      until: [
        180000000, // 1970-01-03T02:00:00
        null
      ]
    });

    var month = new Month('2016-04-01', UTC_TIMEZONE);
    ok(month.valueOf() === 2592000000);

    month = new Month('2016-01-01', UTC_TIMEZONE);
    ok(month.valueOf() === 2678400000);

    month = new Month('2016-02-05', UTC_TIMEZONE);
    ok(month.valueOf() === 2505600000);

    month = new Month('2017-02-05', UTC_TIMEZONE);
    ok(month.valueOf() === 2419200000);

    month = new Month('1970-01-03', TEST_TIMEZONE);
    ok(month.valueOf() === 2674800000);
  });
})();
