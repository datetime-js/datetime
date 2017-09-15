(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var Second = DateTime.Second;
  var Minute = DateTime.Minute;
  var Hour = DateTime.Hour;
  var Day = DateTime.Day;
  var Week = DateTime.Week;
  var Month = DateTime.Month;
  var MonthWeeks = DateTime.MonthWeeks;
  var Year = DateTime.Year;

  var UTC_TIMEZONE = 'UTC';
  var TEST_TIMEZONE = 'TEST_TIMEZONE';

  var test = createTestFn();

  /**
   * ----------------------------------------------------------------------------------------
   * toStartOf*
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toStartOfSecond', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfSecond();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 14, 54, 13, 0])));
  });

  test('[TransformTo] toStartOfMinute', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfMinute();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 14, 54, 0, 0])));
  });

  test('[TransformTo] toStartOfHour', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfHour();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 14, 0, 0, 0])));
  });

  test('[TransformTo] toStartOfHour :: Ambiguous date', function () {
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
    var dt2 = dt.toStartOfHour();

    ok(equalDates(dt, new DateTime('1970-01-04T02:30:00+0000', TEST_TIMEZONE)));
    ok(equalDates(dt2, new DateTime('1970-01-04T02:00:00+0000', TEST_TIMEZONE)));
  });

  test('[TransformTo] toStartOfDay', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfDay();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 0, 0, 0, 0])));
  });

  test('[TransformTo] toStartOfWeek', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfWeek();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 2, 0, 0, 0, 0])));
    ok(dt2.getDayOfWeek() === 0);
  });

  test('[TransformTo] toStartOfMonth', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfMonth();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 1, 0, 0, 0, 0])));
  });

  test('[TransformTo] toStartOfYear', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toStartOfYear();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 1, 1, 0, 0, 0, 0])));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toEndOf*
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toEndOfSecond', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfSecond();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 14, 54, 13, 999])));
  });

  test('[TransformTo] toEndOfMinute', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfMinute();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 14, 54, 59, 999])));
  });

  test('[TransformTo] toEndOfHour', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfHour();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 14, 59, 59, 999])));
  });

  test('[TransformTo] toEndOfDay', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfDay();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 5, 23, 59, 59, 999])));
  });

  test('[TransformTo] toEndOfWeek', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfWeek();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 8, 23, 59, 59, 999])));

    ok(dt2.format('dddd') === 'Saturday');
  });

  test('[TransformTo] toEndOfMonth', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfMonth();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 10, 31, 23, 59, 59, 999])));

    dt = new DateTime([2016, 9, 5, 14, 54, 13, 555]);
    dt2 = dt.toEndOfMonth();

    ok(equalDates(dt2, new DateTime([2016, 9, 30, 23, 59, 59, 999])));

    dt = new DateTime([2016, 2, 5, 14, 54, 13, 555]);
    dt2 = dt.toEndOfMonth();

    ok(equalDates(dt2, new DateTime([2016, 2, 29, 23, 59, 59, 999])));

    dt = new DateTime([2017, 2, 5, 14, 54, 13, 555]);
    dt2 = dt.toEndOfMonth();

    ok(equalDates(dt2, new DateTime([2017, 2, 28, 23, 59, 59, 999])));
  });

  test('[TransformTo] toEndOfYear', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555]);
    var dt2 = dt.toEndOfYear();

    ok(equalDates(dt, new DateTime([2016, 10, 5, 14, 54, 13, 555])));
    ok(equalDates(dt2, new DateTime([2016, 12, 31, 23, 59, 59, 999])));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toSecond
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toSecond :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var second = dt.toSecond();

    ok(second instanceof Second);
    ok(second.isEqual(new Second('2016-10-05T14:54:13', UTC_TIMEZONE)));
  });

  test('[TransformTo] toSecond :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var second = dt.toSecond();

    ok(second instanceof Second);
    ok(second.isEqual(new Second('2016-10-05T14:54:13', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toMinute
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toMinute :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var minute = dt.toMinute();

    ok(minute instanceof Minute);
    ok(minute.isEqual(new Minute('2016-10-05T14:54', UTC_TIMEZONE)));
  });

  test('[TransformTo] toMinute :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var minute = dt.toMinute();

    ok(minute instanceof Minute);
    ok(minute.isEqual(new Minute('2016-10-05T14:54', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toHour
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toHour :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var hour = dt.toHour();

    ok(hour instanceof Hour);
    ok(hour.isEqual(new Hour('2016-10-05T14', UTC_TIMEZONE)));
  });

  test('[TransformTo] toHour :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var hour = dt.toHour();

    ok(hour instanceof Hour);
    ok(hour.isEqual(new Hour('2016-10-05T14', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toDay
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toDay :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var day = dt.toDay();

    ok(day instanceof Day);
    ok(day.isEqual(new Day('2016-10-05', UTC_TIMEZONE)));
  });

  test('[TransformTo] toDay :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var day = dt.toDay();

    ok(day instanceof Day);
    ok(day.isEqual(new Day('2016-10-05', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toWeek
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toWeek :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var week = dt.toWeek();

    ok(week instanceof Week);
    ok(week.isEqual(new Week('2016-10-05', UTC_TIMEZONE)));
  });

  test('[TransformTo] toWeek :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var week = dt.toWeek();

    ok(week instanceof Week);
    ok(week.isEqual(new Week('2016-10-05', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toMonth
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toMonth :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var month = dt.toMonth();

    ok(month instanceof Month);
    ok(month.isEqual(new Month('2016-10', UTC_TIMEZONE)));
  });

  test('[TransformTo] toMonth :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var month = dt.toMonth();

    ok(month instanceof Month);
    ok(month.isEqual(new Month('2016-10', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toMonthWeeks
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toMonthWeeks :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var monthWeeks = dt.toMonthWeeks();

    ok(monthWeeks instanceof MonthWeeks);
    ok(monthWeeks.isEqual(new MonthWeeks('2016-10', UTC_TIMEZONE)));
  });

  test('[TransformTo] toMonthWeeks :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var monthWeeks = dt.toMonthWeeks();

    ok(monthWeeks instanceof MonthWeeks);
    ok(monthWeeks.isEqual(new MonthWeeks('2016-10', TEST_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toYear
   * ----------------------------------------------------------------------------------------
   */

  test('[TransformTo] toYear :: UTC', function () {
    var dt = new DateTime([2016, 10, 5, 14, 54, 13, 555], UTC_TIMEZONE);
    var year = dt.toYear();

    ok(year instanceof Year);
    ok(year.isEqual(new Year('2016', UTC_TIMEZONE)));
  });

  test('[TransformTo] toYear :: Timezone', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    setTestTimezone({
      abbr: ['TST'],
      dst: [false],
      offset: [-240],
      until: [null]
    });

    var dt = new DateTime('2016-10-05T14:54:13.555', TEST_TIMEZONE);
    var year = dt.toYear();

    ok(year instanceof Year);
    ok(year.isEqual(new Year('2016-10', TEST_TIMEZONE)));
  });
})();
