(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();

  /**
   * ----------------------------------------------------------------------------------------
   * Locale
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] getLocale', function () {
    ok(DateTime.getLocale() === 'en');
  });

  test('[Locale] setLocale', function () {
    DateTime.setLocale('ru');
    ok(DateTime.getLocale() === 'ru');
  });

  test('[Locale] setLocale :: Not found', function () {
    var err = null;

    DateTime.setLocale('en');

    try {
      DateTime.setLocale('unknown');
    } catch (ex) {
      err = ex;
    }

    ok(err !== null);
    ok(DateTime.getLocale() === 'en');
  });
})();
