(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  var MonthWeeks = DateTime.MonthWeeks;
  var Interval = DateTime.Interval;

  var monthWeeks;
  var weeks;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] Class', function () {
    ok(typeof MonthWeeks === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(8640000000);

    monthWeeks = new MonthWeeks();

    ok(monthWeeks instanceof MonthWeeks);
    ok(monthWeeks instanceof Interval);

    ok(monthWeeks.toStart().isEqual(new DateTime([1970, 3, 29, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 5, 3, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] Create :: DateTime', function () {
    var dt = new DateTime([1970, 2, 15, 14, 0, 0, 0], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    monthWeeks = new MonthWeeks(dt);

    ok(monthWeeks.toStart() !== dt);
    ok(monthWeeks.toStart().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])) === true);
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 3, 1, 0, 0, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 2, 15, 14, 0, 0, 0])) === true);
  });

  test('[MonthWeeks] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    monthWeeks = new MonthWeeks('1970-09-15');

    ok(monthWeeks.toStart().isEqual(new DateTime([1970, 8, 30, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 10, 4, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    monthWeeks = new MonthWeeks(914400000);

    ok(monthWeeks.toStart().isEqual(new DateTime([1969, 12, 28, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] Create :: String and timezone', function () {
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

    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    ok(monthWeeks.toStart().isEqual(new DateTime([1969, 12, 28, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next monthWeeks
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] toNext', function () {
    monthWeeks = new MonthWeeks('1970-05-11T03:00:00', UTC_TIMEZONE);

    var nextMonthWeeks = monthWeeks.toNext();

    ok(nextMonthWeeks !== monthWeeks);

    ok(nextMonthWeeks.toStart().isEqual(new DateTime([1970, 5, 31, 0, 0, 0, 0])));
    ok(nextMonthWeeks.toEnd().isEqual(new DateTime([1970, 7, 5, 0, 0, 0, 0])));

    // Original monthWeeks isn't altered
    ok(monthWeeks.toStart().isEqual(new DateTime([1970, 4, 26, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 6, 7, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] toNext :: Next year', function () {
    monthWeeks = new MonthWeeks('1970-11-26T14:00:00', UTC_TIMEZONE);

    var nextMonthWeeks = monthWeeks.toNext();

    ok(nextMonthWeeks.toStart().isEqual(new DateTime([1970, 11, 29, 0, 0, 0, 0])));
    ok(nextMonthWeeks.toEnd().isEqual(new DateTime([1971, 1, 3, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] toNext :: Timezone', function () {
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

    monthWeeks = new MonthWeeks('1970-01-02T14:00:00', TEST_TIMEZONE);

    var nextMonthWeeks = monthWeeks.toNext();

    ok(nextMonthWeeks !== monthWeeks);

    ok(nextMonthWeeks.toStart().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextMonthWeeks.toEnd().isEqual(new DateTime([1970, 3, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous monthWeeks
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] toPrev', function () {
    monthWeeks = new MonthWeeks('1970-05-15T03:00:00+0100', UTC_TIMEZONE);

    var prevMonthWeeks = monthWeeks.toPrev();

    ok(prevMonthWeeks !== monthWeeks);

    ok(prevMonthWeeks.toStart().isEqual(new DateTime([1970, 3, 29, 0, 0, 0, 0])));
    ok(prevMonthWeeks.toEnd().isEqual(new DateTime([1970, 5, 3, 0, 0, 0, 0])));

    // Original monthWeeks isn't altered
    ok(monthWeeks.toStart().isEqual(new DateTime([1970, 4, 26, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 6, 7, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] toPrev :: Previous year', function () {
    monthWeeks = new MonthWeeks('1970-02-15T00:30:00', UTC_TIMEZONE);

    var prevMonthWeeks = monthWeeks.toPrev();

    ok(prevMonthWeeks.toStart().isEqual(new DateTime([1969, 12, 28, 0, 0, 0, 0])));
    ok(prevMonthWeeks.toEnd().isEqual(new DateTime([1970, 2, 1, 0, 0, 0, 0])));
  });

  test('[MonthWeeks] toPrev :: Timezone', function () {
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

    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    var prevMonthWeeks = monthWeeks.toPrev();

    ok(prevMonthWeeks !== monthWeeks);

    ok(prevMonthWeeks.toStart().isEqual(new DateTime([1969, 11, 30, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(prevMonthWeeks.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toWeeks
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] toWeeks :: 4 weeks', function () {
    monthWeeks = new MonthWeeks('2015-02-01', UTC_TIMEZONE);
    weeks = monthWeeks.toWeeks();

    ok(weeks.length === 4);

    ok(weeks[0].toStart().isEqual(new DateTime([2015, 2, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[0].toEnd().isEqual(new DateTime([2015, 2, 8, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[1].toStart().isEqual(new DateTime([2015, 2, 8, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[1].toEnd().isEqual(new DateTime([2015, 2, 15, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[2].toStart().isEqual(new DateTime([2015, 2, 15, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[2].toEnd().isEqual(new DateTime([2015, 2, 22, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[3].toStart().isEqual(new DateTime([2015, 2, 22, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[3].toEnd().isEqual(new DateTime([2015, 2, 29, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[MonthWeeks] toWeeks :: 5 weeks', function () {
    monthWeeks = new MonthWeeks('2017-01-01', UTC_TIMEZONE);
    weeks = monthWeeks.toWeeks();

    ok(weeks.length === 5);

    ok(weeks[0].toStart().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[0].toEnd().isEqual(new DateTime([2017, 1, 8, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[1].toStart().isEqual(new DateTime([2017, 1, 8, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[1].toEnd().isEqual(new DateTime([2017, 1, 15, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[2].toStart().isEqual(new DateTime([2017, 1, 15, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[2].toEnd().isEqual(new DateTime([2017, 1, 22, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[3].toStart().isEqual(new DateTime([2017, 1, 22, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[3].toEnd().isEqual(new DateTime([2017, 1, 29, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[4].toStart().isEqual(new DateTime([2017, 1, 29, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[4].toEnd().isEqual(new DateTime([2017, 2, 5, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[MonthWeeks] toWeeks :: 6 weeks', function () {
    monthWeeks = new MonthWeeks('2017-04-01', UTC_TIMEZONE);
    weeks = monthWeeks.toWeeks();

    ok(weeks.length === 6);

    ok(weeks[0].toStart().isEqual(new DateTime([2017, 3, 26, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[0].toEnd().isEqual(new DateTime([2017, 4, 2, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[1].toStart().isEqual(new DateTime([2017, 4, 2, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[1].toEnd().isEqual(new DateTime([2017, 4, 9, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[2].toStart().isEqual(new DateTime([2017, 4, 9, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[2].toEnd().isEqual(new DateTime([2017, 4, 16, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[3].toStart().isEqual(new DateTime([2017, 4, 16, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[3].toEnd().isEqual(new DateTime([2017, 4, 23, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[4].toStart().isEqual(new DateTime([2017, 4, 23, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[4].toEnd().isEqual(new DateTime([2017, 4, 30, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[5].toStart().isEqual(new DateTime([2017, 4, 30, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[5].toEnd().isEqual(new DateTime([2017, 5, 7, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[MonthWeeks] toWeeks :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

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

    monthWeeks = new MonthWeeks('2017-01-01', TEST_TIMEZONE);
    weeks = monthWeeks.toWeeks();

    ok(weeks.length === 5);

    ok(weeks[0].toStart().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(weeks[0].toEnd().isEqual(new DateTime([2017, 1, 8, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(weeks[1].toStart().isEqual(new DateTime([2017, 1, 8, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(weeks[1].toEnd().isEqual(new DateTime([2017, 1, 15, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(weeks[2].toStart().isEqual(new DateTime([2017, 1, 15, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(weeks[2].toEnd().isEqual(new DateTime([2017, 1, 22, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(weeks[3].toStart().isEqual(new DateTime([2017, 1, 22, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(weeks[3].toEnd().isEqual(new DateTime([2017, 1, 29, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(weeks[4].toStart().isEqual(new DateTime([2017, 1, 29, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(weeks[4].toEnd().isEqual(new DateTime([2017, 2, 5, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] Display :: format', function () {
    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(monthWeeks.format('YYYY-MM-DD') === '1969-12-28 – 1970-02-01');
  });

  test('[MonthWeeks] Display :: toISOString', function () {
    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(monthWeeks.toISOString() === '1969-12-28T00:00:00.000Z – 1970-02-01T00:00:00.000Z');
  });

  test('[MonthWeeks] Display :: toLocaleString', function () {
    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(monthWeeks.toLocaleString() === '12/28/1969, 12:00:00 AM – 2/1/1970, 12:00:00 AM');
  });

  test('[MonthWeeks] Display :: toString', function () {
    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(monthWeeks.toString() === 'Sun Dec 28 1969 00:00:00 GMT+0000 (UTC) – Sun Feb 01 1970 00:00:00 GMT+0000 (UTC)');
  });

  test('[MonthWeeks] Display :: toUTCString', function () {
    monthWeeks = new MonthWeeks('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(monthWeeks.toUTCString() === 'Sun, 28 Dec 1969 00:00:00 GMT – Sun, 01 Feb 1970 00:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[MonthWeeks] toJSON', function () {
    monthWeeks = new MonthWeeks('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(monthWeeks.toJSON() === 'Sun May 01 2016 00:00:00 GMT+0000 (UTC) – Sun Jun 05 2016 00:00:00 GMT+0000 (UTC)');
  });

  test('[MonthWeeks] valueOf', function () {
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

    monthWeeks = new MonthWeeks('2016-04-01', UTC_TIMEZONE);
    ok(monthWeeks.valueOf() === 3024000000);

    monthWeeks = new MonthWeeks('2016-01-01', UTC_TIMEZONE);
    ok(monthWeeks.valueOf() === 3628800000);

    monthWeeks = new MonthWeeks('1970-01-03', TEST_TIMEZONE);
    ok(monthWeeks.valueOf() === 3020400000);
  });
})();
