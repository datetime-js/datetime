(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  var Hour = DateTime.Hour;
  var Interval = DateTime.Interval;

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] Class', function () {
    ok(typeof Hour === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] Create :: No arguments', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(880200000);

    var hour = new Hour();

    ok(hour instanceof Hour);
    ok(hour instanceof Interval);

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 11, 4, 0, 0, 0])));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 11, 5, 0, 0, 0])));
  });

  test('[Hour] Create :: DateTime', function () {
    var dt = new DateTime([1970, 1, 11, 14, 25, 0, 0], UTC_TIMEZONE);

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var hour = new Hour(dt);

    ok(hour.toStart() !== dt);
    ok(hour.toStart().isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])) === true);
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 11, 15, 0, 0, 0])) === true);

    // Original date shouldn't be altered
    ok(dt.isEqual(new DateTime([1970, 1, 11, 14, 25, 0, 0])) === true);
  });

  test('[Hour] Create :: DateTime with Timezone', function () {
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

    var dt = new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE);
    var hour = new Hour(dt, TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime('1970-01-04T03:00:00+0000', TEST_TIMEZONE)));
    ok(hour.valueOf() === 3600000);
  });

  test('[Hour] Create :: String', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var hour = new Hour('1970-01-11');

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 11, 0, 0, 0, 0])));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 11, 1, 0, 0, 0])));
  });

  test('[Hour] Create :: Number', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    var hour = new Hour(914400000);

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 11, 14, 0, 0, 0])));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 11, 15, 0, 0, 0])));
  });

  test('[Hour] Create :: String and timezone', function () {
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

    var hour = new Hour('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0], TEST_TIMEZONE)));

    hour = new Hour('1970-01-03T02:00:00+0000', TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0], TEST_TIMEZONE)));

    hour = new Hour('1970-01-03T01:30:00+0000', TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE)));
  });

  test('[Hour] Create :: Not existing date', function () {
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

    var hour = new Hour('1970-01-03T02:30:00', TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0], TEST_TIMEZONE)));
    ok(hour.valueOf() === 3600000);
  });

  test('[Hour] Create :: Early ambiguous date', function () {
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

    var hour = new Hour('1970-01-04T01:30:00', TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime('1970-01-04T01:00:00+0100', TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime('1970-01-04T01:00:00+0000', TEST_TIMEZONE)));
    ok(hour.valueOf() === 3600000);
  });

  test('[Hour] Create :: Late ambiguous date', function () {
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

    var hour = new Hour('1970-01-04T01:30:00+0000', TEST_TIMEZONE);

    ok(hour.toStart().isEqual(new DateTime('1970-01-04T01:00:00+0000', TEST_TIMEZONE)));
    ok(hour.toEnd().isEqual(new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE)));
    ok(hour.valueOf() === 3600000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] getHour', function () {
    var hour = new Hour('1979-05-03T11:00', UTC_TIMEZONE);
    ok(hour.getHour() === 11);
  });

  test('[Hour] getDayOfWeek', function () {
    var hour;

    hour = new Hour('1979-04-29T03:00', UTC_TIMEZONE);
    ok(hour.getDayOfWeek() === 0);

    hour = new Hour('1979-05-05T03:00', UTC_TIMEZONE);
    ok(hour.getDayOfWeek() === 6);
  });

  test('[Hour] getDayOfMonth', function () {
    var hour = new Hour('1979-05-03T03:00', UTC_TIMEZONE);
    ok(hour.getDayOfMonth() === 3);
  });

  test('[Hour] getMonth', function () {
    var hour = new Hour('1979-05-03T03:00', UTC_TIMEZONE);
    ok(hour.getMonth() === 5);
  });

  test('[Hour] getYear', function () {
    var hour = new Hour('1979-01-03T03:00', UTC_TIMEZONE);
    ok(hour.getYear() === 1979);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Next hour
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] toNext', function () {
    var hour = new Hour('1970-01-03T03:59:59+0100', UTC_TIMEZONE);

    var nextHour = hour.toNext();

    ok(nextHour !== hour);

    ok(nextHour.toStart().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
    ok(nextHour.toEnd().isEqual(new DateTime([1970, 1, 3, 4, 0, 0, 0])));

    // Original hour isn't altered
    ok(hour.toStart().isEqual(new DateTime([1970, 1, 3, 2, 0, 0, 0])));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
  });

  test('[Hour] toNext :: Timezone', function () {
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

    var hour = new Hour('1970-01-03T00:30:00', TEST_TIMEZONE);
    var nextHour = hour.toNext();

    ok(nextHour !== hour);

    ok(nextHour.toStart().isEqual(new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextHour.toEnd().isEqual(new DateTime([1970, 1, 3, 2, 0, 0, 0], TEST_TIMEZONE)));
    ok(nextHour.valueOf() === 3600000);

    hour = new Hour('1970-01-04T01:30:00', TEST_TIMEZONE);
    nextHour = hour.toNext();

    ok(nextHour.toStart().isEqual(new DateTime('1970-01-04T02:00:00+0100', TEST_TIMEZONE)));
    ok(nextHour.toEnd().isEqual(new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE)));
    ok(nextHour.valueOf() === 3600000);

    nextHour = nextHour.toNext();

    ok(nextHour.toStart().isEqual(new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE)));
    ok(nextHour.toEnd().isEqual(new DateTime('1970-01-04T03:00:00+0000', TEST_TIMEZONE)));
    ok(nextHour.valueOf() === 3600000);

    nextHour = nextHour.toNext();

    ok(nextHour.toStart().isEqual(new DateTime('1970-01-04T03:00:00+0000', TEST_TIMEZONE)));
    ok(nextHour.toEnd().isEqual(new DateTime('1970-01-04T04:00:00+0000', TEST_TIMEZONE)));
    ok(nextHour.valueOf() === 3600000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Previous hour
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] toPrev', function () {
    var hour = new Hour('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    var prevHour = hour.toPrev();

    ok(prevHour !== hour);

    ok(prevHour.toStart().isEqual(new DateTime([1970, 1, 3, 1, 0, 0, 0])));
    ok(prevHour.toEnd().isEqual(new DateTime([1970, 1, 3, 2, 0, 0, 0])));

    // Original hour isn't altered
    ok(hour.toStart().isEqual(new DateTime([1970, 1, 3, 2, 0, 0, 0])));
    ok(hour.toEnd().isEqual(new DateTime([1970, 1, 3, 3, 0, 0, 0])));
  });

  test('[Hour] toPrev :: Timezone', function () {
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

    var hour = new Hour('1970-01-03T03:00:00+0100', TEST_TIMEZONE);
    var prevHour = hour.toPrev();

    ok(prevHour !== hour);

    ok(prevHour.toStart().isEqual(new DateTime('1970-01-03T01:00:00+0000', TEST_TIMEZONE)));
    ok(prevHour.toEnd().isEqual(new DateTime('1970-01-03T03:00:00+0100', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toMinutes
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] toMinutes', function () {
    var hour = new Hour('2017-05-15T14:30:00', UTC_TIMEZONE);
    var minutes = hour.toMinutes();
    var idx = minutes.length;

    var expectedHour;
    var expectedMinute;

    ok(minutes.length === 60);

    while (idx--) {
      ok(minutes[idx].toStart().isEqual(
        new DateTime([2017, 5, 15, 14, idx, 0, 0], UTC_TIMEZONE)
      ));

      expectedHour = idx === 59 ? 15 : 14;
      expectedMinute = idx === 59 ? 0 : idx + 1;

      ok(minutes[idx].toEnd().isEqual(
        new DateTime([2017, 5, 15, expectedHour, expectedMinute, 0, 0], UTC_TIMEZONE)
      ));
    }
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] Display :: format', function () {
    var hour = new Hour('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(hour.format('YYYY-MM-DD') === '1970-01-03 – 1970-01-03');
  });

  test('[Hour] Display :: toISOString', function () {
    var hour = new Hour('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(hour.toISOString() === '1970-01-03T02:00:00.000Z – 1970-01-03T03:00:00.000Z');
  });

  test('[Hour] Display :: toLocaleString', function () {
    var hour = new Hour('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(hour.toLocaleString() === '1/3/1970, 2:00:00 AM – 1/3/1970, 3:00:00 AM');
  });

  test('[Hour] Display :: toString', function () {
    var hour = new Hour('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(hour.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0000 (UTC) – Sat Jan 03 1970 03:00:00 GMT+0000 (UTC)');
  });

  test('[Hour] Display :: toUTCString', function () {
    var hour = new Hour('1970-01-03T03:00:00+0100', UTC_TIMEZONE);
    ok(hour.toUTCString() === 'Sat, 03 Jan 1970 02:00:00 GMT – Sat, 03 Jan 1970 03:00:00 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Hour] toJSON', function () {
    var hour = new Hour('2016-05-01T14:30:00', UTC_TIMEZONE);
    ok(hour.toJSON() === 'Sun May 01 2016 14:00:00 GMT+0000 (UTC) – Sun May 01 2016 15:00:00 GMT+0000 (UTC)');
  });

  test('[Hour] valueOf', function () {
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

    var hour = new Hour('2016-08-01T12:00:55.444', UTC_TIMEZONE);
    ok(hour.valueOf() === 3600000);

    hour = new Hour('1970-01-03T02:30:00+0100', TEST_TIMEZONE);
    ok(hour.valueOf() === 3600000);

    hour = new Hour('1970-01-04T01:30:00+0100', TEST_TIMEZONE);
    ok(hour.valueOf() === 3600000);
  });
})();
