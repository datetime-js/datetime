(function () {
  'use strict';

  var test = createTestFn();

  test('[DateTime.now]', function () {
    DateTime.setNow(function nowMock () {
      return 123;
    });

    ok(DateTime.now() === 123);
  });
})();
