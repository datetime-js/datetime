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

  test('[Locale] RU :: Month names :: Full', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'январь');

    dt = new DateTime([2014, 1, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 января');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 января');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е января');


    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'февраль');

    dt = new DateTime([2014, 2, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 февраля');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 февраля');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е февраля');


    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'март');

    dt = new DateTime([2014, 3, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 марта');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 марта');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е марта');


    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'апрель');

    dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 апреля');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 апреля');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е апреля');


    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'май');

    dt = new DateTime([2014, 5, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 мая');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 мая');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е мая');


    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'июнь');

    dt = new DateTime([2014, 6, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 июня');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 июня');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е июня');


    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'июль');

    dt = new DateTime([2014, 7, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 июля');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 июля');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е июля');


    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'август');

    dt = new DateTime([2014, 8, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 августа');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 августа');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е августа');


    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'сентябрь');

    dt = new DateTime([2014, 9, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 сентября');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 сентября');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е сентября');


    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'октябрь');

    dt = new DateTime([2014, 10, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 октября');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 октября');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е октября');


    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'ноябрь');

    dt = new DateTime([2014, 11, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 ноября');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 ноября');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е ноября');


    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMMM') === 'декабрь');

    dt = new DateTime([2014, 12, 5, 15, 20, 35, 41], 'UTC');
    ok(dt.format('D MMMM') === '5 декабря');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('DD MMMM') === '10 декабря');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do MMMM') === '10-е декабря');
  });

  test('[Locale] RU :: Month names :: Short', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 1, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'янв');

    dt = new DateTime([2014, 2, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'фев');

    dt = new DateTime([2014, 3, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'мар');

    dt = new DateTime([2014, 4, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'апр');

    dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'май');

    dt = new DateTime([2014, 6, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'июн');

    dt = new DateTime([2014, 7, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'июл');

    dt = new DateTime([2014, 8, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'авг');

    dt = new DateTime([2014, 9, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'сен');

    dt = new DateTime([2014, 10, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'окт');

    dt = new DateTime([2014, 11, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'ноя');

    dt = new DateTime([2014, 12, 10, 15, 20, 35, 41], 'UTC');
    ok(dt.format('MMM') === 'дек');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Weekday names
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: Weekday names :: Full', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'воскресенье');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'понедельник');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'вторник');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'среда');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'четверг');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'пятница');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'суббота');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dddd') === 'воскресенье');
  });

  test('[Locale] RU :: Weekday names :: Short', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'вск');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'пон');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'втн');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'срд');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'чет');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'пят');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'суб');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('ddd') === 'вск');
  });

  test('[Locale] RU :: Weekday names :: Shortest', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'вс');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'пн');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'вт');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'ср');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'чт');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'пт');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'сб');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('dd') === 'вс');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Ordinals
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: Ordinals', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 1, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '1-е');

    dt = new DateTime([2014, 5, 2, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '2-е');

    dt = new DateTime([2014, 5, 3, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '3-е');

    dt = new DateTime([2014, 5, 4, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '4-е');

    dt = new DateTime([2014, 5, 20, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '20-е');

    dt = new DateTime([2014, 5, 21, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '21-е');

    dt = new DateTime([2014, 5, 22, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '22-е');

    dt = new DateTime([2014, 5, 23, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '23-е');

    dt = new DateTime([2014, 5, 30, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '30-е');

    dt = new DateTime([2014, 5, 31, 15, 20, 35, 41], 'UTC');
    ok(dt.format('Do') === '31-е');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * ISO day of week
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: getISODayOfWeek :: UTC', function () {
    var dt;

    DateTime.setLocale('ru');

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

  test('[Locale] RU :: getISODayOfWeek :: Timezone', function () {
    var dt;

    DateTime.setLocale('ru');

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

  test('[Locale] RU :: setISODayOfWeek :: UTC', function () {
    var dt;

    DateTime.setLocale('ru');

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

  test('[Locale] RU :: setISODayOfWeek :: Timezone', function () {
    var dt;

    DateTime.setLocale('ru');

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

  test('[Locale] RU :: getWeekOfYear :: UTC :: Regular year', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 10, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 11, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 2);

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 19);

    dt = new DateTime([2016, 12, 25, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 51);

    dt = new DateTime([2016, 12, 26, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2016, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 1, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 2, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] RU :: getWeekOfYear :: UTC :: Year with leap week', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 27, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2015, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] RU :: getWeekOfYear :: UTC :: Before UNIX epoch', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([1950, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([1950, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] RU :: getWeekOfYear :: Timezone :: Regular year', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);
    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 10, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);

    dt = new DateTime([2016, 1, 11, 0, 0, 0, 9], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 2);

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 19);

    dt = new DateTime([2016, 12, 25, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 51);

    dt = new DateTime([2016, 12, 26, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2016, 12, 31, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 1, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2017, 1, 2, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] RU :: getWeekOfYear :: Timezone :: Year with leap week', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);
    DateTime.setLocale('ru');

    dt = new DateTime([2015, 12, 27, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 27, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([2015, 12, 28, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2015, 12, 31, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 53);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  test('[Locale] RU :: getWeekOfYear :: Timezone :: Before UNIX epoch', function () {
    var dt;

    DateTime.setDefaultTimezone(MOSCOW_TIMEZONE);
    DateTime.setLocale('ru');

    dt = new DateTime([1950, 1, 1, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 52);

    dt = new DateTime([1950, 1, 4, 0, 0, 0, 0], MOSCOW_TIMEZONE);
    ok(dt.getWeekOfYear() === 1);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * getWeekYear
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: getWeekYear :: UTC', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2015);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2017, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2017);

    dt = new DateTime([2018, 12, 30, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2018);

    dt = new DateTime([2018, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2019);
  });

  test('[Locale] RU :: getWeekYear :: Timezone', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2015);

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2016, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2016);

    dt = new DateTime([2017, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2017);

    dt = new DateTime([2018, 12, 30, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2018);

    dt = new DateTime([2018, 12, 31, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.getWeekYear() === 2019);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * First day of week
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: First day of week :: getDayOfWeek', function () {
    var day;
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.getDayOfWeek() === 6);

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.getDayOfWeek() === 0);

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.getDayOfWeek() === 5);

    day = new Day('1979-04-30T03:00:00+0100', UTC_TIMEZONE);
    ok(day.getDayOfWeek() === 0);

    day = new Day('1979-05-06T03:00:00+0100', UTC_TIMEZONE);
    ok(day.getDayOfWeek() === 6);
  });

  test('[Locale] RU :: First day of week :: setDayOfWeek', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');

    dt.setDayOfWeek(0);
    ok(equalDates(dt, new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC')) === true);
    ok(dt.getDayOfWeek() === 0);

    dt.setDayOfWeek(1);
    ok(equalDates(dt, new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC')) === true);
    ok(dt.getDayOfWeek() === 1);

    dt.setDayOfWeek(6);
    ok(equalDates(dt, new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC')) === true);
    ok(dt.getDayOfWeek() === 6);

    dt.setDayOfWeek(0);
    ok(equalDates(dt, new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC')) === true);
    ok(dt.getDayOfWeek() === 0);
  });

  test('[Locale] RU :: First day of week :: setStartOfWeek', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    dt.setStartOfWeek();

    ok(dt.getDayOfMonth() === 26);
    ok(dt.format('dddd') === 'понедельник');
  });

  test('[Locale] RU :: First day of week :: setEndOfWeek', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    dt.setEndOfWeek();

    ok(dt.getMonth() === 6);
    ok(dt.getDayOfMonth() === 1);
    ok(dt.format('dddd') === 'воскресенье');
  });

  test('[Locale] RU :: First day of week :: Format', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2014, 5, 25, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '6');

    dt = new DateTime([2014, 5, 26, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '0');

    dt = new DateTime([2014, 5, 27, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '1');

    dt = new DateTime([2014, 5, 28, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '2');

    dt = new DateTime([2014, 5, 29, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '3');

    dt = new DateTime([2014, 5, 30, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '4');

    dt = new DateTime([2014, 5, 31, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '5');

    dt = new DateTime([2014, 6, 1, 22, 20, 35, 41], 'UTC');
    ok(dt.format('e') === '6');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * isWeekend
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: DateTime :: isWeekend', function () {
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

  test('[Locale] RU :: Day :: isWeekend', function () {
    var day;

    day = new DateTime('2016-05-06', UTC_TIMEZONE);
    ok(day.isWeekend() === false);

    day = new DateTime('2016-05-07', UTC_TIMEZONE);
    ok(day.isWeekend() === true);

    day = new DateTime('2016-05-08', UTC_TIMEZONE);
    ok(day.isWeekend() === true);

    day = new DateTime('2016-05-09', UTC_TIMEZONE);
    ok(day.isWeekend() === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Format
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: Format :: Week of Year :: w', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('w') === '1');

    dt = new DateTime([2016, 1, 16, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('w') === '2');

    dt = new DateTime([2016, 1, 21, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('w') === '3');

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('w') === '19');

    dt = new DateTime([2016, 12, 12, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('w') === '50');

    dt = new DateTime([2016, 12, 19, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('w') === '51');

    dt = new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('w') === '52');
  });

  test('[Locale] RU :: Format :: Week of Year :: wo', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('wo') === '1-я');

    dt = new DateTime([2016, 1, 16, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('wo') === '2-я');

    dt = new DateTime([2016, 1, 21, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('wo') === '3-я');

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('wo') === '19-я');

    dt = new DateTime([2016, 12, 12, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('wo') === '50-я');

    dt = new DateTime([2016, 12, 19, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('wo') === '51-я');

    dt = new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('wo') === '52-я');
  });

  test('[Locale] RU :: Format :: Week of Year :: ww', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 10, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('ww') === '01');

    dt = new DateTime([2016, 1, 16, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('ww') === '02');

    dt = new DateTime([2016, 1, 21, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('ww') === '03');

    dt = new DateTime([2016, 5, 15, 0, 0, 0, 9], UTC_TIMEZONE);
    ok(dt.format('ww') === '19');

    dt = new DateTime([2016, 12, 12, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('ww') === '50');

    dt = new DateTime([2016, 12, 19, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('ww') === '51');

    dt = new DateTime([2017, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('ww') === '52');
  });

  test('[Locale] RU :: Format :: Week of Year :: gggg', function () {
    var dt;

    DateTime.setLocale('ru');

    dt = new DateTime([2016, 1, 3, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('gggg') === '2015');

    dt = new DateTime([2016, 1, 4, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.format('gggg') === '2016');

    dt = new DateTime([2018, 12, 30, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.format('gggg') === '2018');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toString
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: toString', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'Europe/Moscow');
    ok(dt.toString() === 'Sat Apr 05 2014 15:20:35 GMT+0400 (MSK)');
  });

  test('[Locale] RU :: toString :: Offset greater than 10', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toString() === 'Sat May 10 2014 15:20:35 GMT+1200 (+12)');
  });

  test('[Locale] RU :: toString :: Negative offset greater than 10', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toString() === 'Sat May 10 2014 15:20:35 GMT-1000 (HST)');
  });

  test('[Locale] RU :: toString :: Fractional offset', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([1980, 5, 10, 15, 20, 35, 41], 'Singapore');
    ok(dt.toString() === 'Sat May 10 1980 15:20:35 GMT+0730 (+0730)');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toLocaleString
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: toLocaleString', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'Europe/Moscow');
    ok(dt.toLocaleString() === '05.04.2014, 15:20:35');
  });

  test('[Locale] RU :: toLocaleString :: Offset greater than 10', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toLocaleString() === '10.05.2014, 15:20:35');
  });

  test('[Locale] RU :: toLocaleString :: Negative offset greater than 10', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toLocaleString() === '10.05.2014, 15:20:35');
  });

  test('[Locale] RU :: toLocaleString :: Fractional offset', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([1980, 5, 10, 15, 20, 35, 41], 'Singapore');
    ok(dt.toLocaleString() === '10.05.1980, 15:20:35');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * toUTCString
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: toUTCString', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 4, 5, 15, 20, 35, 41], 'Europe/Moscow');
    ok(dt.toUTCString() === 'Sat, 05 Apr 2014 11:20:35 GMT');
  });

  test('[Locale] RU :: toUTCString :: Offset greater than 10', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 5, 10, 15, 20, 35, 41], 'Pacific/Wallis');
    ok(dt.toUTCString() === 'Sat, 10 May 2014 03:20:35 GMT');
  });

  test('[Locale] RU :: toUTCString :: Negative offset greater than 10', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([2014, 5, 9, 15, 20, 35, 41], 'US/Hawaii');
    ok(dt.toUTCString() === 'Fri, 10 May 2014 01:20:35 GMT');
  });

  test('[Locale] RU :: toUTCString :: Fractional offset', function () {
    DateTime.setLocale('ru');

    var dt = new DateTime([1980, 10, 5, 15, 20, 35, 41], 'Singapore');
    ok(dt.toUTCString() === 'Sun, 05 Oct 1980 07:50:35 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Week
   * ----------------------------------------------------------------------------------------
   */

  test('[Locale] RU :: Week', function () {
    var week;

    DateTime.setDefaultTimezone(UTC_TIMEZONE);
    DateTime.setLocale('ru');

    week = new DateTime.Week('1970-01-11');

    ok(week.toStart().isEqual(new DateTime([1970, 1, 5, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])));

    week = week.toNext();

    ok(week.toStart().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 19, 0, 0, 0, 0])));

    week = week.toPrev();

    ok(week.toStart().isEqual(new DateTime([1970, 1, 5, 0, 0, 0, 0])));
    ok(week.toEnd().isEqual(new DateTime([1970, 1, 12, 0, 0, 0, 0])));
  });

  test('[Locale] RU :: Week', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);
    DateTime.setLocale('ru');

    var week = new DateTime.Week('2017-08-15');
    var days = week.toDays();

    ok(days[0].toStart().isEqual(new DateTime([2017, 8, 14, 0, 0, 0, 0])));
    ok(days[0].toEnd().isEqual(new DateTime([2017, 8, 15, 0, 0, 0, 0])));

    ok(days[1].toStart().isEqual(new DateTime([2017, 8, 15, 0, 0, 0, 0])));
    ok(days[1].toEnd().isEqual(new DateTime([2017, 8, 16, 0, 0, 0, 0])));

    ok(days[2].toStart().isEqual(new DateTime([2017, 8, 16, 0, 0, 0, 0])));
    ok(days[2].toEnd().isEqual(new DateTime([2017, 8, 17, 0, 0, 0, 0])));

    ok(days[3].toStart().isEqual(new DateTime([2017, 8, 17, 0, 0, 0, 0])));
    ok(days[3].toEnd().isEqual(new DateTime([2017, 8, 18, 0, 0, 0, 0])));

    ok(days[4].toStart().isEqual(new DateTime([2017, 8, 18, 0, 0, 0, 0])));
    ok(days[4].toEnd().isEqual(new DateTime([2017, 8, 19, 0, 0, 0, 0])));

    ok(days[5].toStart().isEqual(new DateTime([2017, 8, 19, 0, 0, 0, 0])));
    ok(days[5].toEnd().isEqual(new DateTime([2017, 8, 20, 0, 0, 0, 0])));

    ok(days[6].toStart().isEqual(new DateTime([2017, 8, 20, 0, 0, 0, 0])));
    ok(days[6].toEnd().isEqual(new DateTime([2017, 8, 21, 0, 0, 0, 0])));
  });

  test('[Locale] RU :: MonthWeeks', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);
    DateTime.setLocale('ru');

    var monthWeeks = new DateTime.MonthWeeks('1970-01-11');

    ok(monthWeeks.toStart().isEqual(new DateTime([1969, 12, 29, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 2, 2, 0, 0, 0, 0])));

    monthWeeks = monthWeeks.toNext();

    ok(monthWeeks.toStart().isEqual(new DateTime([1970, 1, 26, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 3, 2, 0, 0, 0, 0])));

    monthWeeks = monthWeeks.toPrev();

    ok(monthWeeks.toStart().isEqual(new DateTime([1969, 12, 29, 0, 0, 0, 0])));
    ok(monthWeeks.toEnd().isEqual(new DateTime([1970, 2, 2, 0, 0, 0, 0])));
  });

  test('[Locale] RU :: MonthWeeks :: toWeeks', function () {
    DateTime.setDefaultTimezone(UTC_TIMEZONE);
    DateTime.setLocale('ru');

    var monthWeeks = new DateTime.MonthWeeks('2017-01-01', UTC_TIMEZONE);
    var weeks = monthWeeks.toWeeks();

    ok(weeks.length === 6);

    ok(weeks[0].toStart().isEqual(new DateTime([2016, 12, 26, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[0].toEnd().isEqual(new DateTime([2017, 1, 2, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[1].toStart().isEqual(new DateTime([2017, 1, 2, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[1].toEnd().isEqual(new DateTime([2017, 1, 9, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[2].toStart().isEqual(new DateTime([2017, 1, 9, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[2].toEnd().isEqual(new DateTime([2017, 1, 16, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[3].toStart().isEqual(new DateTime([2017, 1, 16, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[3].toEnd().isEqual(new DateTime([2017, 1, 23, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[4].toStart().isEqual(new DateTime([2017, 1, 23, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[4].toEnd().isEqual(new DateTime([2017, 1, 30, 0, 0, 0, 0], UTC_TIMEZONE)));

    ok(weeks[5].toStart().isEqual(new DateTime([2017, 1, 30, 0, 0, 0, 0], UTC_TIMEZONE)));
    ok(weeks[5].toEnd().isEqual(new DateTime([2017, 2, 6, 0, 0, 0, 0], UTC_TIMEZONE)));
  });
})();
