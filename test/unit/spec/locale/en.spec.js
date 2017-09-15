(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var Day = DateTime.Day;

  var MOSCOW_TIMEZONE = 'Europe/Moscow';
  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();

  /**
   * ----------------------------------------------------------------------------------------
   * Month names
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: Month names :: Full', function () {
    var dt;

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'January');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 January');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'February');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 February');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'March');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 March');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'April');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('10 MMMM') === '10 April');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'May');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 May');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'June');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 June');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'July');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 July');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'August');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 August');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'September');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 September');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'October');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 October');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'November');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 November');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMMM') === 'December');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('DD MMMM') === '10 December');
  });

  test('[Locale] EN :: Month names :: Short', function () {
    var dt;

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Jan');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Feb');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Mar');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Apr');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'May');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Jun');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Jul');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Aug');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Sep');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Oct');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Nov');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('MMM') === 'Dec');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Weekday names
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: Weekday names :: Full', function () {
    var dt;

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Sunday');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Monday');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Tuesday');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Wednesday');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Thursday');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Friday');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Saturday');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dddd') === 'Sunday');
  });

  test('[Locale] EN :: Weekday names :: Short', function () {
    var dt;

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Sun');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Mon');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Tue');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Wed');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Thu');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Fri');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Sat');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('ddd') === 'Sun');
  });

  test('[Locale] EN :: Weekday names :: Shortest', function () {
    var dt;

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Su');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Mo');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Tu');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'We');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Th');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Fr');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Sa');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('dd') === 'Su');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Ordinals
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: Ordinals', function () {
    var dt;

    dt = new DateTime([2014, 5, 1, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '1st');

    dt = new DateTime([2014, 5, 2, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '2nd');

    dt = new DateTime([2014, 5, 3, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '3rd');

    dt = new DateTime([2014, 5, 4, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '4th');

    dt = new DateTime([2014, 5, 20, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '20th');

    dt = new DateTime([2014, 5, 21, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '21st');

    dt = new DateTime([2014, 5, 22, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '22nd');

    dt = new DateTime([2014, 5, 23, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '23rd');

    dt = new DateTime([2014, 5, 30, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '30th');

    dt = new DateTime([2014, 5, 31, 15, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('Do') === '31st');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * ISO day of weeks
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: getISODayOfWeek :: UTC', function () {
    var dt;

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 1);

    dt = new DateTime([2016, 1, 5, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 2);

    dt = new DateTime([2016, 1, 6, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 3);

    dt = new DateTime([2016, 1, 7, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 4);

    dt = new DateTime([2016, 1, 8, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 5);

    dt = new DateTime([2016, 1, 9, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 6);

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 7);

    dt = new DateTime([2016, 1, 11, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getISODayOfWeek() === 1);
  });

  test('[Locale] EN :: getISODayOfWeek :: Timezone', function () {
    var dt;

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 1);

    dt = new DateTime([2016, 1, 5, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 2);

    dt = new DateTime([2016, 1, 6, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 3);

    dt = new DateTime([2016, 1, 7, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 4);

    dt = new DateTime([2016, 1, 8, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 5);

    dt = new DateTime([2016, 1, 9, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 6);

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 7);

    dt = new DateTime([2016, 1, 11, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getISODayOfWeek() === 1);
  });

  test('[Locale] EN :: setISODayOfWeek :: UTC', function () {
    var dt;

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setISODayOfWeek(2);
    ok(dt.getISODayOfWeek() === 2);
    ok(equalDates(dt, new DateTime([2016, 1, 5, 0, 0, 0, 0], UTC_TIMEZONE)));

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setISODayOfWeek(3);
    ok(dt.getISODayOfWeek() === 3);
    ok(equalDates(dt, new DateTime([2016, 1, 6, 0, 0, 0, 0], UTC_TIMEZONE)));

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setISODayOfWeek(4);
    ok(dt.getISODayOfWeek() === 4);
    ok(equalDates(dt, new DateTime([2016, 1, 7, 0, 0, 0, 0], UTC_TIMEZONE)));

    dt = new DateTime([2016, 1, 5, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setISODayOfWeek(5);
    ok(dt.getISODayOfWeek() === 5);
    ok(equalDates(dt, new DateTime([2016, 1, 8, 0, 0, 0, 0], UTC_TIMEZONE)));

    dt = new DateTime([2016, 1, 6, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setISODayOfWeek(6);
    ok(dt.getISODayOfWeek() === 6);
    ok(equalDates(dt, new DateTime([2016, 1, 9, 0, 0, 0, 0], UTC_TIMEZONE)));

    dt = new DateTime([2016, 1, 7, 0, 0, 0, 0], UTC_TIMEZONE);
    dt.setISODayOfWeek(7);
    ok(dt.getISODayOfWeek() === 7);
    ok(equalDates(dt, new DateTime([2016, 1, 10, 0, 0, 0, 0], UTC_TIMEZONE)));
  });

  test('[Locale] EN :: setISODayOfWeek :: Timezone', function () {
    var dt;

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    dt.setISODayOfWeek(2);
    ok(dt.getISODayOfWeek() === 2);
    ok(equalDates(dt, new DateTime([2016, 1, 5, 0, 0, 0, 0], MOSCOW_TIMEZONE)));

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    dt.setISODayOfWeek(3);
    ok(dt.getISODayOfWeek() === 3);
    ok(equalDates(dt, new DateTime([2016, 1, 6, 0, 0, 0, 0], MOSCOW_TIMEZONE)));

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    dt.setISODayOfWeek(4);
    ok(dt.getISODayOfWeek() === 4);
    ok(equalDates(dt, new DateTime([2016, 1, 7, 0, 0, 0, 0], MOSCOW_TIMEZONE)));

    dt = new DateTime([2016, 1, 5, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    dt.setISODayOfWeek(5);
    ok(dt.getISODayOfWeek() === 5);
    ok(equalDates(dt, new DateTime([2016, 1, 8, 0, 0, 0, 0], MOSCOW_TIMEZONE)));

    dt = new DateTime([2016, 1, 6, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    dt.setISODayOfWeek(6);
    ok(dt.getISODayOfWeek() === 6);
    ok(equalDates(dt, new DateTime([2016, 1, 9, 0, 0, 0, 0], MOSCOW_TIMEZONE)));

    dt = new DateTime([2016, 1, 7, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    dt.setISODayOfWeek(7);
    ok(dt.getISODayOfWeek() === 7);
    ok(equalDates(dt, new DateTime([2016, 1, 10, 0, 0, 0, 0], MOSCOW_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getWeekOfYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: getWeekOfYear :: UTC :: Regular year', function () {
    var dt;

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 9, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 2);

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 20);

    dt = new DateTime([2016, 12, 24, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 51);

    dt = new DateTime([2016, 12, 25, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] EN :: getWeekOfYear :: UTC :: Year with leap week', function () {
    var dt;

    dt = new DateTime([2015, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2015, 12, 26, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2015, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] EN :: getWeekOfYear :: UTC :: Before UNIX epoch', function () {
    var dt;

    dt = new DateTime([1949, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([1950, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([1950, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] EN :: getWeekOfYear :: Timezone :: Regular year', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 9, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 2);

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 20);

    dt = new DateTime([2016, 12, 24, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 51);

    dt = new DateTime([2016, 12, 25, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 1, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] EN :: getWeekOfYear :: Timezone :: Year with leap week', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);

    dt = new DateTime([2015, 1, 1, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2015, 12, 26, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2015, 12, 31, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] EN :: getWeekOfYear :: Timezone :: Offset changed', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);

    // Sun Mar 20 2011 00:00:00 GMT+0300 (MSK)
    dt = new DateTime([2011, 3, 20, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 12);

    // Sat Mar 26 2011 23:59:999 GMT+0300 (MSK)
    dt = new DateTime([2011, 3, 26, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 12);

    // Sun Mar 20 2011 00:00:00 GMT+0300 (MSK)
    dt = new DateTime([2011, 3, 27, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 13);

    // Sat Apr 02 2011 23:59:999 GMT+0400 (MSK)
    dt = new DateTime([2011, 4, 2, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 13);
  });

  test('[Locale] EN :: getWeekOfYear :: Timezone :: Before UNIX epoch', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);

    dt = new DateTime([1949, 12, 31, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([1950, 1, 1, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([1950, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] EN :: getWeekYear :: UTC', function () {
    var dt;

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2015);

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2017, 12, 30, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2017);

    dt = new DateTime([2017, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2018);
  });

  test('[Locale] EN :: getWeekYear :: Timezone', function () {
    var dt;

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekYear() === 2015);

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2017, 12, 30, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekYear() === 2017);

    dt = new DateTime([2017, 12, 31, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekYear() === 2018);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Format
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: Format :: Week of year :: w', function () {
    var dt;

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('w') === '1');

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('w') === '2');

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('w') === '20');

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('w') === '52');

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.format('w') === '53');
  });

  test('[Locale] EN :: Format :: Week of year :: wo', function () {
    var dt;

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('wo') === '1st');

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('wo') === '2nd');

    dt = new DateTime([2016, 1, 17, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('wo') === '3rd');

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('wo') === '20th');

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('wo') === '52nd');

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.format('wo') === '53rd');
  });

  test('[Locale] EN :: Format :: Week of year :: ww', function () {
    var dt;

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('ww') === '01');

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('ww') === '02');

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('ww') === '20');

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('ww') === '52');

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.format('ww') === '53');
  });

  test('[Locale] EN :: Format :: Week year :: gggg', function () {
    var dt;

    dt = new DateTime([2016, 1, 2, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('gggg') === '2015');

    dt = new DateTime([2016, 1, 3, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('gggg') === '2016');

    dt = new DateTime([2017, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('gggg') === '2018');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * First day of week
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: First day of week :: getDayOfWeek', function () {
    var day;
    var dt;

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 1);

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.getDayOfWeek() === 6);

    day = new Day('1979-04-29T03:00:00+0100', UTC_TIMEZONE);
    ok(day.getDayOfWeek() === 0);

    day = new Day('1979-05-05T03:00:00+0100', UTC_TIMEZONE);
    ok(day.getDayOfWeek() === 6);
  });

  test('[Locale] EN :: First day of week :: setDayOfWeek', function () {
    var dt;

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], UTC_TIMEZONE);

    dt.setDayOfWeek(0);
    ok(equalDates(dt, new DateTime([2014, 5, 25, 22, 20, 35, 41], UTC_TIMEZONE)) === true);
    ok(dt.getDayOfWeek() === 0);

    dt.setDayOfWeek(1);
    ok(equalDates(dt, new DateTime([2014, 5, 26, 22, 20, 35, 41], UTC_TIMEZONE)) === true);
    ok(dt.getDayOfWeek() === 1);

    dt.setDayOfWeek(6);
    ok(equalDates(dt, new DateTime([2014, 5, 31, 22, 20, 35, 41], UTC_TIMEZONE)) === true);
    ok(dt.getDayOfWeek() === 6);
  });

  test('[Locale] EN :: First day of week :: setStartOfWeek', function () {
    var dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], UTC_TIMEZONE);

    dt.setStartOfWeek();
    ok(dt.getDayOfMonth() === 25);
  });

  test('[Locale] EN :: First day of week :: format', function () {
    var dt;

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '0');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '1');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '2');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '3');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '4');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '5');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '6');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], UTC_TIMEZONE);
    ok(dt.format('e') === '0');
  });

  test('[Locale] EN :: First day of week :: toString', function () {
    var dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'Europe/Moscow');
    ok(dt.toString() === 'Sat Apr 05 2014 15:20:35 GMT+0400 (MSK)');
  });

  test('[Locale] EN :: First day of week :: toString :: Offset greater than 10', function () {
    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toString() === 'Sat May 10 2014 15:20:35 GMT+1200 (+12)');
  });

  test('[Locale] EN :: First day of week :: toString :: Negative offset greater than 10', function () {
    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toString() === 'Sat May 10 2014 15:20:35 GMT-1000 (HST)');
  });

  test('[Locale] EN :: First day of week :: toString :: Fractional offset', function () {
    var dt = new DateTime([1980, 5, 10, 15, 20, 35, 41], 'Singapore');
    ok(dt.toString() === 'Sat May 10 1980 15:20:35 GMT+0730 (+0730)');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * isWeekend
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: DateTime :: isWeekend', function () {
    var dt;

    dt = new DateTime('2016-05-06T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === false);

    dt = new DateTime('2016-05-07T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === true);

    dt = new DateTime('2016-05-08T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === true);

    dt = new DateTime('2016-05-09T14:30:00', UTC_TIMEZONE);
    ok(dt.isWeekend() === false);
  });

  test('[Locale] EN :: Day :: isWeekend', function () {
    var day;

    day = new Day('2016-05-06', UTC_TIMEZONE);
    ok(day.isWeekend() === false);

    day = new Day('2016-05-07', UTC_TIMEZONE);
    ok(day.isWeekend() === true);

    day = new Day('2016-05-08', UTC_TIMEZONE);
    ok(day.isWeekend() === true);

    day = new Day('2016-05-09', UTC_TIMEZONE);
    ok(day.isWeekend() === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toLocaleString
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: toLocaleString', function () {
    var dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'Europe/Moscow');
    ok(dt.toLocaleString() === '4/5/2014, 3:20:35 PM');
  });

  test('[Locale] EN :: toLocaleString :: Offset greater than 10', function () {
    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toLocaleString() === '5/10/2014, 3:20:35 PM');
  });

  test('[Locale] EN :: toLocaleString :: Negative offset greater than 10', function () {
    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toLocaleString() === '5/10/2014, 3:20:35 PM');
  });

  test('[Locale] EN :: toLocaleString :: Fractional offset', function () {
    var dt = new DateTime([1980, 5, 10, 11, 20, 35, 41], 'Singapore');
    ok(dt.toLocaleString() === '5/10/1980, 11:20:35 AM');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toUTCString
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] EN :: toUTCString', function () {
    var dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'Europe/Moscow');
    ok(dt.toUTCString() === 'Sat, 05 Apr 2014 11:20:35 GMT');
  });

  test('[Locale] EN :: toUTCString :: Offset greater than 10', function () {
    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toUTCString() === 'Sat, 10 May 2014 03:20:35 GMT');
  });

  test('[Locale] EN :: toUTCString :: Negative offset greater than 10', function () {
    var dt = new DateTime([2014, 5, 9, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toUTCString() === 'Fri, 10 May 2014 01:20:35 GMT');
  });

  test('[Locale] EN :: toUTCString :: Fractional offset', function () {
    var dt = new DateTime([1980, 10, 5, 15, 20, 35, 41], 'Singapore');
    ok(dt.toUTCString() === 'Sun, 05 Oct 1980 07:50:35 GMT');
  });
})();
