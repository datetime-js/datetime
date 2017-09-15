(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();

  var TEST_TIMEZONE = 'TEST_TIMEZONE';
  var UTC_TIMEZONE = 'UTC';

  function getDateAttributes (date) {
    return [
      date.getYear(),
      date.getMonth(),
      date.getDayOfMonth(),
      date.getHour(),
      date.getMinute(),
      date.getSecond(),
      date.getMillisecond()
    ];
  }

  function getUTCDateAttributes (date) {
    return [
      date.getUTCYear(),
      date.getUTCMonth(),
      date.getUTCDayOfMonth(),
      date.getUTCHour(),
      date.getUTCMinute(),
      date.getUTCSecond(),
      date.getUTCMillisecond()
    ];
  }

  function isInvalid (date) {
    return !date.isValid();
  }

  /**
   * ----------------------------------------------------------------------------------------
   * Date
   * ----------------------------------------------------------------------------------------
   */

  test('[Parse] Date as string :: Date :: YYYYYY-MM-DD', function () {
    var dt = new DateTime('102015-10-05', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [102015, 10, 5, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Date :: -YYYYYY-MM-DD', function () {
    var dt = new DateTime('-003001-10-05', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [-3001, 10, 5, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Date :: +YYYYYY-MM-DD', function () {
    var dt = new DateTime('142015-10-05', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [142015, 10, 5, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Date :: YYYY-MM-DD', function () {
    var dt = new DateTime('2015-10-05', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('2015-4-5', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 4, 5, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Date :: YYYYMMDD', function () {
    var dt = new DateTime('20151005', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 5, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Date :: YYYY-MM', function () {
    var dt = new DateTime('2015-10', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 10, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Date :: YYYY', function () {
    var dt = new DateTime('2015', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Time
   * ----------------------------------------------------------------------------------------
   */

  test('[Parse] Date as string :: Time :: YYYY-MM-DD', function () {
    var dt = new DateTime('2015-05-10', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: YYYY-MM-DDT', function () {
    var dt = new DateTime('2015-05-10', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 0, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHH', function () {
    var dt = new DateTime('2015-05-10T14', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHH:mm', function () {
    var dt = new DateTime('2015-05-10T14:45', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHHmm', function () {
    var dt = new DateTime('2015-05-10T1445', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHH:mm:ss', function () {
    var dt = new DateTime('2015-05-10T14:45:30', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHHmmss', function () {
    var dt = new DateTime('2015-05-10T144530', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHH:mm:ss.SSS', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHHmmss.SSS', function () {
    var dt = new DateTime('2015-05-10T144530.555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHH:mm:ss,SSS', function () {
    var dt = new DateTime('2015-05-10T14:45:30,555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDTHHmmss,SSS', function () {
    var dt = new DateTime('2015-05-10T144530,555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: T as separator :: YYYY-MM-DDT24:mm:ss.SSS', function () {
    var dt = new DateTime('2015-05-10T24:15:33.127', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 11, 0, 15, 33, 127]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HH', function () {
    var dt = new DateTime('2015-05-10 14', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HH:mm', function () {
    var dt = new DateTime('2015-05-10 14:45', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HHmm', function () {
    var dt = new DateTime('2015-05-10 1445', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HH:mm:ss', function () {
    var dt = new DateTime('2015-05-10 14:45:30', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HHmmss', function () {
    var dt = new DateTime('2015-05-10 144530', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HH:mm:ss.SSS', function () {
    var dt = new DateTime('2015-05-10 14:45:30.555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HHmmss.SSS', function () {
    var dt = new DateTime('2015-05-10 144530.555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HH:mm:ss,SSS', function () {
    var dt = new DateTime('2015-05-10 14:45:30,555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD HHmmss,SSS', function () {
    var dt = new DateTime('2015-05-10 144530,555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Time :: Space as separator :: YYYY-MM-DD 24:mm:ss.SSS', function () {
    var dt = new DateTime('2015-05-10 24:15:33.127', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 11, 0, 15, 33, 127]));
    ok(dt.isValid() === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Offset
   * ----------------------------------------------------------------------------------------
   */

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss.SSS+HHmm', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555+0300', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 11, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss.SSS-HHmm', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555-0300', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 17, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH-HHmm', function () {
    var dt = new DateTime('2015-05-10T14-0300', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 17, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss.SSS+HH:mm', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555+03:00', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 11, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss+HH', function () {
    var dt = new DateTime('2015-05-10T14:45:30+03', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 11, 45, 30, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss.SSS-HH:mm', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555-03:00', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 17, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss-HH', function () {
    var dt = new DateTime('2015-05-10T14:45:30-03', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 17, 45, 30, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss.SSSZ', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555Z', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHHZ', function () {
    var dt = new DateTime('2015-05-10T14Z', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 0, 0, 0]));
    ok(dt.isValid() === true);
  });

  test('[Parse] Date as string :: Offset :: YYYY-MM-DDTHH:mm:ss.SSS', function () {
    var dt = new DateTime('2015-05-10T14:45:30.555', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2015, 5, 10, 14, 45, 30, 555]));
    ok(dt.isValid() === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Invalid
   * ----------------------------------------------------------------------------------------
   */

  test('[Parse] Date as string :: Invalid :: Wrong date', function () {
    var dt;

    dt = new DateTime('', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);

    dt = new DateTime('abc', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);

    dt = new DateTime('a1111', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  test('[Parse] Date as string :: Invalid :: Wrong time', function () {
    var dt;

    dt = new DateTime('2015-10-05Taaa', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);

    dt = new DateTime('2015-10-05T555', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  test('[Parse] Date as string :: Invalid :: Wrong offset', function () {
    var dt;

    dt = new DateTime('2015-10-05T10:05:30+44444', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);

    dt = new DateTime('2015-10-05T10:05:30+Z', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);

    dt = new DateTime('2015-10-05T10:05:30z', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);

    dt = new DateTime('2015-10-05T10:05:30ZZ', UTC_TIMEZONE);
    ok(dt.isInvalid() === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Format
   * ----------------------------------------------------------------------------------------
   */

  test('[Parse] Format as parameter :: No timezone', function () {
    DateTime.setDefaultTimezone('Europe/Moscow');

    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        0
      ],
      until: [
        172800000, // 2 days
        null
      ]
    });

    var dt = new DateTime('1970-01-01T20:30:49', 'YYYY-MM-DDTHH:mm:ss', TEST_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [1970, 1, 1, 20, 30, 49, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1970, 1, 1, 14, 30, 49, 0]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: Year :: YYYY', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2016', 'YYYY', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 1, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('964', 'YYYY', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [964, 1, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('3', 'YYYY', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [3, 1, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('2016-05', 'YYYY', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('-1005', 'YYYY', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Year :: YY', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('86', 'YY', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [1986, 1, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('0', 'YY', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [1900, 1, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('2016', 'YY', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('-90', 'YY', UTC_TIMEZONE);
    ok(dt.isInvalid(dt) === true);

    dt = new DateTime('14-10', 'YY', UTC_TIMEZONE);
    ok(dt.isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Year :: Y', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('1986', 'Y', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [1986, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('201986', 'Y', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [201986, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('86', 'Y', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [86, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('1', 'Y', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [1, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('-100', 'Y', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [-100, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('+100', 'Y', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [100, 1, 1, 0, 0, 0, 0]));
    ok(dt.isValid() === true);

    dt = new DateTime('1986-05', 'Y', UTC_TIMEZONE);
    ok(dt.isValid() === false);
  });

  test('[Parse] Format as parameter :: Month :: MM', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('05', 'MM', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11', 'MM', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 11, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('2014-11', 'MM', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('3', 'MM', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Month :: M', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('05', 'M', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11', 'M', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 11, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('3', 'M', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 3, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('2014-11', 'M', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Quarter :: Q', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('1', 'Q', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 1, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('2', 'Q', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 4, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('3', 'Q', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 7, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('4', 'Q', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 10, 1, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('01', 'Q', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('0', 'Q', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('5', 'Q', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Day of month :: DD', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('14', 'DD', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 14, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('02', 'DD', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 2, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('1986-03-14', 'DD', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('3', 'DD', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Day of month :: D', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('14', 'D', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 14, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('02', 'D', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 2, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('1986-03-14', 'D', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('3', 'D', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 3, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: Time', function () {
    DateTime.setDefaultTimezone('Europe/Moscow');

    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -720, // +1200
        0
      ],
      until: [
        345600000, // 4 days
        null
      ]
    });

    mockNow(50400000); // Thu Jan 01 1970 14:00:00 GMT+0000 (UTC)

    var dt = new DateTime('20:30:49', 'HH:mm:ss', TEST_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [1970, 1, 2, 20, 30, 49, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1970, 1, 2, 8, 30, 49, 0]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: Minutes and seconds', function () {
    DateTime.setDefaultTimezone('Europe/Moscow');

    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -360, // +0600
        0
      ],
      until: [
        345600000, // 4 days
        null
      ]
    });

    mockNow(50400000); // Thu Jan 01 1970 14:00:00 GMT+0000 (UTC)

    var dt = new DateTime('30:49', 'mm:ss', TEST_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [1970, 1, 1, 20, 30, 49, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [1970, 1, 1, 14, 30, 49, 0]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: Hour :: HH', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('15', 'HH', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 15, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('19', 'HH', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 19, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04', 'HH', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 4, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'HH', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55', 'HH', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('5', 'HH', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: H', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('15', 'H', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 15, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('19', 'H', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 19, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04', 'H', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 4, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'H', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('5', 'H', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 5, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('4:55', 'H', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hh', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12', 'hh', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 12, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11', 'hh', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('05', 'hh', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 5, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'hh', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13', 'hh', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('5', 'hh', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13', 'hh', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: h', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('11', 'h', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('05', 'h', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 5, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('3', 'h', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 3, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('0', 'h', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('0:00', 'h', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13', 'h', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hha :: am', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12am', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11am', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('08am', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 8, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00am', 'hha', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13am', 'hha', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hha :: pm', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12pm', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 12, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('01pm', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 13, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04pm', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 16, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('10pm', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 22, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11pm', 'hha', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 23, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00pm', 'hha', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13pm', 'hha', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hhA :: am', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12am', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11am', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('08am', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 8, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00am', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13am', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hhA :: a', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12a', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11a', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('08a', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 8, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00a', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13a', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hhA :: pm', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12pm', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 12, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('01pm', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 13, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04pm', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 16, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('10pm', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 22, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11pm', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 23, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00pm', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13pm', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Hour :: hhA :: p', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('12p', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 12, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('01p', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 13, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04p', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 16, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('10p', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 22, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('11p', 'hhA', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 23, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00p', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('13p', 'hhA', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Minute :: mm', function () {
    var dt;

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('34', 'mm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 34, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('19', 'mm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 19, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04', 'mm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 4, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'mm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55', 'mm', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('5', 'mm', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Minute :: m', function () {
    var dt;

    DateTime.setDefaultTimezone(UTC_TIMEZONE);

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('34', 'm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 34, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('19', 'm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 19, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04', 'm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 4, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 0, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('5', 'm', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 5, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55', 'm', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Second :: ss', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('34', 'ss', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 34, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('19', 'ss', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 19, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04', 'ss', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 4, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'ss', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55:10', 'ss', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('5', 'ss', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Second :: s', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('34', 's', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 34, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('19', 's', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 19, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04', 's', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 4, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 's', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 0, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('5', 's', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 5, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55:13', 's', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Millisecond :: SSS', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('344', 'SSS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 344]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('191', 'SSS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 191]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('069', 'SSS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 69]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('009', 'SSS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 9]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('000', 'SSS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55:10.555', 'SSS', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('00', 'SSS', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('54', 'SSS', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('6', 'SSS', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Millisecond :: SS', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('344', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 344]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('191', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 191]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('069', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 69]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('009', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 9]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('000', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('54', 'SS', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 54]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55:10.555', 'SS', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('6', 'SS', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Millisecond :: S', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('344', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 344]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('191', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 191]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('069', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 69]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('009', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 9]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('000', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('00', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 0]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('54', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 54]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('6', 'S', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 6]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('04:55:10.555', 'S', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Offset :: ZZ', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('+08:00', 'ZZ', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 3, 24, 46, 555]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 3, 24, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('+0535', 'ZZ', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 5, 49, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('-08:00', 'ZZ', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 19, 24, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('-0201', 'ZZ', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 13, 25, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('Z', 'ZZ', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('05:00', 'ZZ', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('+5:00', 'ZZ', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('+05:5', 'ZZ', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: Offset :: Z', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('+08:00', 'Z', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 3, 24, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('+0535', 'Z', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 5, 49, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('-08:00', 'Z', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 19, 24, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('-0201', 'Z', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 13, 25, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('Z', 'Z', UTC_TIMEZONE);
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 555]));
    ok(isInvalid(dt) === false);

    dt = new DateTime('05:00', 'Z', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('+5:00', 'Z', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);

    dt = new DateTime('+05:5', 'Z', UTC_TIMEZONE);
    ok(isInvalid(dt) === true);
  });

  test('[Parse] Format as parameter :: All :: YYYY-MM-DDTHH:mm:ss.SSSZ', function () {
    var dt = new DateTime('2016-03-12T15:33:45.567+04:00', 'YYYY-MM-DDTHH:mm:ss.SSSZ', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2016, 3, 12, 11, 33, 45, 567]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: All :: YYYY-MM-DDThA:mm:ss.SSSZ', function () {
    var dt = new DateTime('2016-03-12T5pm:33:45.567+04:00', 'YYYY-MM-DDThA:mm:ss.SSSZ', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2016, 3, 12, 13, 33, 45, 567]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: All :: MM/DD/YYYY', function () {
    var dt = new DateTime('08/22/2010', 'MM/DD/YYYY', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2010, 8, 22, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: All :: YYYY/DD/MM', function () {
    var dt = new DateTime('2010/22/08', 'YYYY/DD/MM', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2010, 8, 22, 0, 0, 0, 0]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: All :: HH:mm:ss', function () {
    var dt = new DateTime('14:43:02', 'HH:mm:ss', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 14, 43, 2, 0]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: All :: HH:mm:ss.SSS', function () {
    var dt = new DateTime('14:43:02.043', 'HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 14, 43, 2, 43]));
    ok(isInvalid(dt) === false);
  });

  test('[Parse] Format as parameter :: No year', function () {
    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    // Use current year
    var dt = new DateTime('02/15 14:35:55.333', 'MM/DD HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 2, 15, 14, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 2, 15, 14, 35, 55, 333]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: No month', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2014', 'YYYY', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 1, 1, 0, 0, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 1, 1, 0, 0, 0, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('2014/15 14:35:55.333', 'YYYY/DD HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 1, 15, 14, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 1, 15, 14, 35, 55, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('15 14:35:55.333', 'DD HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 15, 14, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 15, 14, 35, 55, 333]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: No day of month', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2014-11', 'YYYY-MM', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 11, 1, 0, 0, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 11, 1, 0, 0, 0, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('2014/03 14:35:55.333', 'YYYY/MM HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 3, 1, 14, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 3, 1, 14, 35, 55, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('03 14:35:55.333', 'MM HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 3, 1, 14, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 3, 1, 14, 35, 55, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('14:35:55.333', 'HH:mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 14, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 14, 35, 55, 333]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: No hour', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2014-11-22', 'YYYY-MM-DD', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 11, 22, 0, 0, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 11, 22, 0, 0, 0, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('22 35:55.333', 'DD mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 22, 0, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 22, 0, 35, 55, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('35:55.333', 'mm:ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 11, 35, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 35, 55, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('+02:00', 'Z', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 9, 24, 46, 555]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 9, 24, 46, 555]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: No minute', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2014-11-22 15', 'YYYY-MM-DD HH', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 11, 22, 15, 0, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 11, 22, 15, 0, 0, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('22 55.333', 'DD ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 22, 0, 0, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 22, 0, 0, 55, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('55.333', 'ss.SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 11, 24, 55, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 55, 333]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: No second', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2014-11-22 29', 'YYYY-MM-DD mm', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 11, 22, 0, 29, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 11, 22, 0, 29, 0, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('22 333', 'DD SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 22, 0, 0, 0, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 22, 0, 0, 0, 333]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('333', 'SSS', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 333]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 333]));
    ok(dt.isInvalid() === false);
  });

  test('[Parse] Format as parameter :: No millisecond', function () {
    var dt;

    mockNow(1462706686555); // 2016, 5, 8, 11, 24, 46, 555

    dt = new DateTime('2014-11-22 32', 'YYYY-MM-DD ss', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2014, 11, 22, 0, 0, 32, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2014, 11, 22, 0, 0, 32, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('22 +00:00', 'DD ZZ', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 22, 0, 0, 0, 0]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 22, 0, 0, 0, 0]));
    ok(dt.isInvalid() === false);

    dt = new DateTime('+00:00', 'ZZ', UTC_TIMEZONE);

    ok(equalArrays(getDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 555]));
    ok(equalArrays(getUTCDateAttributes(dt), [2016, 5, 8, 11, 24, 46, 555]));
    ok(dt.isInvalid() === false);
  });
})();
