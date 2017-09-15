(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();
  var dt;

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var MOSCOW_TIMEZONE = 'Europe/Moscow';
  var UTC_TIMEZONE = 'UTC';

  /**
   * ----------------------------------------------------------------------------------------
   * toString
   * ----------------------------------------------------------------------------------------
   */

  test('[toString] isEqual', function () {
    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)
    ) === true);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2017, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 11, 5, 14, 30, 45, 555], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 6, 14, 30, 45, 555], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 5, 15, 30, 45, 555], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 5, 14, 31, 45, 555], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 5, 14, 30, 46, 555], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 5, 14, 30, 45, 556], UTC_TIMEZONE)
      ) === false);

    ok((new DateTime([2016, 10, 5, 14, 30, 45, 555], UTC_TIMEZONE)).isEqual(
        new DateTime([2016, 10, 5, 14, 30, 45, 555], MOSCOW_TIMEZONE)
      ) === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toString
   * ----------------------------------------------------------------------------------------
   */

  test('[toString] Basic', function () {
    dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.toString() === 'Sat Apr 05 2014 15:20:35 GMT+0400 (MSK)');

    dt = new DateTime([1970, 1, 1, 14, 30, 49, 0], 'UTC');
    ok(dt.toString() === 'Thu Jan 01 1970 14:30:49 GMT+0000 (UTC)');
  });

  test('[toString] Offset greater than 10', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toString() === 'Sat May 10 2014 15:20:35 GMT+1200 (+12)');
  });

  test('[toString] Negative offset greater than 10', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toString() === 'Sat May 10 2014 15:20:35 GMT-1000 (HST)');
  });

  test('[toString] Fractional offset', function () {
    dt = new DateTime([1980, 5, 10, 15, 20, 35, 41], 'Singapore');
    ok(dt.toString() === 'Sat May 10 1980 15:20:35 GMT+0730 (+0730)');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toLocaleString
   * ----------------------------------------------------------------------------------------
   */

  test('[toLocaleString] Basic', function () {
    DateTime.setLocale('en');
    dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.toLocaleString() === '4/5/2014, 3:20:35 PM');
  });

  test('[toLocaleString] Offset greater than 10', function () {
    DateTime.setLocale('en');
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toLocaleString() === '5/10/2014, 3:20:35 PM');
  });

  test('[toLocaleString] Negative offset greater than 10', function () {
    DateTime.setLocale('en');
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toLocaleString() === '5/10/2014, 3:20:35 PM');
  });

  test('[toLocaleString] Fractional offset', function () {
    DateTime.setLocale('en');
    dt = new DateTime([1980, 5, 10, 11, 20, 35, 41], 'Singapore');
    ok(dt.toLocaleString() === '5/10/1980, 11:20:35 AM');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toISOString
   * ----------------------------------------------------------------------------------------
   */

  test('[toISOString] Basic', function () {
    dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.toISOString() === '2014-04-05T11:20:35.041Z');
  });

  test('[toISOString] Offset greater than 10', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toISOString() === '2014-05-10T03:20:35.041Z');
  });

  test('[toISOString] Negative offset greater than 10', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toISOString() === '2014-05-11T01:20:35.041Z');
  });

  test('[toISOString] Fractional offset', function () {
    dt = new DateTime([1980, 5, 10, 15, 20, 35, 41], 'Singapore');
    ok(dt.toISOString() === '1980-05-10T07:50:35.041Z');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toUTCString
   * ----------------------------------------------------------------------------------------
   */

  test('[toUTCString] Basic', function () {
    dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.toUTCString() === 'Sat, 05 Apr 2014 11:20:35 GMT');
  });

  test('[toUTCString] Offset greater than 10', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toUTCString() === 'Sat, 10 May 2014 03:20:35 GMT');
  });

  test('[toUTCString] Negative offset greater than 10', function () {
    dt = new DateTime([2014, 5, 9, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toUTCString() === 'Fri, 10 May 2014 01:20:35 GMT');
  });

  test('[toUTCString] Fractional offset', function () {
    dt = new DateTime([1980, 10, 5, 15, 20, 35, 41], 'Singapore');
    ok(dt.toUTCString() === 'Sun, 05 Oct 1980 07:50:35 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * valueOf
   * ----------------------------------------------------------------------------------------
   */

  test('[valueOf] Basic', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.valueOf() === 1399720835041);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toJSON
   * ----------------------------------------------------------------------------------------
   */

  test('[toJSON] basic', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.toJSON() === dt.toISOString());
  });
})();
