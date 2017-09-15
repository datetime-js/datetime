(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';

  var Duration = DateTime.Duration;
  var Interval = DateTime.Interval;

  var test = createTestFn();

  /**
   * ----------------------------------------------------------------------------------------
   * add
   * ----------------------------------------------------------------------------------------
   */

  test('[Transform] add :: Number :: Positive', function () {
    var dt;

    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add(0);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Year
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add(31536000000);
    ok(equalDates(dt, new DateTime([2017, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Leap year
    dt = new DateTime([2016, 1, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add(31622400000);
    ok(equalDates(dt, new DateTime([2017, 1, 5, 14, 30, 55, 555], UTC_TIMEZONE)));
  });

  test('[Transform] add :: Number :: Negative', function () {
    var dt;

    // Year
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add(-31622400000);
    ok(equalDates(dt, new DateTime([2015, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Leap year
    dt = new DateTime([2016, 1, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add(-31536000000);
    ok(equalDates(dt, new DateTime([2015, 1, 5, 14, 30, 55, 555], UTC_TIMEZONE)));
  });

  test('[Transform] add :: Duration string :: Positive :: UTC', function () {
    var dt;

    // Add empty duration
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a year
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1Y');
    ok(equalDates(dt, new DateTime([2017, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add years
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P5Y');
    ok(equalDates(dt, new DateTime([2021, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a year - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1Y');
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1M');
    ok(equalDates(dt, new DateTime([2016, 11, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add months
    dt = new DateTime([2016, 8, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P22M');
    ok(equalDates(dt, new DateTime([2018, 6, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month - 31th => 30th
    dt = new DateTime([2016, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1M');
    ok(equalDates(dt, new DateTime([2016, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1M');
    ok(equalDates(dt, new DateTime([1960, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month - 31th => 28th
    dt = new DateTime([2017, 1, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1M');
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month - 31th => 29th
    dt = new DateTime([2016, 1, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1M');
    ok(equalDates(dt, new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add months - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P12M');
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a day
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P1D');
    ok(equalDates(dt, new DateTime([2016, 1, 21, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add days
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P5D');
    ok(equalDates(dt, new DateTime([2016, 1, 25, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add days
    dt = new DateTime([2016, 1, 25, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P36D');
    ok(equalDates(dt, new DateTime([2016, 3, 1, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add an hour
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT1H');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 15, 30, 55, 555], UTC_TIMEZONE)));

    // Add hours
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT12H');
    ok(equalDates(dt, new DateTime([2016, 10, 6, 2, 30, 55, 555], UTC_TIMEZONE)));

    // Add a minute
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT1M');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 31, 55, 555], UTC_TIMEZONE)));

    // Add minutes
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT30M');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 15, 0, 55, 555], UTC_TIMEZONE)));

    // Add a second
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT1S');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 56, 555], UTC_TIMEZONE)));

    // Add seconds
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT1805S');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 15, 1, 0, 555], UTC_TIMEZONE)));

    // Add years, months, and days
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P5Y10M26D');
    ok(equalDates(dt, new DateTime([2022, 8, 31, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add years, months, days - 31th => 30th
    dt = new DateTime([2016, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P2Y1M1D');
    ok(equalDates(dt, new DateTime([2018, 5, 1, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add hours, minutes, and seconds
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('PT9H60M4S');
    ok(equalDates(dt, new DateTime([2016, 10, 6, 0, 30, 59, 555], UTC_TIMEZONE)));

    // Add all
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P2Y2M3DT2H10M1S');
    ok(equalDates(dt, new DateTime([2018, 12, 8, 16, 40, 56, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('P2Y2M3DT2H10M1S');
    ok(equalDates(dt, new DateTime([1962, 12, 8, 16, 40, 56, 555], UTC_TIMEZONE)));
  });

  test('[Transform] add :: Duration string :: Positive :: Timezone', function () {
    setTestTimezone({
      abbr: [
        'TST_03',
        'TST_04',
        'TST_03'
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
        82800000, // 1970-01-02T02:00:00
        165600000, // 1970-01-03T02:00:00
        null
      ]
    });

    var dt;

    // Add empty duration
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add();
    ok(equalDates(dt, new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE)));

    // Add year
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('P1Y');
    ok(equalDates(dt, new DateTime([1971, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE)));

    // Add day - preserve hour
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('P1D');
    ok(equalDates(dt, new DateTime([1970, 1, 2, 14, 30, 55, 555], TEST_TIMEZONE)));

    // Add day - non-existing hour
    dt = new DateTime([1970, 1, 1, 2, 30, 55, 555], TEST_TIMEZONE);
    dt.add('P1D');
    ok(equalDates(dt, new DateTime('1970-01-02T03:30:55.555+0400', TEST_TIMEZONE)));

    // Add a day - ambiguous hours
    dt = new DateTime([1970, 1, 1, 1, 30, 55, 555], TEST_TIMEZONE);
    dt.add('P2D');
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:55.555+0400', TEST_TIMEZONE)));

    // Add an hour
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT1H');
    ok(equalDates(dt, new DateTime([1970, 1, 3, 15, 30, 55, 555], TEST_TIMEZONE)));

    // Add hours
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT24H');
    ok(equalDates(dt, new DateTime([1970, 1, 2, 15, 30, 55, 555], TEST_TIMEZONE)));

    // Add hours - non-existing hour
    dt = new DateTime([1970, 1, 2, 1, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT1H');
    ok(equalDates(dt, new DateTime('1970-01-02T03:30:55.555+0400', TEST_TIMEZONE)));

    dt = new DateTime([1970, 1, 3, 1, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT1H');
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:55.555+0300', TEST_TIMEZONE)));

    dt.add('PT1H');
    ok(equalDates(dt, new DateTime('1970-01-03T02:30:55.555+0300', TEST_TIMEZONE)));

    // Add a minute
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT1M');
    ok(equalDates(dt, new DateTime([1970, 1, 3, 14, 31, 55, 555], TEST_TIMEZONE)));

    // Add minutes
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT30M');
    ok(equalDates(dt, new DateTime([1970, 1, 3, 15, 0, 55, 555], TEST_TIMEZONE)));

    // Add minutes - non-existing time
    dt = new DateTime([1970, 1, 2, 1, 58, 0, 1], TEST_TIMEZONE);
    dt.add('PT2M');
    ok(equalDates(dt, new DateTime([1970, 1, 2, 3, 0, 0, 1], TEST_TIMEZONE)));

    // Add minutes - ambiguous time
    dt = new DateTime([1970, 1, 3, 1, 0, 55, 555], TEST_TIMEZONE);
    dt.add('PT30M');
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:55.555+0400', TEST_TIMEZONE)));

    dt.add('PT30M');
    ok(equalDates(dt, new DateTime('1970-01-03T01:00:55.555+0300', TEST_TIMEZONE)));

    dt.add('PT60M');
    ok(equalDates(dt, new DateTime('1970-01-03T02:00:55.555+0300', TEST_TIMEZONE)));

    // Add a second
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT1S');
    ok(equalDates(dt, new DateTime([1970, 1, 3, 14, 30, 56, 555], TEST_TIMEZONE)));

    // Add seconds
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    dt.add('PT65S');
    ok(equalDates(dt, new DateTime([1970, 1, 3, 14, 32, 0, 555], TEST_TIMEZONE)));

    // Add seconds - non-existing time
    dt = new DateTime([1970, 1, 2, 1, 59, 58, 0], TEST_TIMEZONE);
    dt.add('PT3S');
    ok(equalDates(dt, new DateTime([1970, 1, 2, 3, 0, 1, 0], TEST_TIMEZONE)));

    // Add seconds - ambiguous time
    dt = new DateTime([1970, 1, 3, 1, 0, 0, 555], TEST_TIMEZONE);
    dt.add('PT30S');
    ok(equalDates(dt, new DateTime('1970-01-03T01:00:30.555+0400', TEST_TIMEZONE)));

    dt = new DateTime('1970-01-03T01:30:00.555+0300', TEST_TIMEZONE);
    dt.add('PT30S');
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:30.555+0300', TEST_TIMEZONE)));
  });

  test('[Transform] add :: Duration string :: Negative :: UTC', function () {
    var dt;

    // Subtract a year
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1Y');
    ok(equalDates(dt, new DateTime([2015, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract years
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P5Y');
    ok(equalDates(dt, new DateTime([2011, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a year - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1Y');
    ok(equalDates(dt, new DateTime([2015, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1M');
    ok(equalDates(dt, new DateTime([2016, 9, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract months
    dt = new DateTime([2016, 8, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P22M');
    ok(equalDates(dt, new DateTime([2014, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month - 31th => 30th
    dt = new DateTime([2016, 5, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1M');
    ok(equalDates(dt, new DateTime([2016, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 5, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1M');
    ok(equalDates(dt, new DateTime([1960, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month - 31th => 28th
    dt = new DateTime([2017, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1M');
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month - 31th => 29th
    dt = new DateTime([2016, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1M');
    ok(equalDates(dt, new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract months - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P12M');
    ok(equalDates(dt, new DateTime([2015, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a day
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P1D');
    ok(equalDates(dt, new DateTime([2016, 1, 19, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract days
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P5D');
    ok(equalDates(dt, new DateTime([2016, 1, 15, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract days
    dt = new DateTime([2016, 1, 25, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P36D');
    ok(equalDates(dt, new DateTime([2015, 12, 20, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract hour
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-PT1H');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 13, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract hours
    dt = new DateTime([2016, 10, 5, 10, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-PT12H');
    ok(equalDates(dt, new DateTime([2016, 10, 4, 22, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a minute
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-PT1M');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 29, 55, 555], UTC_TIMEZONE)));

    // Subtract minutes
    dt = new DateTime([2016, 10, 5, 14, 29, 55, 555], UTC_TIMEZONE);
    dt.add('-PT30M');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 13, 59, 55, 555], UTC_TIMEZONE)));

    // Subtract a second
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-PT1S');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 54, 555], UTC_TIMEZONE)));

    // Subtract seconds
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-PT1855S');
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 0, 0, 555], UTC_TIMEZONE)));

    // Subtract years, months, and days
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P5Y10M26D');
    ok(equalDates(dt, new DateTime([2010, 11, 9, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract years, months, days - 31th => 30th
    dt = new DateTime([2016, 5, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P2Y1M1D');
    ok(equalDates(dt, new DateTime([2014, 4, 29, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract hours, minutes, and seconds
    dt = new DateTime([2016, 10, 15, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-PT9H60M4S');
    ok(equalDates(dt, new DateTime([2016, 10, 15, 4, 30, 51, 555], UTC_TIMEZONE)));

    // Subtract all
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P2Y2M3DT2H10M1S');
    ok(equalDates(dt, new DateTime([2014, 8, 2, 12, 20, 54, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    dt.add('-P2Y2M3DT2H10M1S');
    ok(equalDates(dt, new DateTime([1958, 8, 2, 12, 20, 54, 555], UTC_TIMEZONE)));
  });

  test('[Transform] add :: Duration instance :: Positive :: UTC', function () {
    var duration;
    var dt;

    // Add empty duration
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration();
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a year
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2017, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add years
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P5Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2021, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a year - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 11, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add months
    dt = new DateTime([2016, 8, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P22M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2018, 6, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month - 31th => 30th
    dt = new DateTime([2016, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1960, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month - 31th => 28th
    dt = new DateTime([2017, 1, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a month - 31th => 29th
    dt = new DateTime([2016, 1, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add months - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P12M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add a day
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P1D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 1, 21, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add days
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P5D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 1, 25, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add days
    dt = new DateTime([2016, 1, 25, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P36D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 3, 1, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add an hour
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT1H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 15, 30, 55, 555], UTC_TIMEZONE)));

    // Add hours
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT12H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 6, 2, 30, 55, 555], UTC_TIMEZONE)));

    // Add a minute
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 31, 55, 555], UTC_TIMEZONE)));

    // Add minutes
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT30M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 15, 0, 55, 555], UTC_TIMEZONE)));

    // Add a second
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 56, 555], UTC_TIMEZONE)));

    // Add seconds
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT1805S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 15, 1, 0, 555], UTC_TIMEZONE)));

    // Add years, months, and days
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P5Y10M26D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2022, 8, 31, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add years, months, days - 31th => 30th
    dt = new DateTime([2016, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P2Y1M1D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2018, 5, 1, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Add hours, minutes, and seconds
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('PT9H60M4S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 6, 0, 30, 59, 555], UTC_TIMEZONE)));

    // Add all
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P2Y2M3DT2H10M1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2018, 12, 8, 16, 40, 56, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('P2Y2M3DT2H10M1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1962, 12, 8, 16, 40, 56, 555], UTC_TIMEZONE)));
  });

  test('[Transform] add :: Duration instance :: Positive :: Timezone', function () {
    setTestTimezone({
      abbr: [
        'TST_03',
        'TST_04',
        'TST_03'
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
        82800000, // 1970-01-02T02:00:00
        165600000, // 1970-01-03T02:00:00
        null
      ]
    });

    var duration;
    var dt;

    // Add empty duration
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration();
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE)));

    // Add a year
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('P1Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1971, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE)));

    // Add a day - preserve hour
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('P1D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 2, 14, 30, 55, 555], TEST_TIMEZONE)));

    // Add a day - non-existing hour
    dt = new DateTime([1970, 1, 1, 2, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('P1D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-02T03:30:55.555+0400', TEST_TIMEZONE)));

    // Add a day - ambiguous hours
    dt = new DateTime([1970, 1, 1, 1, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('P2D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:55.555+0400', TEST_TIMEZONE)));

    // Add an hour
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT1H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 3, 15, 30, 55, 555], TEST_TIMEZONE)));

    // Add hours
    dt = new DateTime([1970, 1, 1, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT24H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 2, 15, 30, 55, 555], TEST_TIMEZONE)));

    // Add hours - non-existing hour
    dt = new DateTime([1970, 1, 2, 1, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT1H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-02T03:30:55.555+0400', TEST_TIMEZONE)));

    dt = new DateTime([1970, 1, 3, 1, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT1H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:55.555+0300', TEST_TIMEZONE)));

    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T02:30:55.555+0300', TEST_TIMEZONE)));

    // Add a minute
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 3, 14, 31, 55, 555], TEST_TIMEZONE)));

    // Add minutes
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT30M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 3, 15, 0, 55, 555], TEST_TIMEZONE)));

    // Add minutes - non-existing time
    dt = new DateTime([1970, 1, 2, 1, 58, 0, 1], TEST_TIMEZONE);
    duration = new Duration('PT2M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 2, 3, 0, 0, 1], TEST_TIMEZONE)));

    // Add minutes - ambiguous time
    dt = new DateTime([1970, 1, 3, 1, 0, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT30M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:55.555+0400', TEST_TIMEZONE)));

    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T01:00:55.555+0300', TEST_TIMEZONE)));

    duration = new Duration('PT60M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T02:00:55.555+0300', TEST_TIMEZONE)));

    // Add a second
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 3, 14, 30, 56, 555], TEST_TIMEZONE)));

    // Add seconds
    dt = new DateTime([1970, 1, 3, 14, 30, 55, 555], TEST_TIMEZONE);
    duration = new Duration('PT65S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 3, 14, 32, 0, 555], TEST_TIMEZONE)));

    // Add seconds - non-existing time
    dt = new DateTime([1970, 1, 2, 1, 59, 58, 0], TEST_TIMEZONE);
    duration = new Duration('PT3S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1970, 1, 2, 3, 0, 1, 0], TEST_TIMEZONE)));

    // Add seconds - ambiguous time
    dt = new DateTime([1970, 1, 3, 1, 0, 0, 555], TEST_TIMEZONE);
    duration = new Duration('PT30S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T01:00:30.555+0400', TEST_TIMEZONE)));

    dt = new DateTime('1970-01-03T01:30:00.555+0300', TEST_TIMEZONE);
    duration = new Duration('PT30S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime('1970-01-03T01:30:30.555+0300', TEST_TIMEZONE)));
  });

  test('[Transform] add :: Duration instance :: Negative :: UTC', function () {
    var duration;
    var dt;

    // Subtract a year
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2015, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract years
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P5Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2011, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a year - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1Y');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2015, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 9, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract months
    dt = new DateTime([2016, 8, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P22M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2014, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month - 31th => 30th
    dt = new DateTime([2016, 5, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 5, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1960, 4, 30, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month - 31th => 28th
    dt = new DateTime([2017, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2017, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a month - 31th => 29th
    dt = new DateTime([2016, 3, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract months - Feb 29th => Feb 28th
    dt = new DateTime([2016, 2, 29, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P12M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2015, 2, 28, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a day
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P1D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 1, 19, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract days
    dt = new DateTime([2016, 1, 20, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P5D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 1, 15, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract days
    dt = new DateTime([2016, 1, 25, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P36D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2015, 12, 20, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract hour
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT1H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 13, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract hours
    dt = new DateTime([2016, 10, 5, 10, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT12H');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 4, 22, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract a minute
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT1M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 29, 55, 555], UTC_TIMEZONE)));

    // Subtract minutes
    dt = new DateTime([2016, 10, 5, 14, 29, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT30M');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 13, 59, 55, 555], UTC_TIMEZONE)));

    // Subtract a second
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 30, 54, 555], UTC_TIMEZONE)));

    // Subtract seconds
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT1855S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 0, 0, 555], UTC_TIMEZONE)));

    // Subtract years, months, and days
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P5Y10M26D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2010, 11, 9, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract years, months, days - 31th => 30th
    dt = new DateTime([2016, 5, 31, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P2Y1M1D');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2014, 4, 29, 14, 30, 55, 555], UTC_TIMEZONE)));

    // Subtract hours, minutes, and seconds
    dt = new DateTime([2016, 10, 15, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-PT9H60M4S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2016, 10, 15, 4, 30, 51, 555], UTC_TIMEZONE)));

    // Subtract all
    dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P2Y2M3DT2H10M1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([2014, 8, 2, 12, 20, 54, 555], UTC_TIMEZONE)));

    dt = new DateTime([1960, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    duration = new Duration('-P2Y2M3DT2H10M1S');
    dt.add(duration);
    ok(equalDates(dt, new DateTime([1958, 8, 2, 12, 20, 54, 555], UTC_TIMEZONE)));
  });

  test('[Transform] add :: Interval instance', function () {
    var dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    var interval = new Interval(
      new DateTime('2020-05-15T14:30:00', UTC_TIMEZONE),
      new DateTime('2020-07-25T11:30:00', UTC_TIMEZONE)
    );

    dt.add(interval);

    ok(equalDates(dt, new DateTime([2016, 12, 15, 11, 30, 55, 555], UTC_TIMEZONE)));
    ok(dt.isInvalid() === false);
  });

  test('[Transform] add :: NaN', function () {
    var dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);

    dt.add(NaN);
    ok(dt.isInvalid() === true);
  });

  test('[Transform] add :: Infinity', function () {
    var dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);

    dt.add(Infinity);
    ok(dt.isInvalid() === true);
  });

  test('[Transform] add :: Invalid duration instance', function () {
    var dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    var duration = new Duration('bla');

    dt.add(duration);
    ok(dt.isInvalid() === true);
  });

  test('[Transform] add :: Invalid duration string', function () {
    var dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);

    dt.add('bla');
    ok(dt.isInvalid() === true);
  });

  test('[Transform] add :: Invalid interval instance', function () {
    var dt = new DateTime([2016, 10, 5, 14, 30, 55, 555], UTC_TIMEZONE);
    var interval = new Interval(0, NaN);

    dt.add(interval);
    ok(dt.isInvalid() === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setStartOf
   * ----------------------------------------------------------------------------------------
   */

  test('[Transform] setStartOfSecond', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfSecond();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 0])));
  });

  test('[Transform] setStartOfMinute', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfMinute();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 0, 0])));
  });

  test('[Transform] setStartOfHour', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfHour();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 0, 0, 0])));
  });

  test('[Transform] setStartOfHour :: Ambiguous date', function () {
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

    var dt = new DateTime('1970-01-04T02:30:00+0000', TEST_TIMEZONE);

    dt.setStartOfHour();
    ok(equalDates(dt, new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE)));
  });

  test('[Transform] setStartOfDay', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfDay();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 0, 0, 0, 0])));
  });

  test('[Transform] setStartOfWeek', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfWeek();

    ok(equalDates(dt, new DateTime([2016, 10, 2, 0, 0, 0, 0])));
    ok(dt.getDayOfWeek() === 0);
  });

  test('[Transform] setStartOfMonth', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfMonth();
    ok(equalDates(dt, new DateTime([2016, 10, 1, 0, 0, 0, 0])));
  });

  test('[Transform] setStartOfYear', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setStartOfYear();
    ok(equalDates(dt, new DateTime([2016, 1, 1, 0, 0, 0, 0])));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * setEndOf
   * ----------------------------------------------------------------------------------------
   */

  test('[Transform] setEndOfSecond', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setEndOfSecond();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 999])));
  });

  test('[Transform] setEndOfMinute', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setEndOfMinute();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 59, 999])));
  });

  test('[Transform] setEndOfHour', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setEndOfHour();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 59, 59, 999])));
  });

  test('[Transform] setEndOfDay', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setEndOfDay();
    ok(equalDates(dt, new DateTime([2016, 10, 5, 23, 59, 59, 999])));
  });

  test('[Transform] setEndOfWeek', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setEndOfWeek();

    ok(equalDates(dt, new DateTime([2016, 10, 8, 23, 59, 59, 999])));
    ok(dt.format('dddd') === 'Saturday');
  });

  test('[Transform] setEndOfMonth', function () {
    var dt;

    dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    dt.setEndOfMonth();

    ok(equalDates(dt, new DateTime([2016, 10, 31, 23, 59, 59, 999])));

    dt = new DateTime([2016, 9, 5, 14, 54, 13, 555]);
    dt.setEndOfMonth();

    ok(equalDates(dt, new DateTime([2016, 9, 30, 23, 59, 59, 999])));

    dt = new DateTime([2016, 2, 5, 14, 54, 13, 555]);
    dt.setEndOfMonth();

    ok(equalDates(dt, new DateTime([2016, 2, 29, 23, 59, 59, 999])));

    dt = new DateTime([2017, 2, 5, 14, 54, 13, 555]);
    dt.setEndOfMonth();

    ok(equalDates(dt, new DateTime([2017, 2, 28, 23, 59, 59, 999])));
  });

  test('[Transform] setEndOfYear', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);

    dt.setEndOfYear();
    ok(equalDates(dt, new DateTime([2016, 12, 31, 23, 59, 59, 999])));
  });
})();
