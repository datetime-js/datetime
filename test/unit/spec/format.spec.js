(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';
  var MOSCOW_TIMEZONE = 'Europe/Moscow';

  var test = createTestFn();
  var dt;

  /**
   * ----------------------------------------------------------------------------------------
   * Format
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Default', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], MOSCOW_TIMEZONE);
    ok(dt.format() === '2014-05-10T15:20:35+04:00');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Year
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Year :: YYYY', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('YYYY') === '2014');

    dt = new DateTime([123456, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('YYYY') === '123456');

    dt = new DateTime([944, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('YYYY') === '0944');

    dt = new DateTime([1, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('YYYY') === '0001');

    // @todo
    // dt = new DateTime([-44, 5, 10, 15, 20, 35, 41], 'UTC')
    // ok(dt.format('YYYY') === '-0044')
  });

  test('[Format] Year :: YY', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('YY') === '14');

    dt = new DateTime([1970, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('YY') === '70');

    // @todo
    // dt = new DateTime([88, 5, 10, 15, 20, 35, 41], 'UTC')
    // ok(dt.format('YY') === '88')
    //
    // dt = new DateTime([1, 5, 10, 15, 20, 35, 41], 'UTC')
    // ok(dt.format('YY') === '01')

    // dt = new DateTime([-5, 5, 10, 15, 20, 35, 41], 'UTC')
    // ok(dt.format('YY') === '-05')

    // dt = new DateTime([-13, 5, 10, 15, 20, 35, 41], 'UTC')
    // ok(dt.format('YY') === '-13')
  });

  test('[Format] Year :: Y', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Y') === '2014');

    dt = new DateTime([102014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Y') === '102014');

    dt = new DateTime([1970, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Y') === '1970');

    dt = new DateTime([88, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Y') === '88');

    dt = new DateTime([1, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Y') === '1');

    dt = new DateTime([-132, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Y') === '-132');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * ISO week year
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] ISO week year :: GGGG', function () {
    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('GGGG') === '2015');

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('GGGG') === '2016');

    dt = new DateTime([2018, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('GGGG') === '2019');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Month
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Month :: M', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('M') === '5');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('M') === '12');
  });

  test('[Format] Month :: Mo', function () {
    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Mo') === '1st');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Mo') === '2nd');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Mo') === '3rd');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Mo') === '4th');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Mo') === '12th');
  });

  test('[Format] Month :: MM', function () {
    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MM') === '05');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MM') === '12');
  });

  test('[Format] Month :: MMM', function () {
    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Jan');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Feb');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Mar');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Apr');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'May');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Jun');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Jul');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Aug');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Sep');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Oct');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Nov');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'Dec');
  });

  test('[Format] Month :: MMMM', function () {
    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'January');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'February');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'March');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'April');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'May');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'June');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'July');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'August');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'September');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'October');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'November');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'December');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Quarter
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Quarter :: Q', function () {
    dt = new DateTime([2014, 1, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '1');

    dt = new DateTime([2014, 2, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '1');

    dt = new DateTime([2014, 3, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '1');

    dt = new DateTime([2014, 4, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '2');

    dt = new DateTime([2014, 5, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '2');

    dt = new DateTime([2014, 6, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '2');

    dt = new DateTime([2014, 7, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '3');

    dt = new DateTime([2014, 8, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '3');

    dt = new DateTime([2014, 9, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '3');

    dt = new DateTime([2014, 10, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '4');

    dt = new DateTime([2014, 11, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '4');

    dt = new DateTime([2014, 12, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Q') === '4');
  });

  test('[Format] Quarter :: Qo', function () {
    dt = new DateTime([2014, 1, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '1st');

    dt = new DateTime([2014, 2, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '1st');

    dt = new DateTime([2014, 3, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '1st');

    dt = new DateTime([2014, 4, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '2nd');

    dt = new DateTime([2014, 5, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '2nd');

    dt = new DateTime([2014, 6, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '2nd');

    dt = new DateTime([2014, 7, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '3rd');

    dt = new DateTime([2014, 8, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '3rd');

    dt = new DateTime([2014, 9, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '3rd');

    dt = new DateTime([2014, 10, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '4th');

    dt = new DateTime([2014, 11, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '4th');

    dt = new DateTime([2014, 12, 25, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Qo') === '4th');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * ISO week of year
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] ISO week of year :: W', function () {
    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('W') === '1');

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('W') === '52');

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('W') === '53');
  });

  test('[Format] ISO week of year :: Wo', function () {
    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('Wo') === '1st');

    dt = new DateTime([2016, 3, 20, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('Wo') === '11th');

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('Wo') === '52nd');

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('Wo') === '53rd');
  });

  test('[Format] ISO week of year :: WW', function () {
    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('WW') === '01');

    dt = new DateTime([2016, 2, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('WW') === '05');

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('WW') === '52');

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('WW') === '53');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Day of year
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Day of year :: DDDD', function () {
    dt = new DateTime([2014, 1, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '001');

    dt = new DateTime([2014, 1, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '005');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '010');

    dt = new DateTime([2014, 1, 24, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '024');

    dt = new DateTime([2014, 2, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '032');

    dt = new DateTime([2014, 2, 28, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '059');

    dt = new DateTime([2014, 3, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '060');

    dt = new DateTime([2014, 7, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '210');

    dt = new DateTime([2014, 12, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '365');

    dt = new DateTime([2016, 2, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '060');

    dt = new DateTime([2016, 3, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '061');

    dt = new DateTime([2016, 7, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '211');

    dt = new DateTime([2016, 12, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDD') === '366');
  });

  test('[Format] Day of year :: DDD', function () {
    dt = new DateTime([2014, 1, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '1');

    dt = new DateTime([2014, 1, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '5');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '10');

    dt = new DateTime([2014, 1, 24, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '24');

    dt = new DateTime([2014, 2, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '32');

    dt = new DateTime([2014, 2, 28, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '59');

    dt = new DateTime([2014, 3, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '60');

    dt = new DateTime([2014, 7, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '210');

    dt = new DateTime([2014, 12, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '365');

    dt = new DateTime([2016, 2, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '60');

    dt = new DateTime([2016, 3, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '61');

    dt = new DateTime([2016, 7, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '211');

    dt = new DateTime([2016, 12, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDD') === '366');
  });

  test('[Format] Day of year :: DDDo', function () {
    dt = new DateTime([2014, 1, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '1st');

    dt = new DateTime([2014, 1, 2, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '2nd');

    dt = new DateTime([2014, 1, 3, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '3rd');

    dt = new DateTime([2014, 1, 4, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '4th');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '10th');

    dt = new DateTime([2014, 1, 11, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '11th');

    dt = new DateTime([2014, 1, 12, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '12th');

    dt = new DateTime([2014, 1, 13, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '13th');

    dt = new DateTime([2014, 1, 22, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '22nd');

    dt = new DateTime([2014, 2, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '32nd');

    dt = new DateTime([2014, 2, 28, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '59th');

    dt = new DateTime([2014, 3, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '60th');

    dt = new DateTime([2014, 7, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '210th');

    dt = new DateTime([2014, 12, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '365th');

    dt = new DateTime([2016, 2, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '60th');

    dt = new DateTime([2016, 3, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '61st');

    dt = new DateTime([2016, 7, 29, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '211th');

    dt = new DateTime([2016, 7, 21, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '203rd');

    dt = new DateTime([2016, 12, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DDDo') === '366th');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Day of month
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Day of month :: DD', function () {
    dt = new DateTime([2014, 5, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD') === '31');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD') === '10');

    dt = new DateTime([2014, 5, 2, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD') === '02');
  });

  test('[Format] Day of month :: Do', function () {
    dt = new DateTime([2014, 5, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '1st');

    dt = new DateTime([2014, 5, 2, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '2nd');

    dt = new DateTime([2014, 5, 3, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '3rd');

    dt = new DateTime([2014, 5, 4, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '4th');

    dt = new DateTime([2014, 5, 20, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '20th');

    dt = new DateTime([2014, 5, 21, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '21st');

    dt = new DateTime([2014, 5, 22, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '22nd');

    dt = new DateTime([2014, 5, 23, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '23rd');

    dt = new DateTime([2014, 5, 30, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '30th');

    dt = new DateTime([2014, 5, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '31st');
  });

  test('[Format] Day of month :: D', function () {
    dt = new DateTime([2014, 5, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D') === '31');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D') === '10');

    dt = new DateTime([2014, 5, 2, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D') === '2');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Day of week
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Day of week :: dddd', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Sunday');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Monday');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Tuesday');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Wednesday');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Thursday');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Friday');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Saturday');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'Sunday');
  });

  test('[Format] Day of week :: ddd', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Sun');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Mon');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Tue');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Wed');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Thu');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Fri');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Sat');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'Sun');
  });

  test('[Format] Day of week :: dd', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Su');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Mo');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Tu');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'We');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Th');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Fr');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Sa');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'Su');
  });

  test('[Format] Day of week :: do', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '0th');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '1st');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '2nd');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '3rd');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '4th');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '5th');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '6th');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('do') === '0th');
  });

  test('[Format] Day of week :: d', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '0');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '1');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '2');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '3');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '4');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '5');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '6');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('d') === '0');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Day of week locale
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Day of week locale :: e', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '0');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '1');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '2');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '3');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '4');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '5');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '6');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '0');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Day of week IOS
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Day of week ISO :: E', function () {
    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '7');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '1');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '2');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '3');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '4');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '5');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '6');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('E') === '7');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Hour
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Hour :: HH', function () {
    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('HH') === '22');

    dt = new DateTime([2014, 5, 31, 12, 20, 35, 41], 'UTC');
    ok(dt.format('HH') === '12');

    dt = new DateTime([2014, 5, 31, 8, 20, 35, 41], 'UTC');
    ok(dt.format('HH') === '08');

    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('HH') === '00');
  });

  test('[Format] Hour :: H', function () {
    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('H') === '22');

    dt = new DateTime([2014, 5, 31, 12, 20, 35, 41], 'UTC');
    ok(dt.format('H') === '12');

    dt = new DateTime([2014, 5, 31, 8, 20, 35, 41], 'UTC');
    ok(dt.format('H') === '8');

    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('H') === '0');
  });

  test('[Format] Hour :: hh', function () {
    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '12');

    dt = new DateTime([2014, 5, 31, 1, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '01');

    dt = new DateTime([2014, 5, 31, 8, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '08');

    dt = new DateTime([2014, 5, 31, 11, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '11');

    dt = new DateTime([2014, 5, 31, 12, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '12');

    dt = new DateTime([2014, 5, 31, 13, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '01');

    dt = new DateTime([2014, 5, 31, 19, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '07');

    dt = new DateTime([2014, 5, 31, 23, 20, 35, 41], 'UTC');
    ok(dt.format('hh') === '11');
  });

  test('[Format] Hour :: h', function () {
    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '12');

    dt = new DateTime([2014, 5, 31, 1, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '1');

    dt = new DateTime([2014, 5, 31, 8, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '8');

    dt = new DateTime([2014, 5, 31, 11, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '11');

    dt = new DateTime([2014, 5, 31, 12, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '12');

    dt = new DateTime([2014, 5, 31, 13, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '1');

    dt = new DateTime([2014, 5, 31, 19, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '7');

    dt = new DateTime([2014, 5, 31, 23, 20, 35, 41], 'UTC');
    ok(dt.format('h') === '11');
  });

  test('[Format] Hour :: kk', function () {
    dt = new DateTime([2014, 5, 31, 1, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '01');

    dt = new DateTime([2014, 5, 31, 8, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '08');

    dt = new DateTime([2014, 5, 31, 11, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '11');

    dt = new DateTime([2014, 5, 31, 12, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '12');

    dt = new DateTime([2014, 5, 31, 13, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '13');

    dt = new DateTime([2014, 5, 31, 23, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '23');

    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('kk') === '24');
  });

  test('[Format] Hour :: k', function () {
    dt = new DateTime([2014, 5, 31, 1, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '1');

    dt = new DateTime([2014, 5, 31, 8, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '8');

    dt = new DateTime([2014, 5, 31, 11, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '11');

    dt = new DateTime([2014, 5, 31, 12, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '12');

    dt = new DateTime([2014, 5, 31, 13, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '13');

    dt = new DateTime([2014, 5, 31, 23, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '23');

    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('k') === '24');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Meridiem
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Meridiem :: A', function () {
    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('A') === 'AM');

    dt = new DateTime([2014, 5, 31, 1, 20, 35, 41], 'UTC');
    ok(dt.format('A') === 'AM');

    dt = new DateTime([2014, 5, 31, 11, 20, 35, 41], 'UTC');
    ok(dt.format('A') === 'AM');

    dt = new DateTime([2014, 5, 31, 13, 20, 35, 41], 'UTC');
    ok(dt.format('A') === 'PM');

    dt = new DateTime([2014, 5, 31, 23, 20, 35, 41], 'UTC');
    ok(dt.format('A') === 'PM');
  });

  test('[Format] Meridiem :: a', function () {
    dt = new DateTime([2014, 5, 31, 0, 20, 35, 41], 'UTC');
    ok(dt.format('a') === 'am');

    dt = new DateTime([2014, 5, 31, 1, 20, 35, 41], 'UTC');
    ok(dt.format('a') === 'am');

    dt = new DateTime([2014, 5, 31, 11, 20, 35, 41], 'UTC');
    ok(dt.format('a') === 'am');

    dt = new DateTime([2014, 5, 31, 13, 20, 35, 41], 'UTC');
    ok(dt.format('a') === 'pm');

    dt = new DateTime([2014, 5, 31, 23, 20, 35, 41], 'UTC');
    ok(dt.format('a') === 'pm');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Minute
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Minute :: mm', function () {
    dt = new DateTime([2014, 5, 31, 22, 0, 35, 41], 'UTC');
    ok(dt.format('mm') === '00');

    dt = new DateTime([2014, 5, 31, 22, 5, 35, 41], 'UTC');
    ok(dt.format('mm') === '05');

    dt = new DateTime([2014, 5, 31, 22, 44, 35, 41], 'UTC');
    ok(dt.format('mm') === '44');

    dt = new DateTime([2014, 5, 31, 22, 59, 35, 41], 'UTC');
    ok(dt.format('mm') === '59');
  });

  test('[Format] Minute :: m', function () {
    dt = new DateTime([2014, 5, 31, 22, 0, 35, 41], 'UTC');
    ok(dt.format('m') === '0');

    dt = new DateTime([2014, 5, 31, 22, 5, 35, 41], 'UTC');
    ok(dt.format('m') === '5');

    dt = new DateTime([2014, 5, 31, 22, 10, 35, 41], 'UTC');
    ok(dt.format('m') === '10');

    dt = new DateTime([2014, 5, 31, 22, 44, 35, 41], 'UTC');
    ok(dt.format('m') === '44');

    dt = new DateTime([2014, 5, 31, 22, 59, 35, 41], 'UTC');
    ok(dt.format('m') === '59');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Second
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Second :: ss', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], 'UTC');
    ok(dt.format('ss') === '00');

    dt = new DateTime([2014, 5, 31, 22, 15, 5, 41], 'UTC');
    ok(dt.format('ss') === '05');

    dt = new DateTime([2014, 5, 31, 22, 15, 10, 41], 'UTC');
    ok(dt.format('ss') === '10');

    dt = new DateTime([2014, 5, 31, 22, 15, 44, 41], 'UTC');
    ok(dt.format('ss') === '44');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 41], 'UTC');
    ok(dt.format('ss') === '59');
  });

  test('[Format] Second :: s', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], 'UTC');
    ok(dt.format('s') === '0');

    dt = new DateTime([2014, 5, 31, 22, 15, 5, 41], 'UTC');
    ok(dt.format('s') === '5');

    dt = new DateTime([2014, 5, 31, 22, 15, 10, 41], 'UTC');
    ok(dt.format('s') === '10');

    dt = new DateTime([2014, 5, 31, 22, 15, 44, 41], 'UTC');
    ok(dt.format('s') === '44');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 41], 'UTC');
    ok(dt.format('s') === '59');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Fractional second
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Fractional second :: SSS', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 0, 0], 'UTC');
    ok(dt.format('SSS') === '000');

    dt = new DateTime([2014, 5, 31, 22, 15, 5, 5], 'UTC');
    ok(dt.format('SSS') === '005');

    dt = new DateTime([2014, 5, 31, 22, 15, 10, 10], 'UTC');
    ok(dt.format('SSS') === '010');

    dt = new DateTime([2014, 5, 31, 22, 15, 44, 99], 'UTC');
    ok(dt.format('SSS') === '099');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 445], 'UTC');
    ok(dt.format('SSS') === '445');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 999], 'UTC');
    ok(dt.format('SSS') === '999');
  });

  test('[Format] Fractional second :: SS', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 0, 0], 'UTC');
    ok(dt.format('SS') === '00');

    dt = new DateTime([2014, 5, 31, 22, 15, 5, 5], 'UTC');
    ok(dt.format('SS') === '05');

    dt = new DateTime([2014, 5, 31, 22, 15, 10, 10], 'UTC');
    ok(dt.format('SS') === '10');

    dt = new DateTime([2014, 5, 31, 22, 15, 44, 99], 'UTC');
    ok(dt.format('SS') === '99');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 445], 'UTC');
    ok(dt.format('SS') === '445');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 999], 'UTC');
    ok(dt.format('SS') === '999');
  });

  test('[Format] Fractional second :: S', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 0, 0], 'UTC');
    ok(dt.format('S') === '0');

    dt = new DateTime([2014, 5, 31, 22, 15, 5, 5], 'UTC');
    ok(dt.format('S') === '5');

    dt = new DateTime([2014, 5, 31, 22, 15, 10, 10], 'UTC');
    ok(dt.format('S') === '10');

    dt = new DateTime([2014, 5, 31, 22, 15, 44, 99], 'UTC');
    ok(dt.format('S') === '99');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 445], 'UTC');
    ok(dt.format('S') === '445');

    dt = new DateTime([2014, 5, 31, 22, 15, 59, 999], 'UTC');
    ok(dt.format('S') === '999');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Timestamp
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Timestamp :: X', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 45, 134], 'UTC');
    ok(dt.format('X') === '1401574545');

    dt = new DateTime([2014, 5, 31, 22, 15, 45, 634], 'UTC');
    ok(dt.format('X') === '1401574545');

    dt = new DateTime([1932, 5, 31, 22, 15, 45, 134], 'UTC');
    ok(dt.format('X') === '-1186105455');
  });

  test('[Format] Timestamp :: x', function () {
    dt = new DateTime([2014, 5, 31, 22, 15, 45, 134], 'UTC');
    ok(dt.format('x') === '1401574545134');

    dt = new DateTime([1932, 5, 31, 22, 15, 45, 134], 'UTC');
    ok(dt.format('x') === '-1186105454866');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Timezone
   * ----------------------------------------------------------------------------------------
   */

  test('[Format] Timezone :: ZZ', function () {
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
        false,
        false,
        false,
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
    ok(dt.format('ZZ') === '+0000');

    dt = new DateTime([1970, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('ZZ') === '+0300');

    dt = new DateTime([1985, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('ZZ') === '-0300');

    dt = new DateTime([1995, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('ZZ') === '+0430');

    dt = new DateTime([2005, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('ZZ') === '-0015');

    dt = new DateTime([1981, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('ZZ') === '-0300');

    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('ZZ') === '+0400');
  });

  test('[Format] Timezone :: Z', function () {
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
        false,
        false,
        false,
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
    ok(dt.format('Z') === '+00:00');

    dt = new DateTime([1970, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('Z') === '+03:00');

    dt = new DateTime([1985, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('Z') === '-03:00');

    dt = new DateTime([1995, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('Z') === '+04:30');

    dt = new DateTime([2005, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('Z') === '-00:15');

    dt = new DateTime([1981, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('Z') === '-03:00');

    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('Z') === '+04:00');
  });

  test('[Format] Timezone :: zz', function () {
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
        false,
        false,
        false,
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
    ok(dt.format('zz') === 'UTC');

    dt = new DateTime([1970, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('zz') === 'TEST_1');

    dt = new DateTime([1985, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('zz') === 'TEST_2');

    dt = new DateTime([1995, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('zz') === 'TEST_3');

    dt = new DateTime([2005, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('zz') === 'TEST_4');

    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('zz') === 'TEST_5');
  });

  test('[Format] Timezone :: z', function () {
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
        false,
        false,
        false,
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
    ok(dt.format('z') === 'UTC');

    dt = new DateTime([1970, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('z') === 'TEST_1');

    dt = new DateTime([1985, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('z') === 'TEST_2');

    dt = new DateTime([1995, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('z') === 'TEST_3');

    dt = new DateTime([2005, 1, 1, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('z') === 'TEST_4');

    dt = new DateTime([2014, 5, 31, 22, 15, 0, 41], TEST_TIMEZONE);
    ok(dt.format('z') === 'TEST_5');
  });
})();
