(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();

  var Day = DateTime.Day;
  var Week = DateTime.Week;
  var Month = DateTime.Month;
  var MonthWeeks = DateTime.MonthWeeks;
  var Year = DateTime.Year;
  var Interval = DateTime.Interval;

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] Class', function () {
    ok(typeof Day === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(864000000);

    var day = new Day();

    ok(day instanceof Day);
    ok(day instanceof Interval);

    ok(day.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])));
  });

  test('[Day] Create :: DateTime', function () {
    var dt = new DateTime([1970, 1, 11, 14, 0, 0, 0], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var day = new Day(dt);

    ok(day.toStart() !== dt);
    ok(day.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])) === true);
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])) === true);
  });

  test('[Day] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var day = new Day('1970-01-11');

    ok(day.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])));
  });

  test('[Day] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var day = new Day(914400000);

    ok(day.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])));
  });

  test('[Day] Create :: String and timezone', function () {
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

    var day = new Day('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    ok(day.toStart().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] getDayOfMonth', function () {
    var day = new Day('1979-05-03', UTC_TIMEZONE);
    ok(day.getDayOfMonth() === 3);
  });

  test('[Day] getDayOfWeek', function () {
    var day;

    day = new Day('1979-04-29', UTC_TIMEZONE);
    ok(day.getDayOfWeek() === 0);

    day = new Day('1979-05-05', UTC_TIMEZONE);
    ok(day.getDayOfWeek() === 6);
  });

  test('[Day] getMonth', function () {
    var day = new Day('1979-05-03', UTC_TIMEZONE);
    ok(day.getMonth() === 5);
  });

  test('[Day] getYear', function () {
    var day = new Day('1979-01-03', UTC_TIMEZONE);
    ok(day.getYear() === 1979);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next day
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toNext', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    var nextDay = day.toNext();

    ok(nextDay !== day);

    ok(nextDay.toStart().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0])));
    ok(nextDay.toEnd().isEqual(new DateTime([1970, 1, 5, 0, 0, 0, 0])));

    // Original day isn't altered
    ok(day.toStart().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0])));
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0])));
  });

  test('[Day] toNext :: Next month', function () {
    var day = new Day('1970-11-30T05:00:00', UTC_TIMEZONE);
    var nextDay = day.toNext();

    ok(nextDay.toStart().isEqual(new DateTime([1970, 12, 1, 0, 0, 0, 0])));
    ok(nextDay.toEnd().isEqual(new DateTime([1970, 12, 2, 0, 0, 0, 0])));
  });

  test('[Day] toNext :: Next year', function () {
    var day = new Day('1970-12-31T14:00:00', UTC_TIMEZONE);
    var nextDay = day.toNext();

    ok(nextDay.toStart().isEqual(new DateTime([1971, 1, 1, 0, 0, 0, 0])));
    ok(nextDay.toEnd().isEqual(new DateTime([1971, 1, 2, 0, 0, 0, 0])));
  });

  test('[Day] toNext :: Timezone', function () {
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

    var day = new Day('1970-01-02T14:00:00', TEST_TIMEZONE);
    var nextDay = day.toNext();

    ok(nextDay !== day);

    ok(nextDay.toStart().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextDay.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous day
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toPrev', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    var prevDay = day.toPrev();

    ok(prevDay !== day);

    ok(prevDay.toStart().isEqual(new DateTime([1970, 1, 2, 0, 0, 0, 0])));
    ok(prevDay.toEnd().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0])));

    // Original day isn't altered
    ok(day.toStart().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0])));
    ok(day.toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0])));
  });

  test('[Day] toPrev :: Previous month', function () {
    var day = new Day('1970-05-01T00:30:00', UTC_TIMEZONE);
    var prevDay = day.toPrev();

    ok(prevDay.toStart().isEqual(new DateTime([1970, 4, 30, 0, 0, 0, 0])));
    ok(prevDay.toEnd().isEqual(new DateTime([1970, 5, 1, 0, 0, 0, 0])));
  });

  test('[Day] toPrev :: Previous year', function () {
    var day = new Day('1970-01-01T00:30:00', UTC_TIMEZONE);
    var prevDay = day.toPrev();

    ok(prevDay.toStart().isEqual(new DateTime([1969, 12, 31, 0, 0, 0, 0])));
    ok(prevDay.toEnd().isEqual(new DateTime([1970, 1, 1, 0, 0, 0, 0])));
  });

  test('[Day] toPrev :: Timezone', function () {
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

    var day = new Day('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    var prevDay = day.toPrev();

    ok(prevDay !== day);

    ok(prevDay.toStart().isEqual(new DateTime([1970, 1, 2, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(prevDay.toEnd().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toMonth :: UTC', function () {
    var day = new Day('1978-05-03', UTC_TIMEZONE);

    ok(day.toMonth() instanceof Month);
    ok(day.toMonth().isEqual(new Month('1978-05')));
  });

  test('[Day] toMonth :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var day = new Day('1978-05-03', TEST_TIMEZONE);

    ok(day.toMonth() instanceof Month);
    ok(day.toMonth().isEqual(new Month('1978-05', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toMonthWeeks
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toMonthWeeks :: UTC', function () {
    var day = new Day('1978-05-03', UTC_TIMEZONE);

    ok(day.toMonthWeeks() instanceof MonthWeeks);
    ok(day.toMonthWeeks().isEqual(new MonthWeeks('1978-05-03')));
  });

  test('[Day] toMonthWeeks :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var day = new Day('1978-05-03', TEST_TIMEZONE);

    ok(day.toMonthWeeks() instanceof MonthWeeks);
    ok(day.toMonthWeeks().isEqual(new MonthWeeks('1978-05-03', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toWeek
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toWeek :: UTC', function () {
    var day = new Day('1978-05-03', UTC_TIMEZONE);

    ok(day.toWeek() instanceof Week);
    ok(day.toWeek().isEqual(new Week('1978-05-03')));
  });

  test('[Day] toWeek :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var day = new Day('1978-05-03', TEST_TIMEZONE);

    ok(day.toWeek() instanceof Week);
    ok(day.toWeek().isEqual(new Week('1978-05-03', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toYear :: UTC', function () {
    var day = new Day('1978-05-03', UTC_TIMEZONE);

    ok(day.toYear() instanceof Year);
    ok(day.toYear().isEqual(new Year('1978')));
  });

  test('[Day] toYear :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var day = new Day('1978-05-03', TEST_TIMEZONE);

    ok(day.toYear() instanceof Year);
    ok(day.toYear().isEqual(new Year('1978', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toHours
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] toHours', function () {
    var day = new Day('2017-05-15', UTC_TIMEZONE);
    var hours = day.toHours();
    var idx = hours.length;

    var hour;

    ok(hours.length === 24);

    while (idx--) {
      ok(hours[idx].toStart().isEqual(
        new DateTime([2017, 5, 15, idx, 0, 0, 0], UTC_TIMEZONE)
      ));

      day = idx === 23 ? 16 : 15;
      hour = idx === 23 ? 0 : idx + 1;

      ok(hours[idx].toEnd().isEqual(
        new DateTime([2017, 5, day, hour, 0, 0, 0], UTC_TIMEZONE)
      ));
    }
  });

  test('[Day] toHours :: Timezone', function () {
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

    var day = new Day('2017-05-15', TEST_TIMEZONE);
    var hours = day.toHours();
    var idx = hours.length;

    var hour;

    ok(hours.length === 24);

    while (idx--) {
      ok(hours[idx].toStart().isEqual(
        new DateTime([2017, 5, 15, idx, 0, 0, 0], TEST_TIMEZONE)
      ));

      day = idx === 23 ? 16 : 15;
      hour = idx === 23 ? 0 : idx + 1;
      ok(hours[idx].toEnd().isEqual(
        new DateTime([2017, 5, day, hour, 0, 0, 0], TEST_TIMEZONE)
      ));
    }
  });

  test('[Day] toHours :: Timezone :: 23 hours', function () {
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

    var day = new Day('1970-01-03', TEST_TIMEZONE);
    var hours = day.toHours();

    ok(hours.length === 23);

    ok(hours[0].toStart().isEqual(new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE)));
    ok(hours[0].toEnd().isEqual(new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE)));

    ok(hours[1].toStart().isEqual(new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE)));
    ok(hours[1].toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE)));

    ok(hours[2].toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE)));
    ok(hours[2].toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0], TEST_TIMEZONE)));

    ok(hours[3].toStart().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0], TEST_TIMEZONE)));
    ok(hours[3].toEnd().isEqual(new DateTime([1970, 1, 3, 5, 0, 0, 0], TEST_TIMEZONE)));

    ok(hours[21].toStart().isEqual(new DateTime([1970, 1, 3, 22, 0, 0, 0], TEST_TIMEZONE)));
    ok(hours[21].toEnd().isEqual(new DateTime([1970, 1, 3, 23, 0, 0, 0], TEST_TIMEZONE)));

    ok(hours[22].toStart().isEqual(new DateTime([1970, 1, 3, 23, 0, 0, 0], TEST_TIMEZONE)));
    ok(hours[22].toEnd().isEqual(new DateTime([1970, 1, 4, 0, 0, 0, 0], TEST_TIMEZONE)));
  });

  test('[Day] toHours :: Timezone :: 25 hours', function () {
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

    var day = new Day('1970-01-04', TEST_TIMEZONE);
    var hours = day.toHours();

    ok(hours.length === 25);

    ok(hours[0].toStart().isEqual(new DateTime('1970-01-04T00:00:00', TEST_TIMEZONE)));
    ok(hours[0].toEnd().isEqual(new DateTime('1970-01-04T01:00:00', TEST_TIMEZONE)));

    ok(hours[1].toStart().isEqual(new DateTime('1970-01-04T01:00:00', TEST_TIMEZONE)));
    ok(hours[1].toEnd().isEqual(new DateTime('1970-01-04T01:00:00+0000', TEST_TIMEZONE)));

    ok(hours[2].toStart().isEqual(new DateTime('1970-01-04T01:00:00+0000', TEST_TIMEZONE)));
    ok(hours[2].toEnd().isEqual(new DateTime('1970-01-04T02:00:00', TEST_TIMEZONE)));

    ok(hours[3].toStart().isEqual(new DateTime('1970-01-04T02:00:00', TEST_TIMEZONE)));
    ok(hours[3].toEnd().isEqual(new DateTime('1970-01-04T03:00:00', TEST_TIMEZONE)));

    ok(hours[22].toStart().isEqual(new DateTime('1970-01-04T21:00:00', TEST_TIMEZONE)));
    ok(hours[22].toEnd().isEqual(new DateTime('1970-01-04T22:00:00', TEST_TIMEZONE)));

    ok(hours[23].toStart().isEqual(new DateTime('1970-01-04T22:00:00', TEST_TIMEZONE)));
    ok(hours[23].toEnd().isEqual(new DateTime('1970-01-04T23:00:00', TEST_TIMEZONE)));

    ok(hours[24].toStart().isEqual(new DateTime('1970-01-04T23:00:00', TEST_TIMEZONE)));
    ok(hours[24].toEnd().isEqual(new DateTime('1970-01-05T00:00:00', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] Display :: format', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(day.format('YYYY-MM-DD') === '1970-01-03 – 1970-01-04');
  });

  test('[Day] Display :: toISOString', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(day.toISOString() === '1970-01-03T00:00:00.000Z – 1970-01-04T00:00:00.000Z');
  });

  test('[Day] Display :: toLocaleString', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(day.toLocaleString() === '1/3/1970, 12:00:00 AM – 1/4/1970, 12:00:00 AM');
  });

  test('[Day] Display :: toString', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(day.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0000 (UTC) – Sun Jan 04 1970 00:00:00 GMT+0000 (UTC)');
  });

  test('[Day] Display :: toUTCString', function () {
    var day = new Day('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(day.toUTCString() === 'Sat, 03 Jan 1970 00:00:00 GMT – Sun, 04 Jan 1970 00:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Day] isToday :: UTC', function () {
    var day = new Day('2016-05-01T14:30:00', UTC_TIMEZONE);

    mockNow(1462060799999); // 2016-04-30T23:59:59.999Z
    ok(day.isToday() === false);

    mockNow(1462060800000); // 2016-05-01T00:00:00Z
    ok(day.isToday() === true);

    mockNow(1462111200000); // 2016-05-01T14:00:00Z
    ok(day.isToday() === true);

    mockNow(1462147199999); // 2016-05-01T23:59:59.999Z
    ok(day.isToday() === true);

    mockNow(1462147200000); // 2016-05-02T00:00:00Z
    ok(day.isToday() === false);
  });

  test('[Day] isToday :: Timezone', function () {
    setTestTimezone({
      abbr: [
        'TST'
      ],
      dst: [
        false
      ],
      offset: [
        -240 // +0400
      ],
      until: [
        null
      ]
    });

    DateTime.setDefaultTimezone(TEST_TIMEZONE);

    var day = new Day('2016-05-01T14:30:00', TEST_TIMEZONE);

    mockNow(1462046399999); // 2016-04-30T23:59:59.999+0400
    ok(day.isToday() === false);

    mockNow(1462046400000); // 2016-05-01T00:00:00Z+0400
    ok(day.isToday() === true);

    mockNow(1462096800000); // 2016-05-01T14:00:00Z+0400
    ok(day.isToday() === true);

    mockNow(1462132799999); // 2016-05-01T23:59:59.999Z+0400
    ok(day.isToday() === true);

    mockNow(1462132800000); // 2016-05-02T00:00:00Z+0400
    ok(day.isToday() === false);
  });

  test('[DateTime] isWeekend', function () {
    var day;

    day = new Day('2016-05-06', UTC_TIMEZONE);
    ok(day.isWeekend() === false);

    day = new Day('2016-05-07', UTC_TIMEZONE);
    ok(day.isWeekend() === true);

    day = new Day('2016-05-08', UTC_TIMEZONE);
    ok(day.isWeekend() === true);

    day = new Day('2016-05-09', UTC_TIMEZONE);
    ok(day.isWeekend() === false);
  });

  test('[Day] toDayISOString', function () {
    var day = new Day('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(day.toDayISOString() === '2016-05-01');
  });

  test('[Day] toJSON', function () {
    var day = new Day('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(day.toJSON() === 'Sun May 01 2016 00:00:00 GMT+0000 (UTC) – Mon May 02 2016 00:00:00 GMT+0000 (UTC)');
  });

  test('[Day] valueOf', function () {
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

    var day = new Day('2016-08-01T12:00:55.444', UTC_TIMEZONE);
    ok(day.valueOf() === 86400000);

    day = new Day('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    ok(day.valueOf() === 82800000);
  });
})();
