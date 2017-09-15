(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();
  var dt;
  var dt2;

  function createInvalidDate () {
    return new DateTime('bla');
  }

  /**
   * ----------------------------------------------------------------------------------------
   * Create
   * ----------------------------------------------------------------------------------------
   */

  test('[Invalid date] Create :: Non-parsable string', function () {
    dt = new DateTime('bla', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  test('[Invalid date] Create :: NaN', function () {
    dt = new DateTime(NaN, UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  test('[Invalid date] Create :: Array with unsupported types', function () {
    dt = new DateTime([2016, '10', 5], UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  test('[Invalid date] Create :: Array with NaN', function () {
    dt = new DateTime([2016, 10, 5, NaN], UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  test('[Invalid date] Create :: Clone', function () {
    dt = new DateTime([2016, 10, 5, NaN], UTC_TIMEZONE);
    dt2 = dt.clone();

    ok(dt2.isInvalid() === true, 'dt2.isInvalid() === true');
    ok(dt2.isEqual(dt) === false, 'dt2.isEqual(dt) === false');

    ok(dt2 !== dt, 'dt2 !== dt');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Invalid date] Getters :: getYear', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getYear()) === true);
  });

  test('[Invalid date] Getters :: getWeekYear', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getWeekYear()) === true);
  });

  test('[Invalid date] Getters :: getISOWeekYear', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getISOWeekYear()) === true);
  });

  test('[Invalid date] Getters :: getMonth', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getMonth()) === true);
  });

  test('[Invalid date] Getters :: getWeekOfYear', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getWeekOfYear()) === true);
  });

  test('[Invalid date] Getters :: getISOWeekOfYear', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getISOWeekOfYear()) === true);
  });

  test('[Invalid date] Getters :: getDayOfMonth', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getDayOfMonth()) === true);
  });

  test('[Invalid date] Getters :: getDayOfWeek', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getDayOfWeek()) === true);
  });

  test('[Invalid date] Getters :: getHour', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getHour()) === true);
  });

  test('[Invalid date] Getters :: getMinute', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getMinute()) === true);
  });

  test('[Invalid date] Getters :: getSecond', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getSecond()) === true);
  });

  test('[Invalid date] Getters :: getMillisecond', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getMillisecond()) === true);
  });

  test('[Invalid date] Getters :: getUTCYear', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCYear()) === true);
  });

  test('[Invalid date] Getters :: getUTCMonth', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCMonth()) === true);
  });

  test('[Invalid date] Getters :: getUTCDayOfMonth', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCDayOfMonth()) === true);
  });

  test('[Invalid date] Getters :: getUTCDayOfWeek', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCDayOfWeek()) === true);
  });

  test('[Invalid date] Getters :: getUTCHour', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCHour()) === true);
  });

  test('[Invalid date] Getters :: getUTCMinute', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCMinute()) === true);
  });

  test('[Invalid date] Getters :: getUTCSecond', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCSecond()) === true);
  });

  test('[Invalid date] Getters :: getUTCMillisecond', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getUTCMillisecond()) === true);
  });

  test('[Invalid date] Getters :: getTime', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.getTime()) === true);
  });

  test('[Invalid date] Getters :: valueOf', function () {
    dt = createInvalidDate();
    ok(isNaN(dt.valueOf()) === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Format
   * ----------------------------------------------------------------------------------------
   */

  test('[Invalid date] Format', function () {
    dt = createInvalidDate();
    ok(dt.format() === 'Invalid date');
  });

  test('[Invalid date] Format :: toString', function () {
    dt = createInvalidDate();
    ok(dt.toString() === 'Invalid date');
  });

  test('[Invalid date] Format :: toLocaleString', function () {
    dt = createInvalidDate();
    ok(dt.toLocaleString() === 'Invalid date');
  });

  test('[Invalid date] Format :: toISOString', function () {
    dt = createInvalidDate();
    ok(dt.toISOString() === 'Invalid date');
  });

  test('[Invalid date] Format :: toUTCString', function () {
    dt = createInvalidDate();
    ok(dt.toUTCString() === 'Invalid date');
  });
})();
