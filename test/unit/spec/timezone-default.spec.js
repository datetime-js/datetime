(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var AMSTERDAM_TIMEZONE = 'Europe/Amsterdam';
  var MOSCOW_TIMEZONE = 'Europe/Moscow';

  var test = createTestFn();

  /**
   * ----------------------------------------------------------------------------------------
   * Default Timezone
   * ----------------------------------------------------------------------------------------
   */

  test('[Default Timezone] setDefaultTimezone/getDefaultTimezone', function () {
    DateTime.setDefaultTimezone(AMSTERDAM_TIMEZONE);
    ok(DateTime.getDefaultTimezone() === AMSTERDAM_TIMEZONE);

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);
    ok(DateTime.getDefaultTimezone() === MOSCOW_TIMEZONE);
  });
})();

