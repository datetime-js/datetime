(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();

  var Day = DateTime.Day;
  var Duration = DateTime.Duration;
  var Hour = DateTime.Hour;
  var Interval = DateTime.Interval;
  var Minute = DateTime.Minute;
  var Month = DateTime.Month;
  var MonthWeeks = DateTime.MonthWeeks;
  var Second = DateTime.Second;
  var Week = DateTime.Week;
  var Year = DateTime.Year;

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';

  /**
   * ----------------------------------------------------------------------------------------
   * Is instance of
   * ----------------------------------------------------------------------------------------
   */

  test('[DateTime] isDateTime', function () {
    ok(DateTime.isDateTime(new DateTime()) === true);
    ok(DateTime.isDateTime((new DateTime()).clone()) === true);
    ok(DateTime.isDateTime(new DateTime(NaN)) === true);

    ok(DateTime.isDateTime(new Date()) === false);
    ok(DateTime.isDateTime() === false);
  });

  test('[DateTime] isDay', function () {
    ok(DateTime.isDay(new Day()) === true);
    ok(DateTime.isDay(new Day(NaN)) === true);

    ok(DateTime.isDay(new DateTime()) === false);
    ok(DateTime.isDay('2015-05-15') === false);
    ok(DateTime.isDay() === false);
  });

  test('[DateTime] isDuration', function () {
    ok(DateTime.isDuration(new Duration()) === true);
    ok(DateTime.isDuration(new Duration('P5Y2M15D')) === true);
    ok(DateTime.isDuration(new Duration('')) === true);

    ok(DateTime.isDuration(new DateTime()) === false);
    ok(DateTime.isDuration('P5Y2M15D') === false);
    ok(DateTime.isDuration() === false);
  });

  test('[DateTime] isHour', function () {
    ok(DateTime.isHour(new Hour()) === true);
    ok(DateTime.isHour(new Hour('')) === true);

    ok(DateTime.isHour(new DateTime()) === false);
    ok(DateTime.isHour('2015-10-05') === false);
    ok(DateTime.isHour() === false);
  });

  test('[DateTime] isInterval', function () {
    ok(DateTime.isInterval(new Interval()) === true);
    ok(DateTime.isInterval(new Interval('')) === true);
    ok(DateTime.isInterval(new Interval(new DateTime(), new DateTime())) === true);
    ok(DateTime.isInterval(new Day()) === true);

    ok(DateTime.isInterval(new DateTime()) === false);
    ok(DateTime.isInterval('2015-10-05') === false);
    ok(DateTime.isInterval() === false);
  });

  test('[DateTime] isMinute', function () {
    ok(DateTime.isMinute(new Minute()) === true);
    ok(DateTime.isMinute(new Minute('2015-10-05T14:00')) === true);

    ok(DateTime.isMinute(new DateTime()) === false);
    ok(DateTime.isMinute('2015-10-05') === false);
    ok(DateTime.isMinute() === false);
  });

  test('[DateTime] isMonth', function () {
    ok(DateTime.isMonth(new Month()) === true);
    ok(DateTime.isMonth(new Month('2015-10')) === true);

    ok(DateTime.isMonth(new DateTime()) === false);
    ok(DateTime.isMonth('2015-10-05') === false);
    ok(DateTime.isMonth() === false);
  });

  test('[DateTime] isMonthWeeks', function () {
    ok(DateTime.isMonthWeeks(new MonthWeeks()) === true);
    ok(DateTime.isMonthWeeks(new MonthWeeks('2015-10')) === true);

    ok(DateTime.isMonthWeeks(new DateTime()) === false);
    ok(DateTime.isMonthWeeks('2015-10-05') === false);
    ok(DateTime.isMonthWeeks() === false);
  });

  test('[DateTime] isSecond', function () {
    ok(DateTime.isSecond(new Second()) === true);
    ok(DateTime.isSecond(new Second('2015-10-05T14:00:00')) === true);

    ok(DateTime.isSecond(new DateTime()) === false);
    ok(DateTime.isSecond('2015-10-05') === false);
    ok(DateTime.isSecond() === false);
  });

  test('[DateTime] isWeek', function () {
    ok(DateTime.isWeek(new Week()) === true);
    ok(DateTime.isWeek(new Week('2015-10-05')) === true);

    ok(DateTime.isWeek(new DateTime()) === false);
    ok(DateTime.isWeek('2015-10-05') === false);
    ok(DateTime.isWeek() === false);
  });

  test('[DateTime] isYear', function () {
    ok(DateTime.isYear(new Year()) === true);
    ok(DateTime.isYear(new Year('2015')) === true);

    ok(DateTime.isYear(new DateTime()) === false);
    ok(DateTime.isYear('2015-10-05') === false);
    ok(DateTime.isYear() === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * DST
   * ----------------------------------------------------------------------------------------
   */

  test('[DST] isDST', function () {
    var dt;

    setTestTimezone({
      abbr: [
        'TEST_1',
        'TEST_2',
        'TEST_3',
        'TEST_4',
        'TEST_5'
      ],
      dst: [
        false,
        true,
        false,
        true,
        false
      ],
      offset: [
        -180, // +0300
        180, // -0300
        -270, // +0400
        15, // -0015
        -240  // -0400
      ],
      until: [
        10 * 365 * 24 * 60 * 60 * 1000,
        20 * 365 * 24 * 60 * 60 * 1000,
        30 * 365 * 24 * 60 * 60 * 1000,
        40 * 365 * 24 * 60 * 60 * 1000,
        null
      ]
    });

    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], 'UTC');
    ok(dt.isDST() === false);

    dt = new DateTime([1960, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === false);

    dt = new DateTime([1970, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === false);

    dt = new DateTime(10 * 365 * 24 * 60 * 60 * 1000 - 1, TEST_TIMEZONE);
    ok(dt.isDST() === false);

    dt = new DateTime(10 * 365 * 24 * 60 * 60 * 1000, TEST_TIMEZONE);
    ok(dt.isDST() === true);

    dt = new DateTime([1985, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === true);

    dt = new DateTime([1995, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === false);

    dt = new DateTime([2005, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === true);

    dt = new DateTime([2015, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === false);

    dt = new DateTime([2025, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.isDST() === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Is today
   * ----------------------------------------------------------------------------------------
   */

  test('[DateTime] isToday :: UTC', function () {
    var dt = new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE);

    mockNow(1462060799999); // 2016-04-30T23:59:59.999Z
    ok(dt.isToday() === false);

    mockNow(1462060800000); // 2016-05-01T00:00:00Z
    ok(dt.isToday() === true);

    mockNow(1462111200000); // 2016-05-01T14:00:00Z
    ok(dt.isToday() === true);

    mockNow(1462147199999); // 2016-05-01T23:59:59.999Z
    ok(dt.isToday() === true);

    mockNow(1462147200000); // 2016-05-02T00:00:00Z
    ok(dt.isToday() === false);
  });

  test('[DateTime] isToday :: Timezone', function () {
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

    var dt = new DateTime('2016-05-01T14:30:00', TEST_TIMEZONE);

    mockNow(1462046399999); // 2016-04-30T23:59:59.999+0400
    ok(dt.isToday() === false);

    mockNow(1462046400000); // 2016-05-01T00:00:00Z+0400
    ok(dt.isToday() === true);

    mockNow(1462096800000); // 2016-05-01T14:00:00Z+0400
    ok(dt.isToday() === true);

    mockNow(1462132799999); // 2016-05-01T23:59:59.999Z+0400
    ok(dt.isToday() === true);

    mockNow(1462132800000); // 2016-05-02T00:00:00Z+0400
    ok(dt.isToday() === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Is weekend
   * ----------------------------------------------------------------------------------------
   */

  test('[DateTime] isWeekend', function () {
    var dt;

    dt = new DateTime('2016-05-06T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === false);

    dt = new DateTime('2016-05-07T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === true);

    dt = new DateTime('2016-05-08T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === true);

    dt = new DateTime('2016-05-09T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === false);
  });
})();
