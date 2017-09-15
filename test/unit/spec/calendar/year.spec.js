(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  var Year = DateTime.Year;
  var Interval = DateTime.Interval;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] Class', function () {
    ok(typeof Year === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(864000000);

    var year = new Year();

    ok(year instanceof Year);
    ok(year instanceof Interval);

    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
  });

  test('[Year] Create :: DateTime', function () {
    var dt = new DateTime([1970, 1, 11, 14, 0, 0, 0], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var year = new Year(dt);

    ok(year.toStart() !== dt);
    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])) === true);
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])) === true);
  });

  test('[Year] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var year = new Year('1970-02-11');

    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
  });

  test('[Year] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var year = new Year(914400000);

    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
  });

  test('[Year] Create :: String and timezone', function () {
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

    var year = new Year('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next year
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] toNext', function () {
    var year = new Year('1970-01-11T03:00:00', UTC_TIMEZONE);
    var nextYear = year.toNext();

    ok(nextYear !== year);

    ok(nextYear.toStart().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
    ok(nextYear.toEnd().isEqual(new DateTime([1972, 1, 1, 0, 0, 0, 0])));

    // Original year isn't altered
    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
  });

  test('[Year] toNext :: Timezone', function () {
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

    var year = new Year('1970-01-02T14:00:00', TEST_TIMEZONE);
    var nextYear = year.toNext();

    ok(nextYear !== year);

    ok(nextYear.toStart().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextYear.toEnd().isEqual(new DateTime([1972, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous year
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] toPrev', function () {
    var year = new Year('1970-05-15T03:00:00+0100', UTC_TIMEZONE);
    var prevYear = year.toPrev();

    ok(prevYear !== year);

    ok(prevYear.toStart().isEqual(new DateTime([1969, 1, 1, 0, 0, 0, 0])));
    ok(prevYear.toEnd().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));

    // Original year isn't altered
    ok(year.toStart().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
    ok(year.toEnd().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
  });

  test('[Year] toPrev :: Timezone', function () {
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

    var year = new Year('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    var prevYear = year.toPrev();

    ok(prevYear !== year);

    ok(prevYear.toStart().isEqual(new DateTime([1969, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(prevYear.toEnd().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] getYear', function () {
    var year;

    year = new Year('2017-01-01', UTC_TIMEZONE);
    ok(year.getYear() === 2017);

    year = new Year('1955-05-15', UTC_TIMEZONE);
    ok(year.getYear() === 1955);

    year = new Year('2000-15-01', UTC_TIMEZONE);
    ok(year.getYear() === 2001);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * To months
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] toMonths :: UTC', function () {
    var year = new Year('2017-01-01', UTC_TIMEZONE);
    var months = year.toMonths();

    ok(months.length === 12);

    ok(months[0].toStart().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[0].toEnd().isEqual(new DateTime([2017, 2, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[1].toStart().isEqual(new DateTime([2017, 2, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[1].toEnd().isEqual(new DateTime([2017, 3, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[2].toStart().isEqual(new DateTime([2017, 3, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[2].toEnd().isEqual(new DateTime([2017, 4, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[3].toStart().isEqual(new DateTime([2017, 4, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[3].toEnd().isEqual(new DateTime([2017, 5, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[4].toStart().isEqual(new DateTime([2017, 5, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[4].toEnd().isEqual(new DateTime([2017, 6, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[5].toStart().isEqual(new DateTime([2017, 6, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[5].toEnd().isEqual(new DateTime([2017, 7, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[6].toStart().isEqual(new DateTime([2017, 7, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[6].toEnd().isEqual(new DateTime([2017, 8, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[7].toStart().isEqual(new DateTime([2017, 8, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[7].toEnd().isEqual(new DateTime([2017, 9, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[8].toStart().isEqual(new DateTime([2017, 9, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[8].toEnd().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[9].toStart().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[9].toEnd().isEqual(new DateTime([2017, 11, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[10].toStart().isEqual(new DateTime([2017, 11, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[10].toEnd().isEqual(new DateTime([2017, 12, 1, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(months[11].toStart().isEqual(new DateTime([2017, 12, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(months[11].toEnd().isEqual(new DateTime([2018, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[Year] toMonths :: Timezone', function () {
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

    var year = new Year('2017-01-01', TEST_TIMEZONE);
    var months = year.toMonths();

    ok(months.length === 12);

    ok(months[0].toStart().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[0].toEnd().isEqual(new DateTime([2017, 2, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[1].toStart().isEqual(new DateTime([2017, 2, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[1].toEnd().isEqual(new DateTime([2017, 3, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[2].toStart().isEqual(new DateTime([2017, 3, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[2].toEnd().isEqual(new DateTime([2017, 4, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[3].toStart().isEqual(new DateTime([2017, 4, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[3].toEnd().isEqual(new DateTime([2017, 5, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[4].toStart().isEqual(new DateTime([2017, 5, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[4].toEnd().isEqual(new DateTime([2017, 6, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[5].toStart().isEqual(new DateTime([2017, 6, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[5].toEnd().isEqual(new DateTime([2017, 7, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[6].toStart().isEqual(new DateTime([2017, 7, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[6].toEnd().isEqual(new DateTime([2017, 8, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[7].toStart().isEqual(new DateTime([2017, 8, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[7].toEnd().isEqual(new DateTime([2017, 9, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[8].toStart().isEqual(new DateTime([2017, 9, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[8].toEnd().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[9].toStart().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[9].toEnd().isEqual(new DateTime([2017, 11, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[10].toStart().isEqual(new DateTime([2017, 11, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[10].toEnd().isEqual(new DateTime([2017, 12, 1, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(months[11].toStart().isEqual(new DateTime([2017, 12, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(months[11].toEnd().isEqual(new DateTime([2018, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * To month weeks
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] toMonthWeeks :: UTC', function () {
    var year = new Year('2017-01-01', UTC_TIMEZONE);
    var monthWeeks = year.toMonthWeeks();

    ok(monthWeeks.length === 12);

    ok(monthWeeks[0].toStart().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[0].toEnd().isEqual(new DateTime([2017, 2, 5, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[1].toStart().isEqual(new DateTime([2017, 1, 29, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[1].toEnd().isEqual(new DateTime([2017, 3, 5, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[2].toStart().isEqual(new DateTime([2017, 2, 26, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[2].toEnd().isEqual(new DateTime([2017, 4, 2, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[3].toStart().isEqual(new DateTime([2017, 3, 26, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[3].toEnd().isEqual(new DateTime([2017, 5, 7, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[4].toStart().isEqual(new DateTime([2017, 4, 30, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[4].toEnd().isEqual(new DateTime([2017, 6, 4, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[5].toStart().isEqual(new DateTime([2017, 5, 28, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[5].toEnd().isEqual(new DateTime([2017, 7, 2, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[6].toStart().isEqual(new DateTime([2017, 6, 25, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[6].toEnd().isEqual(new DateTime([2017, 8, 6, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[7].toStart().isEqual(new DateTime([2017, 7, 30, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[7].toEnd().isEqual(new DateTime([2017, 9, 3, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[8].toStart().isEqual(new DateTime([2017, 8, 27, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[8].toEnd().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], UTC_TIMEZONE)));


    ok(monthWeeks[9].toStart().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[9].toEnd().isEqual(new DateTime([2017, 11, 5, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[10].toStart().isEqual(new DateTime([2017, 10, 29, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[10].toEnd().isEqual(new DateTime([2017, 12, 3, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(monthWeeks[11].toStart().isEqual(new DateTime([2017, 11, 26, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(monthWeeks[11].toEnd().isEqual(new DateTime([2018, 1, 7, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[Year] toMonthWeeks :: Timezone', function () {
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

    var year = new Year('2017-01-01', TEST_TIMEZONE);
    var monthWeeks = year.toMonthWeeks();

    ok(monthWeeks.length === 12);

    ok(monthWeeks[0].toStart().isEqual(new DateTime([2017, 1, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[0].toEnd().isEqual(new DateTime([2017, 2, 5, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[1].toStart().isEqual(new DateTime([2017, 1, 29, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[1].toEnd().isEqual(new DateTime([2017, 3, 5, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[2].toStart().isEqual(new DateTime([2017, 2, 26, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[2].toEnd().isEqual(new DateTime([2017, 4, 2, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[3].toStart().isEqual(new DateTime([2017, 3, 26, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[3].toEnd().isEqual(new DateTime([2017, 5, 7, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[4].toStart().isEqual(new DateTime([2017, 4, 30, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[4].toEnd().isEqual(new DateTime([2017, 6, 4, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[5].toStart().isEqual(new DateTime([2017, 5, 28, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[5].toEnd().isEqual(new DateTime([2017, 7, 2, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[6].toStart().isEqual(new DateTime([2017, 6, 25, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[6].toEnd().isEqual(new DateTime([2017, 8, 6, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[7].toStart().isEqual(new DateTime([2017, 7, 30, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[7].toEnd().isEqual(new DateTime([2017, 9, 3, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[8].toStart().isEqual(new DateTime([2017, 8, 27, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[8].toEnd().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], TEST_TIMEZONE)));


    ok(monthWeeks[9].toStart().isEqual(new DateTime([2017, 10, 1, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[9].toEnd().isEqual(new DateTime([2017, 11, 5, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[10].toStart().isEqual(new DateTime([2017, 10, 29, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[10].toEnd().isEqual(new DateTime([2017, 12, 3, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(monthWeeks[11].toStart().isEqual(new DateTime([2017, 11, 26, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(monthWeeks[11].toEnd().isEqual(new DateTime([2018, 1, 7, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] Display :: format', function () {
    var year = new Year('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(year.format('YYYY-MM-DD') === '1970-01-01 – 1971-01-01');
  });

  test('[Year] Display :: toISOString', function () {
    var year = new Year('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(year.toISOString() === '1970-01-01T00:00:00.000Z – 1971-01-01T00:00:00.000Z');
  });

  test('[Year] Display :: toLocaleString', function () {
    var year = new Year('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(year.toLocaleString() === '1/1/1970, 12:00:00 AM – 1/1/1971, 12:00:00 AM');
  });

  test('[Year] Display :: toString', function () {
    var year = new Year('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(year.toString() === 'Thu Jan 01 1970 00:00:00 GMT+0000 (UTC) – Fri Jan 01 1971 00:00:00 GMT+0000 (UTC)');
  });

  test('[Year] Display :: toUTCString', function () {
    var year = new Year('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(year.toUTCString() === 'Thu, 01 Jan 1970 00:00:00 GMT – Fri, 01 Jan 1971 00:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Year] isLeap', function () {
    var year;

    year = new Year('2012', UTC_TIMEZONE);
    ok(year.isLeap() === true);

    year = new Year('2014', UTC_TIMEZONE);
    ok(year.isLeap() === false);

    year = new Year('2015', UTC_TIMEZONE);
    ok(year.isLeap() === false);

    year = new Year('2016', UTC_TIMEZONE);
    ok(year.isLeap() === true);

    year = new Year('2017', UTC_TIMEZONE);
    ok(year.isLeap() === false);

    year = new Year('1900', UTC_TIMEZONE);
    ok(year.isLeap() === false);

    year = new Year('2000', UTC_TIMEZONE);
    ok(year.isLeap() === true);

    year = new Year('2100', UTC_TIMEZONE);
    ok(year.isLeap() === false);

    year = new Year('2200', UTC_TIMEZONE);
    ok(year.isLeap() === false);

    year = new Year('2300', UTC_TIMEZONE);
    ok(year.isLeap() === false);
  });

  test('[Year] toJSON', function () {
    var year = new Year('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(year.toJSON() === 'Fri Jan 01 2016 00:00:00 GMT+0000 (UTC) – Sun Jan 01 2017 00:00:00 GMT+0000 (UTC)');
  });

  test('[Year] valueOf', function () {
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

    var year = new Year('2016-05-01', UTC_TIMEZONE);
    ok(year.valueOf() === 31622400000);

    year = new Year('2017-05-01', UTC_TIMEZONE);
    ok(year.valueOf() === 31536000000);

    year = new Year('1970-01-03', TEST_TIMEZONE);
    ok(year.valueOf() === 31532400000);
  });
})();
