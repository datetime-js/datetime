(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();

  var dt;
  var dt2;

  var MOSCOW_TIMEZONE = 'Europe/Moscow';

  /**
   * ----------------------------------------------------------------------------------------
   * Clone
   * ----------------------------------------------------------------------------------------
   */

  test('[Clone] UTC', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300');
    dt2 = dt.clone();

    ok(dt !== dt2);
    ok(equalDates(dt, dt2) === true);
  });

  test('[Clone] Timezone', function () {
    dt = new DateTime('2015-10-05T14:23:52+0300', MOSCOW_TIMEZONE);
    dt2 = dt.clone();

    ok(dt !== dt2);
    ok(equalDates(dt, dt2) === true);
  });
})();
