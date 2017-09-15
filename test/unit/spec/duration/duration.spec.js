(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();
  var Duration = DateTime.Duration;

  function getAttributes (duration) {
    return [
      duration.getYears(),
      duration.getMonths(),
      duration.getDays(),
      duration.getHours(),
      duration.getMinutes(),
      duration.getSeconds()
    ];
  }

  function isInvalid (duration) {
    return duration.isValid() === false &&
      duration.isInvalid() === true &&
      duration.toString() === 'Invalid duration';
  }

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Duration] Class', function () {
    ok(typeof Duration === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create instance
   * ----------------------------------------------------------------------------------------
   */

  test('[Duration] Create :: No arguments', function () {
    var duration = new Duration();
    ok(equalArrays(getAttributes(duration), [0, 0, 0, 0, 0, 0]));
  });

  test('[Duration] Create :: Positive', function () {
    var duration;

    duration = new Duration('P10Y');
    ok(equalArrays(getAttributes(duration), [10, 0, 0, 0, 0, 0]));

    duration = new Duration('P10Y5M');
    ok(equalArrays(getAttributes(duration), [10, 5, 0, 0, 0, 0]));

    duration = new Duration('P10Y5M12D');
    ok(equalArrays(getAttributes(duration), [10, 5, 12, 0, 0, 0]));

    duration = new Duration('P10Y5M12DT14H');
    ok(equalArrays(getAttributes(duration), [10, 5, 12, 14, 0, 0]));

    duration = new Duration('P10Y5M12DT14H55M');
    ok(equalArrays(getAttributes(duration), [10, 5, 12, 14, 55, 0]));

    duration = new Duration('P10Y5M12DT14H55M01S');
    ok(equalArrays(getAttributes(duration), [10, 5, 12, 14, 55, 1]));

    duration = new Duration('P10Y12D');
    ok(equalArrays(getAttributes(duration), [10, 0, 12, 0, 0, 0]));

    duration = new Duration('P10Y5MT6M');
    ok(equalArrays(getAttributes(duration), [10, 5, 0, 0, 6, 0]));

    duration = new Duration('P0010Y05MT06M');
    ok(equalArrays(getAttributes(duration), [10, 5, 0, 0, 6, 0]));

    duration = new Duration('P10YT5M');
    ok(equalArrays(getAttributes(duration), [10, 0, 0, 0, 5, 0]));
  });

  test('[Duration] Create :: Negative', function () {
    var duration;

    duration = new Duration('-P10Y');
    ok(equalArrays(getAttributes(duration), [-10, 0, 0, 0, 0, 0]));

    duration = new Duration('-P10Y5M');
    ok(equalArrays(getAttributes(duration), [-10, -5, 0, 0, 0, 0]));

    duration = new Duration('-P10Y5M12D');
    ok(equalArrays(getAttributes(duration), [-10, -5, -12, 0, 0, 0]));

    duration = new Duration('-P10Y5M12DT14H');
    ok(equalArrays(getAttributes(duration), [-10, -5, -12, -14, 0, 0]));

    duration = new Duration('-P10Y5M12DT14H55M');
    ok(equalArrays(getAttributes(duration), [-10, -5, -12, -14, -55, 0]));

    duration = new Duration('-P10Y5M12DT14H55M01S');
    ok(equalArrays(getAttributes(duration), [-10, -5, -12, -14, -55, -1]));

    duration = new Duration('-P10Y12D');
    ok(equalArrays(getAttributes(duration), [-10, 0, -12, 0, 0, 0]));

    duration = new Duration('-P10Y5MT6M');
    ok(equalArrays(getAttributes(duration), [-10, -5, 0, 0, -6, 0]));

    duration = new Duration('-P0010Y05MT06M');
    ok(equalArrays(getAttributes(duration), [-10, -5, 0, 0, -6, 0]));

    duration = new Duration('-P10YT5M');
    ok(equalArrays(getAttributes(duration), [-10, 0, 0, 0, -5, 0]));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Getters
   * ----------------------------------------------------------------------------------------
   */

  test('[Duration] Getters', function () {
    var duration;

    duration = new Duration('P10Y5M12DT14H55M01S');

    ok(duration.getYears() === 10);
    ok(duration.getMonths() === 5);
    ok(duration.getDays() === 12);
    ok(duration.getHours() === 14);
    ok(duration.getMinutes() === 55);
    ok(duration.getSeconds() === 1);

    duration = new Duration('P10Y12D');

    ok(duration.getYears() === 10);
    ok(duration.getMonths() === 0);
    ok(duration.getDays() === 12);
    ok(duration.getHours() === 0);
    ok(duration.getMinutes() === 0);
    ok(duration.getSeconds() === 0);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Duration] toString :: Positive', function () {
    var duration;

    duration = new Duration('P10Y5M12DT14H55M01S');
    ok(duration.toString() === 'P10Y5M12DT14H55M1S');

    duration = new Duration('P10Y12D');
    ok(duration.toString() === 'P10Y12D');

    duration = new Duration('P10Y12DT14H');
    ok(duration.toString() === 'P10Y12DT14H');

    duration = new Duration('P10YT12M');
    ok(duration.toString() === 'P10YT12M');
  });

  test('[Duration] toString :: Negative', function () {
    var duration;

    duration = new Duration('-P10Y5M12DT14H55M01S');
    ok(duration.toString() === '-P10Y5M12DT14H55M1S');

    duration = new Duration('-P10Y12D');
    ok(duration.toString() === '-P10Y12D');

    duration = new Duration('-P10Y12DT14H');
    ok(duration.toString() === '-P10Y12DT14H');

    duration = new Duration('-P10YT12M');
    ok(duration.toString() === '-P10YT12M');
  });

  test('[Duration] toISOString :: Positive', function () {
    var duration;

    duration = new Duration('P10Y5M12DT14H55M01S');
    ok(duration.toISOString() === 'P10Y5M12DT14H55M1S');

    duration = new Duration('P10Y12D');
    ok(duration.toISOString() === 'P10Y12D');

    duration = new Duration('P10Y12DT14H');
    ok(duration.toISOString() === 'P10Y12DT14H');

    duration = new Duration('P10YT12M');
    ok(duration.toISOString() === 'P10YT12M');
  });

  test('[Duration] toISOString :: Negative', function () {
    var duration;

    duration = new Duration('-P10Y5M12DT14H55M01S');
    ok(duration.toISOString() === '-P10Y5M12DT14H55M1S');

    duration = new Duration('-P10Y12D');
    ok(duration.toISOString() === '-P10Y12D');

    duration = new Duration('-P10Y12DT14H');
    ok(duration.toISOString() === '-P10Y12DT14H');

    duration = new Duration('-P10YT12M');
    ok(duration.toISOString() === '-P10YT12M');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Misc
   * ----------------------------------------------------------------------------------------
   */

  test('[Duration] isInvalid', function () {
    var duration;

    duration = new Duration('P10Y12D');
    ok(duration.isInvalid() === false);

    duration = new Duration();
    ok(duration.isInvalid() === false);

    duration = new Duration('bla');
    ok(duration.isInvalid() === true);
  });

  test('[Duration] isParsableAsDuration', function () {
    ok(Duration.isParsableAsDuration('P10Y12D') === true);
    ok(Duration.isParsableAsDuration('P10Y12DT') === true);
    ok(Duration.isParsableAsDuration('P10Y12DT14H') === true);
    ok(Duration.isParsableAsDuration('PT14H') === true);
    ok(Duration.isParsableAsDuration('P') === true);

    ok(Duration.isParsableAsDuration() === false);
    ok(Duration.isParsableAsDuration('') === false);

    ok(Duration.isParsableAsDuration('p') === false);
    ok(Duration.isParsableAsDuration('K') === false);

    ok(Duration.isParsableAsDuration('P10Ybla') === false);
    ok(Duration.isParsableAsDuration('P14H') === false);
    ok(Duration.isParsableAsDuration('P10M5Y') === false);
  });
})();
