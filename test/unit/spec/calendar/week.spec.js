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
  var MonthWeeks = DateTime.MonthWeeks;
  var Week = DateTime.Week;
  var Year = DateTime.Year;
  var Interval = DateTime.Interval;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] Class', function () {
    ok(typeof Week === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(864000000);

    var week = new Week();

    ok(week instanceof Week);
    ok(week instanceof Interval);

    ok(week.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])));
  });

  test('[Week] Create :: DateTime', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var dt = new DateTime([1970, 1, 11, 14, 0, 0, 0], UTC_TIMEZONE);
    var week = new Week(dt);

    ok(week.toStart() !== dt);
    ok(week.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])) === true);
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])) === true);
  });

  test('[Week] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var week = new Week('1970-01-11');

    ok(week.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])));
  });

  test('[Week] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var week = new Week(914400000);

    ok(week.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])));
  });

  test('[Week] Create :: String and timezone', function () {
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

    var week = new Week('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    ok(week.toStart().isEqual(new DateTime([1969, 12, 28, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] getWeekOfYear', function () {
    var week = new Week('1979-05-03', UTC_TIMEZONE);
    ok(week.getWeekOfYear() === 18);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next week
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] toNext', function () {
    var week = new Week('1970-01-11T03:00:00', UTC_TIMEZONE);
    var nextWeek = week.toNext();

    ok(nextWeek !== week);

    ok(nextWeek.toStart().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])));
    ok(nextWeek.toEnd().isEqual(new DateTime([1970, 1, 25, 0, 0, 0, 0])));

    // Original week isn't altered
    ok(week.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])));
  });

  test('[Week] toNext :: Next month', function () {
    var week = new Week('1970-11-25T05:00:00', UTC_TIMEZONE);
    var nextWeek = week.toNext();

    ok(nextWeek.toStart().isEqual(new DateTime([1970, 11, 29, 0, 0, 0, 0])));
    ok(nextWeek.toEnd().isEqual(new DateTime([1970, 12, 6, 0, 0, 0, 0])));
  });

  test('[Week] toNext :: Next year', function () {
    var week = new Week('1970-12-26T14:00:00', UTC_TIMEZONE);
    var nextWeek = week.toNext();

    ok(nextWeek.toStart().isEqual(new DateTime([1970, 12, 27, 0, 0, 0, 0])));
    ok(nextWeek.toEnd().isEqual(new DateTime([1971, 1, 3, 0, 0, 0, 0])));
  });

  test('[Week] toNext :: Timezone', function () {
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

    var week = new Week('1970-01-02T14:00:00', TEST_TIMEZONE);
    var nextWeek = week.toNext();

    ok(nextWeek !== week);

    ok(nextWeek.toStart().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextWeek.toEnd().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous week
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] toPrev', function () {
    var week = new Week('1970-01-15T03:00:00+0100', UTC_TIMEZONE);
    var prevWeek = week.toPrev();

    ok(prevWeek !== week);

    ok(prevWeek.toStart().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0])));
    ok(prevWeek.toEnd().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));

    // Original week isn't altered
    ok(week.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 18, 0, 0, 0, 0])));
  });

  test('[Week] toPrev :: Previous month', function () {
    var week = new Week('1970-05-05T00:30:00', UTC_TIMEZONE);
    var prevWeek = week.toPrev();

    ok(prevWeek.toStart().isEqual(new DateTime([1970, 4, 26, 0, 0, 0, 0])));
    ok(prevWeek.toEnd().isEqual(new DateTime([1970, 5, 3, 0, 0, 0, 0])));
  });

  test('[Week] toPrev :: Previous year', function () {
    var week = new Week('1970-01-05T00:30:00', UTC_TIMEZONE);
    var prevWeek = week.toPrev();

    ok(prevWeek.toStart().isEqual(new DateTime([1969, 12, 28, 0, 0, 0, 0])));
    ok(prevWeek.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0])));
  });

  test('[Week] toPrev :: Timezone', function () {
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

    var week = new Week('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    var prevWeek = week.toPrev();

    ok(prevWeek !== week);

    ok(prevWeek.toStart().isEqual(new DateTime([1969, 12, 21, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(prevWeek.toEnd().isEqual(new DateTime([1969, 12, 28, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toDays
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] toDays', function () {
    var week = new Week('2017-05-15', UTC_TIMEZONE);
    var days = week.toDays();

    ok(days.length === 7);

    ok(days[0].toStart().isEqual(new DateTime([2017, 5, 14, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[0].toEnd().isEqual(new DateTime([2017, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(days[1].toStart().isEqual(new DateTime([2017, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[1].toEnd().isEqual(new DateTime([2017, 5, 16, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(days[2].toStart().isEqual(new DateTime([2017, 5, 16, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[2].toEnd().isEqual(new DateTime([2017, 5, 17, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(days[3].toStart().isEqual(new DateTime([2017, 5, 17, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[3].toEnd().isEqual(new DateTime([2017, 5, 18, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(days[4].toStart().isEqual(new DateTime([2017, 5, 18, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[4].toEnd().isEqual(new DateTime([2017, 5, 19, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(days[5].toStart().isEqual(new DateTime([2017, 5, 19, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[5].toEnd().isEqual(new DateTime([2017, 5, 20, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(days[6].toStart().isEqual(new DateTime([2017, 5, 20, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(days[6].toEnd().isEqual(new DateTime([2017, 5, 21, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[Week] toDays :: Timezone', function () {
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

    var week = new Week('2017-05-15', TEST_TIMEZONE);
    var days = week.toDays();

    ok(days.length === 7);

    ok(days[0].toStart().isEqual(new DateTime([2017, 5, 14, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[0].toEnd().isEqual(new DateTime([2017, 5, 15, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(days[1].toStart().isEqual(new DateTime([2017, 5, 15, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[1].toEnd().isEqual(new DateTime([2017, 5, 16, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(days[2].toStart().isEqual(new DateTime([2017, 5, 16, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[2].toEnd().isEqual(new DateTime([2017, 5, 17, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(days[3].toStart().isEqual(new DateTime([2017, 5, 17, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[3].toEnd().isEqual(new DateTime([2017, 5, 18, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(days[4].toStart().isEqual(new DateTime([2017, 5, 18, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[4].toEnd().isEqual(new DateTime([2017, 5, 19, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(days[5].toStart().isEqual(new DateTime([2017, 5, 19, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[5].toEnd().isEqual(new DateTime([2017, 5, 20, 0, 0, 0, 0], TEST_TIMEZONE)));

    ok(days[6].toStart().isEqual(new DateTime([2017, 5, 20, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(days[6].toEnd().isEqual(new DateTime([2017, 5, 21, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Week] Display :: format', function () {
    var week = new Week('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(week.format('YYYY-MM-DD') === '1969-12-28 – 1970-01-04');
  });

  test('[Week] Display :: toISOString', function () {
    var week = new Week('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(week.toISOString() === '1969-12-28T00:00:00.000Z – 1970-01-04T00:00:00.000Z');
  });

  test('[Week] Display :: toLocaleString', function () {
    var week = new Week('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(week.toLocaleString() === '12/28/1969, 12:00:00 AM – 1/4/1970, 12:00:00 AM');
  });

  test('[Week] Display :: toString', function () {
    var week = new Week('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(week.toString() === 'Sun Dec 28 1969 00:00:00 GMT+0000 (UTC) – Sun Jan 04 1970 00:00:00 GMT+0000 (UTC)');
  });

  test('[Week] Display :: toUTCString', function () {
    var week = new Week('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(week.toUTCString() === 'Sun, 28 Dec 1969 00:00:00 GMT – Sun, 04 Jan 1970 00:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Month] toJSON', function () {
    var week = new Week('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(week.toJSON() === 'Sun May 01 2016 00:00:00 GMT+0000 (UTC) – Sun May 08 2016 00:00:00 GMT+0000 (UTC)');
  });

  test('[Month] valueOf', function () {
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

    var week;

    week = new Week('2016-08-01T12:00:55.444', UTC_TIMEZONE);
    ok(week.valueOf() === 604800000);

    week = new Week('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    ok(week.valueOf() === 601200000);
  });
})();
