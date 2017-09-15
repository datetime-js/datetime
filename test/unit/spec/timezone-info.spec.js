(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var MOSCOW_TIMEZONE = 'Europe/Moscow';

  var test = createTestFn();
  var dt;

  /**
   * ----------------------------------------------------------------------------------------
   * Timezone info
   * ----------------------------------------------------------------------------------------
   */

  test('[Timezone info] getTimezoneInfo', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', MOSCOW_TIMEZONE);
    var tzinfo = dt.getTimezoneInfo();

    ok(tzinfo.abbr === 'MSK');
    ok(tzinfo.dst === false);
    ok(tzinfo.name === MOSCOW_TIMEZONE);
    ok(tzinfo.offset === -10800000);
  });

  test('[Timezone info] getTimezoneName', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', MOSCOW_TIMEZONE);
    ok(dt.getTimezoneName() === MOSCOW_TIMEZONE);
  });

  test('[Timezone info] getTimezoneOffset', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', MOSCOW_TIMEZONE);
    ok(dt.getTimezoneOffset() === -10800000);
  });
})();
