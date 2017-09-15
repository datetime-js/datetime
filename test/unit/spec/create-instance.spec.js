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

  /**
   * ------------------------------------------------------------------------------------
   * Create instance :: No arguments
   * ------------------------------------------------------------------------------------
   */

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Regular year', function () {
    mockNow(1415733423121); // 2014-11-11T19:17:03.121Z

    dt = new DateTime();

    ok(dt.valueOf() === 1415733423121);
    ok(dt.getUTCYear() === 2014);
    ok(dt.getUTCMonth() === 11);
    ok(dt.getUTCDayOfMonth() === 11);
    ok(dt.getUTCHour() === 19);
    ok(dt.getUTCMinute() === 17);
    ok(dt.getUTCSecond() === 3);
    ok(dt.getUTCMillisecond() === 121);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Leap year', function () {
    mockNow(1352661423121); // 2012-11-11T19:17:03.121Z

    dt = new DateTime();

    ok(dt.valueOf() === 1352661423121);
    ok(dt.getUTCYear() === 2012);
    ok(dt.getUTCMonth() === 11);

    ok(dt.getUTCDayOfMonth() === 11);
    ok(dt.getUTCHour() === 19);
    ok(dt.getUTCMinute() === 17);
    ok(dt.getUTCSecond() === 3);
    ok(dt.getUTCMillisecond() === 121);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of Unix epoch', function () {
    mockNow(0); // 1970-01-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 0);
    ok(dt.getUTCYear() === 1970);
    ok(dt.getUTCMonth() === 1);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of year', function () {
    mockNow(946684800000); // 2000-01-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 946684800000);

    ok(dt.getUTCYear() === 2000);
    ok(dt.getUTCMonth() === 1);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of leap year', function () {
    mockNow(1325376000000); // 2012-01-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 1325376000000);

    ok(dt.getUTCYear() === 2012);
    ok(dt.getUTCMonth() === 1);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of year', function () {
    mockNow(1767225599999); // 2025-12-31T23:59:59.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 1767225599999);

    ok(dt.getUTCYear() === 2025);
    ok(dt.getUTCMonth() === 12);
    ok(dt.getUTCDayOfMonth() === 31);
    ok(dt.getUTCHour() === 23);
    ok(dt.getUTCMinute() === 59);
    ok(dt.getUTCSecond() === 59);
    ok(dt.getUTCMillisecond() === 999);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of leap year', function () {
    mockNow(852076799999); // 1996-12-31T23:59:59.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 852076799999);

    ok(dt.getUTCYear() === 1996);
    ok(dt.getUTCMonth() === 12);
    ok(dt.getUTCDayOfMonth() === 31);
    ok(dt.getUTCHour() === 23);
    ok(dt.getUTCMinute() === 59);
    ok(dt.getUTCSecond() === 59);
    ok(dt.getUTCMillisecond() === 999);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of month', function () {
    mockNow(1414800000000); // 2014-11-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 1414800000000);
    ok(dt.getUTCYear() === 2014);
    ok(dt.getUTCMonth() === 11);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of March', function () {
    mockNow(352252800000); // 1981-03-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 352252800000);

    ok(dt.getUTCYear() === 1981);
    ok(dt.getUTCMonth() === 3);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of March in leap year', function () {
    mockNow(573177600000); // 1988-03-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 573177600000);

    ok(dt.getUTCYear() === 1988);
    ok(dt.getUTCMonth() === 3);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of month in leap year', function () {
    mockNow(1351728000000); // 2012-11-01T00:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 1351728000000);
    ok(dt.getUTCYear() === 2012);
    ok(dt.getUTCMonth() === 11);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of month', function () {
    mockNow(1367366399999); // 2013-04-30T23:59:59.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 1367366399999);

    ok(dt.getUTCYear() === 2013);
    ok(dt.getUTCMonth() === 4);
    ok(dt.getUTCDayOfMonth() === 30);
    ok(dt.getUTCHour() === 23);
    ok(dt.getUTCMinute() === 59);
    ok(dt.getUTCSecond() === 59);
    ok(dt.getUTCMillisecond() === 999);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of month', function () {
    mockNow(344476799999); // 1980-11-30T23:59:59.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 344476799999);

    ok(dt.getUTCYear() === 1980);
    ok(dt.getUTCMonth() === 11);
    ok(dt.getUTCDayOfMonth() === 30);
    ok(dt.getUTCHour() === 23);
    ok(dt.getUTCMinute() === 59);
    ok(dt.getUTCSecond() === 59);
    ok(dt.getUTCMillisecond() === 999);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of hour', function () {
    mockNow(719726400000); // 1992-10-22T04:00:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 719726400000);

    ok(dt.getUTCYear() === 1992);
    ok(dt.getUTCMonth() === 10);
    ok(dt.getUTCDayOfMonth() === 22);
    ok(dt.getUTCHour() === 4);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of hour', function () {
    mockNow(511189199999); // 1986-03-14T12:59:59.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 511189199999);

    ok(dt.getUTCYear() === 1986);
    ok(dt.getUTCMonth() === 3);
    ok(dt.getUTCDayOfMonth() === 14);
    ok(dt.getUTCHour() === 12);
    ok(dt.getUTCMinute() === 59);
    ok(dt.getUTCSecond() === 59);
    ok(dt.getUTCMillisecond() === 999);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of minute', function () {
    mockNow(5065860000); // 1970-02-28T15:11:00.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 5065860000);

    ok(dt.getUTCYear() === 1970);
    ok(dt.getUTCMonth() === 2);
    ok(dt.getUTCDayOfMonth() === 28);
    ok(dt.getUTCHour() === 15);
    ok(dt.getUTCMinute() === 11);
    ok(dt.getUTCSecond() === 0);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of minute', function () {
    mockNow(1420673579999); // 2015-01-07T23:32:59.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 1420673579999);

    ok(dt.getUTCYear() === 2015);
    ok(dt.getUTCMonth() === 1);
    ok(dt.getUTCDayOfMonth() === 7);
    ok(dt.getUTCHour() === 23);
    ok(dt.getUTCMinute() === 32);
    ok(dt.getUTCSecond() === 59);
    ok(dt.getUTCMillisecond() === 999);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: Start of second', function () {
    mockNow(189302444000); // 1976-01-01T00:00:44.000Z

    dt = new DateTime();

    ok(dt.valueOf() === 189302444000);

    ok(dt.getUTCYear() === 1976);
    ok(dt.getUTCMonth() === 1);
    ok(dt.getUTCDayOfMonth() === 1);
    ok(dt.getUTCHour() === 0);
    ok(dt.getUTCMinute() === 0);
    ok(dt.getUTCSecond() === 44);
    ok(dt.getUTCMillisecond() === 0);
  });

  test('[Create instance] No arguments :: UTC :: Unix epoch :: End of second', function () {
    mockNow(1204329598999); // 2008-02-29T23:59:58.999Z

    dt = new DateTime();

    ok(dt.valueOf() === 1204329598999);

    ok(dt.getUTCYear() === 2008);
    ok(dt.getUTCMonth() === 2);
    ok(dt.getUTCDayOfMonth() === 29);
    ok(dt.getUTCHour() === 23);
    ok(dt.getUTCMinute() === 59);
    ok(dt.getUTCSecond() === 58);
    ok(dt.getUTCMillisecond() === 999);
  });

  /**
   * ------------------------------------------------------------------------------------
   * Create instance :: Timestamp
   * ------------------------------------------------------------------------------------
   */

  test('[Create instance] Timestamp :: UTC :: Before UNIX epoch', function () {
    dt = new DateTime(-1415733423121);
    ok(dt.valueOf() === -1415733423121);
  });

  test('[Create instance] Timestamp :: UTC :: UNIX epoch', function () {
    dt = new DateTime(1415733423121);
    ok(dt.valueOf() === 1415733423121);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create instance :: Date attributes
   * ----------------------------------------------------------------------------------------
   */

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Regular date', function () {
    dt = new DateTime([1965, 11, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(dt.valueOf() === -130211547455);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Leap year', function () {
    dt = new DateTime([1944, 5, 12, 13, 25, 59, 344], UTC_TIMEZONE);
    ok(dt.valueOf() === -809087640656);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Last timestamp before Unix epoch', function () {
    dt = new DateTime([1969, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.valueOf() === -1);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of year', function () {
    dt = new DateTime([1961, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.valueOf() === -283996800000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of leap year', function () {
    dt = new DateTime([1904, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.valueOf() === -2082844800000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of year', function () {
    dt = new DateTime([1959, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.valueOf() === -315619200001);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of leap year', function () {
    dt = new DateTime([1872, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.valueOf() === -3060979200001);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of month', function () {
    dt = new DateTime([1939, 5, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.valueOf() === -967939200000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of March', function () {
    dt = new DateTime([1899, 3, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.valueOf() === -2235427200000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of March in a leap year', function () {
    dt = new DateTime([1908, 3, 1, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(dt.valueOf() === -1951430400000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of month', function () {
    dt = new DateTime([1925, 8, 31, 23, 59, 59, 999], UTC_TIMEZONE);
    ok(dt.valueOf() === -1399075200001);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of month in a leap year', function () {
    dt = new DateTime([1936, 10, 31, 23, 59, 59, 999], UTC_TIMEZONE); // 2109110399999
    ok(dt.valueOf() === -1046649600001);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of hour', function () {
    dt = new DateTime([1914, 6, 22, 15, 0, 0, 0], UTC_TIMEZONE); // 1403449200000
    ok(dt.valueOf() === -1752310800000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of hour', function () {
    dt = new DateTime([1915, 1, 7, 0, 59, 59, 999], UTC_TIMEZONE); // 1420592399999
    ok(dt.valueOf() === -1735167600001);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: Start of minute', function () {
    dt = new DateTime([1672, 1, 1, 13, 13, 0, 0], UTC_TIMEZONE); // 63119580000
    ok(dt.valueOf() === -9403901220000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of minute', function () {
    dt = new DateTime([1899, 2, 28, 17, 32, 59, 999], UTC_TIMEZONE); // 920223179999
    ok(dt.valueOf() === -2235450420001);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of second', function () {
    dt = new DateTime([1914, 11, 15, 17, 35, 31, 0], UTC_TIMEZONE); // 1416072931000
    ok(dt.valueOf() === -1739687069000);
  });

  test('[Create instance] Attributes :: UTC :: Before Unix epoch :: End of second', function () {
    dt = new DateTime([1914, 11, 15, 17, 35, 31, 999], UTC_TIMEZONE); // 1416072931999
    ok(dt.valueOf() === -1739687068001);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Regular date', function () {
    dt = new DateTime([2014, 11, 15, 22, 7, 32, 545], UTC_TIMEZONE); // 1416089252545
    ok(dt.valueOf() === 1416089252545);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Leap year', function () {
    dt = new DateTime([2004, 5, 12, 13, 25, 59, 344], UTC_TIMEZONE); // 1084368359344
    ok(dt.valueOf() === 1084368359344);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of UNIX epoch', function () {
    dt = new DateTime([1970, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE); // 0
    ok(dt.valueOf() === 0);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of year', function () {
    dt = new DateTime([1981, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE); // 347155200000
    ok(dt.valueOf() === 347155200000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of leap year', function () {
    dt = new DateTime([1980, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE); // 315532800000
    ok(dt.valueOf() === 315532800000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of year', function () {
    dt = new DateTime([2000, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE); // 978307199999
    ok(dt.valueOf() === 978307199999);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of leap year', function () {
    dt = new DateTime([1972, 12, 31, 23, 59, 59, 999], UTC_TIMEZONE); // 94694399999
    ok(dt.valueOf() === 94694399999);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of month', function () {
    dt = new DateTime([1989, 5, 1, 0, 0, 0, 0], UTC_TIMEZONE); // 609984000000
    ok(dt.valueOf() === 609984000000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of March', function () {
    dt = new DateTime([1999, 3, 1, 0, 0, 0, 0], UTC_TIMEZONE); // 920246400000
    ok(dt.valueOf() === 920246400000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of March in a leap year', function () {
    dt = new DateTime([2008, 3, 1, 0, 0, 0, 0], UTC_TIMEZONE); // 1204329600000
    ok(dt.valueOf() === 1204329600000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of month', function () {
    dt = new DateTime([2025, 8, 31, 23, 59, 59, 999], UTC_TIMEZONE); // 1756684799999
    ok(dt.valueOf() === 1756684799999);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of month in a leap year', function () {
    dt = new DateTime([2036, 10, 31, 23, 59, 59, 999], UTC_TIMEZONE); // 2109110399999
    ok(dt.valueOf() === 2109110399999);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of hour', function () {
    dt = new DateTime([2014, 6, 22, 15, 0, 0, 0], UTC_TIMEZONE); // 1403449200000
    ok(dt.valueOf() === 1403449200000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of hour', function () {
    dt = new DateTime([2015, 1, 7, 0, 59, 59, 999], UTC_TIMEZONE); // 1420592399999
    ok(dt.valueOf() === 1420592399999);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: Start of minute', function () {
    dt = new DateTime([1972, 1, 1, 13, 13, 0, 0], UTC_TIMEZONE); // 63119580000
    ok(dt.valueOf() === 63119580000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of minute', function () {
    dt = new DateTime([1999, 2, 28, 17, 32, 59, 999], UTC_TIMEZONE); // 920223179999
    ok(dt.valueOf() === 920223179999);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of second', function () {
    dt = new DateTime([2014, 11, 15, 17, 35, 31, 0], UTC_TIMEZONE); // 1416072931000
    ok(dt.valueOf() === 1416072931000);
  });

  test('[Create instance] Attributes :: UTC :: Unix epoch :: End of second', function () {
    dt = new DateTime([2014, 11, 15, 17, 35, 31, 999], UTC_TIMEZONE); // 1416072931999
    ok(dt.valueOf() === 1416072931999);
  });

  test('[Create instance] Attributes :: UTC :: Default attributes', function () {
    ok((new DateTime([2014, 11, 15, 12, 25, 48], UTC_TIMEZONE)).valueOf() ===
      (new DateTime([2014, 11, 15, 12, 25, 48, 0], UTC_TIMEZONE)).valueOf());

    ok((new DateTime([2014, 11, 15, 12, 25], UTC_TIMEZONE)).valueOf() ===
      (new DateTime([2014, 11, 15, 12, 25, 0, 0], UTC_TIMEZONE)).valueOf());

    ok((new DateTime([2014, 11, 15, 12], UTC_TIMEZONE)).valueOf() ===
      (new DateTime([2014, 11, 15, 12, 0, 0, 0], UTC_TIMEZONE)).valueOf());

    ok((new DateTime([2014, 11, 15], UTC_TIMEZONE)).valueOf() ===
      (new DateTime([2014, 11, 15, 0, 0, 0, 0], UTC_TIMEZONE)).valueOf());

    ok((new DateTime([2014, 11], UTC_TIMEZONE)).valueOf() ===
      (new DateTime([2014, 11, 1, 0, 0, 0, 0], UTC_TIMEZONE)).valueOf());

    ok((new DateTime([2014], UTC_TIMEZONE)).valueOf() ===
      (new DateTime([2014, 1, 1, 0, 0, 0, 0], UTC_TIMEZONE)).valueOf());
  });

  test('[Create instance] Attributes :: Timezone :: Positive offset :: Offset moves forward', function () {
    setTestTimezone({
      abbr: [
        'TST_03',
        'TST_04',
        'TST_03'
      ],
      dst: [
        false,
        true
      ],
      offset: [
        -180, // +0300
        -240, // +0400
        -180  // +0300
      ],
      until: [
        82800000, // 1970-01-02T02:00:00
        165600000, // 1970-01-03T02:00:00
        null
      ]
    });


    // 0. Safe date far before the offset moving
    dt = new DateTime([1970, 1, 1, 20, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 20:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 61200000);

    dt = new DateTime('1970-01-01T20:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 20:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 61200000);

    dt = new DateTime('1970-01-01T20:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 19:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 57600000);

    dt = new DateTime('1970-01-02T00:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 19:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 57600000);

    dt = new DateTime('1970-01-01T14:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 20:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 61200000);

    dt = new DateTime('1970-01-01T17:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 20:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 61200000);

    dt = new DateTime('1970-01-01T17:00:00Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 20:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 61200000);


    // 1. Safe date before the offset moving
    dt = new DateTime([1970, 1, 2, 1, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);

    dt = new DateTime('1970-01-02T01:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);

    dt = new DateTime('1970-01-02T06:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);

    dt = new DateTime('1970-01-01T19:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);

    dt = new DateTime('1970-01-01T19:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 68400000);

    dt = new DateTime('1970-01-01T19:00:00Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 68400000);


    // 2. Edge safe date just before the offset moving
    dt = new DateTime([1970, 1, 2, 1, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-02T01:59:59.999+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-02T02:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-02T06:59:59.999+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-01T19:59:59.999-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-01T22:59:59.999+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-01T22:59:59.999Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);


    // 3. Edge unsafe date during the offset moving
    dt = new DateTime([1970, 1, 2, 2, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-02T02:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);

    dt = new DateTime('1970-01-01T22:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);

    dt = new DateTime('1970-01-01T22:00:00Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 79200000);


    // 4. Unsafe date during the offset moving
    dt = new DateTime([1970, 1, 2, 2, 30, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:30:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 84600000);

    dt = new DateTime('1970-01-02T02:30:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:30:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 81000000);

    dt = new DateTime('1970-01-01T22:30:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:30:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 81000000);

    dt = new DateTime('1970-01-01T22:30:00Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:30:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 81000000);


    // 5. Edge unsafe date during the offset moving
    dt = new DateTime([1970, 1, 2, 2, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86399999);

    dt = new DateTime('1970-01-02T02:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-01T22:59:59.999+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);

    dt = new DateTime('1970-01-01T22:59:59.999Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 82799999);


    // 6. Edge safe date just after the offset moving
    dt = new DateTime([1970, 1, 2, 3, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-02T03:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-02T02:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-02T07:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-01T20:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-01T23:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);

    dt = new DateTime('1970-01-01T23:00:00Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 82800000);


    // 7. Safe date after the offset moving
    dt = new DateTime([1970, 1, 2, 4, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);

    dt = new DateTime('1970-01-02T04:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);

    dt = new DateTime('1970-01-02T03:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);

    dt = new DateTime('1970-01-02T08:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);

    dt = new DateTime('1970-01-01T21:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);

    dt = new DateTime('1970-01-02T00:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);

    dt = new DateTime('1970-01-02T00:00:00Z', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 86400000);
  });

  test('[Create instance] Attributes :: Timezone :: Positive offset :: Offset moves backward', function () {
    setTestTimezone({
      abbr: [
        'TST_03',
        'TST_04',
        'TST_03'
      ],
      dst: [
        false,
        true,
        false
      ],
      offset: [
        -180, // +0300
        -240, // +0400
        -180  // +0300
      ],
      until: [
        82800000, // 1970-01-02T02:00:00
        165600000, // 1970-01-03T02:00:00
        null
      ]
    });

    // 0. Unambiguous date far before the offset moving
    dt = new DateTime([1970, 1, 2, 22, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 22:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 151200000);

    dt = new DateTime('1970-01-02T22:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 22:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 151200000);

    dt = new DateTime('1970-01-02T21:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 22:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 151200000);

    dt = new DateTime('1970-01-03T02:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 22:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 151200000);

    dt = new DateTime('1970-01-02T14:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 22:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 151200000);

    dt = new DateTime('1970-01-02T18:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 22:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 151200000);


    // 1. Unambiguous date before the offset moving
    dt = new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 158400000);

    dt = new DateTime('1970-01-03T00:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 158400000);

    dt = new DateTime('1970-01-02T23:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 158400000);

    dt = new DateTime('1970-01-03T04:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 158400000);

    dt = new DateTime('1970-01-02T16:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 158400000);

    dt = new DateTime('1970-01-02T20:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 158400000);


    // 2. Edge unambiguous date before the offset moving
    dt = new DateTime([1970, 1, 3, 0, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 161999999);

    dt = new DateTime('1970-01-03T00:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 161999999);

    dt = new DateTime('1970-01-02T23:59:59.999+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 161999999);

    dt = new DateTime('1970-01-02T01:59:59.999+0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 23:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 75599999);

    dt = new DateTime('1970-01-03T04:59:59.999+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 161999999);

    dt = new DateTime('1970-01-02T16:59:59.999-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 161999999);

    dt = new DateTime('1970-01-02T20:59:59.999+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 161999999);


    // 3. Edge early ambiguous date during the offset moving
    dt = new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);

    dt = new DateTime('1970-01-03T01:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);

    dt = new DateTime('1970-01-03T00:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);

    dt = new DateTime('1970-01-03T02:00:00+0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);

    dt = new DateTime('1970-01-03T05:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);

    dt = new DateTime('1970-01-02T17:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);

    dt = new DateTime('1970-01-02T21:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 162000000);


    // 4. Late ambiguous date during the offset moving
    dt = new DateTime([1970, 1, 3, 1, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-03T01:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-03T00:59:59.999+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-03T02:59:59.999+0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-03T05:59:59.999+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-02T17:59:59.999-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-02T21:59:59.999+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);


    // 5. Edge late ambiguous date during the offset moving
    dt = new DateTime('1970-01-03T01:59:59.999+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169199999);

    dt = new DateTime('1970-01-03T00:59:59.999+0200', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169199999);

    dt = new DateTime('1970-01-03T01:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);

    dt = new DateTime('1970-01-02T21:59:59.999+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT+0400 (TST_04)');
    ok(dt.valueOf() === 165599999);


    // 6. Edge unambiguous date after the offset moving
    dt = new DateTime([1970, 1, 3, 2, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-03T02:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-03T03:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-03T04:00:00+0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-03T01:00:00+0200', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-03T07:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-02T20:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-02T23:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 169200000);


    // 7. Unambiguous date after the offset moving
    dt = new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);

    dt = new DateTime('1970-01-03T03:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);

    dt = new DateTime('1970-01-03T02:00:00+0200', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);

    dt = new DateTime('1970-01-03T04:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);

    dt = new DateTime('1970-01-03T08:00:00+0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);

    dt = new DateTime('1970-01-02T21:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);

    dt = new DateTime('1970-01-03T00:00:00+0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT+0300 (TST_03)');
    ok(dt.valueOf() === 172800000);
  });

  test('[Create instance] Attributes :: Timezone :: Negative offset :: Offset moves forward', function () {
    setTestTimezone({
      abbr: [
        'TST_04',
        'TST_03',
        'TST_04'
      ],
      dst: [
        false,
        true
      ],
      offset: [
        240, // -0400
        180, // -0300
        240  // -0400
      ],
      until: [
        108000000, // 1970-01-02T02:00:00
        190800000, // 1970-01-03T02:00:00
        null
      ]
    });

    // 0. Safe date before the offset moving
    dt = new DateTime([1970, 1, 1, 22, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);

    dt = new DateTime('1970-01-01T22:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);

    dt = new DateTime('1970-01-01T23:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);

    dt = new DateTime('1970-01-01T21:00:00-0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);

    dt = new DateTime('1970-01-01T18:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);

    dt = new DateTime('1970-01-02T06:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);

    dt = new DateTime('1970-01-02T02:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Thu Jan 01 1970 22:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 93600000);


    // 1. Safe date before the offset moving
    dt = new DateTime([1970, 1, 2, 1, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);

    dt = new DateTime('1970-01-02T01:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);

    dt = new DateTime('1970-01-02T02:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);

    dt = new DateTime('1970-01-02T00:00:00-0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);

    dt = new DateTime('1970-01-01T21:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);

    dt = new DateTime('1970-01-02T09:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);

    dt = new DateTime('1970-01-02T05:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 104400000);


    // 2. Edge safe date just before the offset moving
    dt = new DateTime([1970, 1, 2, 1, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);

    dt = new DateTime('1970-01-02T01:59:59.999-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);

    dt = new DateTime('1970-01-02T02:59:59.999-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);

    dt = new DateTime('1970-01-02T00:59:59.999-0500', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);

    dt = new DateTime('1970-01-01T21:59:59.999-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);

    dt = new DateTime('1970-01-02T09:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);

    dt = new DateTime('1970-01-02T05:59:59.999-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 107999999);


    // 3. Edge unsafe date during the offset moving
    dt = new DateTime([1970, 1, 2, 2, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);


    // 4. Unsafe date during the offset moving
    dt = new DateTime([1970, 1, 2, 2, 30, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:30:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 109800000);


    // 5. Edge unsafe date during the offset moving
    dt = new DateTime([1970, 1, 2, 2, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111599999);


    // 6. Edge safe date just after the offset moving
    dt = new DateTime([1970, 1, 2, 3, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);

    dt = new DateTime('1970-01-02T03:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);

    dt = new DateTime('1970-01-02T02:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);

    dt = new DateTime('1970-01-01T22:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);

    dt = new DateTime('1970-01-02T09:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);

    dt = new DateTime('1970-01-02T06:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 03:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 108000000);


    // 7. Safe date after the offset moving
    dt = new DateTime([1970, 1, 2, 4, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111600000);

    dt = new DateTime('1970-01-02T04:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111600000);

    dt = new DateTime('1970-01-02T03:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111600000);

    dt = new DateTime('1970-01-01T23:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111600000);

    dt = new DateTime('1970-01-02T10:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111600000);

    dt = new DateTime('1970-01-02T07:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 04:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 111600000);
  });

  test('[Create instance] Attributes :: Timezone :: Negative offset :: Offset moves backward', function () {
    setTestTimezone({
      abbr: [
        'TST_04',
        'TST_03',
        'TST_04'
      ],
      dst: [
        false,
        true
      ],
      offset: [
        240, // -0400
        180, // -0300
        240  // -0400
      ],
      until: [
        108000000, // 1970-01-02T02:00:00
        190800000, // 1970-01-03T02:00:00
        null
      ]
    });

    // 0. Unambiguous date far before the offset moving
    dt = new DateTime([1970, 1, 2, 20, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 20:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-02T20:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 20:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-02T19:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 20:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-02T15:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 20:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-03T02:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 20:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 169200000);

    dt = new DateTime('1970-01-02T23:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Fri Jan 02 1970 20:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 169200000);


    // 1. Unambiguous date before the offset moving
    dt = new DateTime([1970, 1, 3, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 183600000);

    dt = new DateTime('1970-01-03T00:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 183600000);

    dt = new DateTime('1970-01-02T23:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 183600000);

    dt = new DateTime('1970-01-02T19:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 183600000);

    dt = new DateTime('1970-01-03T06:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 183600000);

    dt = new DateTime('1970-01-03T03:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 183600000);


    // 2. Edge unambiguous date before the offset moving
    dt = new DateTime([1970, 1, 3, 0, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187199999);

    dt = new DateTime('1970-01-03T00:59:59.999-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187199999);

    dt = new DateTime('1970-01-02T23:59:59.999-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187199999);

    dt = new DateTime('1970-01-02T19:59:59.999-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187199999);

    dt = new DateTime('1970-01-03T06:59:59.999+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187199999);

    dt = new DateTime('1970-01-03T03:59:59.999-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 00:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187199999);


    // 3. Edge early ambiguous date during the offset moving
    dt = new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);

    dt = new DateTime('1970-01-03T01:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);

    dt = new DateTime('1970-01-03T00:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);

    dt = new DateTime('1970-01-02T20:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);

    dt = new DateTime('1970-01-03T07:00:00+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);

    dt = new DateTime('1970-01-03T04:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);


    // 4. Early ambiguous date during the offset moving
    dt = new DateTime([1970, 1, 3, 1, 59, 59, 999], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 190799999);

    dt = new DateTime('1970-01-03T01:59:59.999-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 190799999);

    dt = new DateTime('1970-01-03T00:59:59.999-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 190799999);

    dt = new DateTime('1970-01-02T20:59:59.999-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 190799999);

    dt = new DateTime('1970-01-03T07:59:59.999+0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 190799999);

    dt = new DateTime('1970-01-03T04:59:59.999-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 190799999);


    // 5. Edge late ambiguous date during the offset moving
    dt = new DateTime('1970-01-03T01:59:59.999-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194399999);

    dt = new DateTime('1970-01-03T02:59:59.999-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194399999);

    dt = new DateTime('1970-01-02T21:59:59.999-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194399999);

    dt = new DateTime('1970-01-03T09:59:59.999+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194399999);

    dt = new DateTime('1970-01-03T05:59:59.999-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:59:59 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194399999);


    // 6. Edge unambiguous date after the offset moving
    dt = new DateTime([1970, 1, 3, 2, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194400000);

    dt = new DateTime('1970-01-03T02:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194400000);

    dt = new DateTime('1970-01-03T01:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0300 (TST_03)');
    ok(dt.valueOf() === 187200000);

    dt = new DateTime('1970-01-02T22:00:00-0800', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194400000);

    dt = new DateTime('1970-01-03T10:00:00+0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194400000);

    dt = new DateTime('1970-01-03T06:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 02:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 194400000);


    // 7. Unambiguous date after the offset moving
    dt = new DateTime([1970, 1, 3, 3, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 198000000);

    dt = new DateTime('1970-01-03T03:00:00-0400', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 03:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 198000000);

    dt = new DateTime('1970-01-03T02:00:00-0300', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 190800000);

    dt = new DateTime('1970-01-03T05:00:00-0000', TEST_TIMEZONE);
    ok(dt.toString() === 'Sat Jan 03 1970 01:00:00 GMT-0400 (TST_04)');
    ok(dt.valueOf() === 190800000);
  });

  test('[Create instance] Attributes :: Timezone :: Zero offset :: No previous offset', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        0, // 0
        180
      ],
      until: [
        172800000, // 2 days
        null
      ]
    });

    dt = new DateTime([1970, 1, 1, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.valueOf() === 50400000);
  });

  test('[Create instance] Attributes :: Timezone :: Zero offset :: Time moves forward. No ambiguity', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        180, // -0300
        0
      ],
      until: [
        172800000, // 2 days
        null
      ]
    });

    dt = new DateTime([1970, 1, 3, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.valueOf() === 223200000);
  });

  test('[Create instance] Attributes :: Timezone :: Zero offset :: Time moves backward. No ambiguity', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -180, // -0300
        0
      ],
      until: [
        172800000, // 2 days
        null
      ]
    });

    dt = new DateTime([1970, 1, 3, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.valueOf() === 223200000);
  });

  test('[Create instance] Attributes :: Timezone :: Zero offset :: Time moves backward. Ambiguous date', function () {
    setTestTimezone({
      dst: [
        false,
        false
      ],
      offset: [
        -180, // -0300
        0
      ],
      until: [
        172800000, // 2 days
        null
      ]
    });

    dt = new DateTime([1970, 1, 3, 1, 0, 0, 0], TEST_TIMEZONE);
    ok(dt.valueOf() === 165600000);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create instance :: Attributes normalizing
   * ----------------------------------------------------------------------------------------
   */

  test('[Create instance] Attributes normalizing :: Month :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valud value
    dt = new DateTime([2014, 1, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1389823652545);

    dt = new DateTime([2014, 6, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 6, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1402870052545);

    dt = new DateTime([2014, 12, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1418681252545);

    // Positive value
    dt = new DateTime([2014, 13, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1421359652545);

    dt = new DateTime([2014, 36, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1481839652545);

    dt = new DateTime([1950, 37, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [1953, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === -535168347455);

    // Negative
    dt = new DateTime([2015, 0, 31, 22, 50, 52, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 12, 31, 22, 50, 52, 0]));
    ok(dt.valueOf() === 1420066252000);

    dt = new DateTime([2014, 0, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1387145252545);

    dt = new DateTime([2014, -1, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 11, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1384553252545);

    dt = new DateTime([2014, -6, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 6, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1371334052545);

    dt = new DateTime([2014, -11, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1358287652545);

    dt = new DateTime([2014, -12, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2012, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1355609252545);

    dt = new DateTime([1920, -25, 15, 22, 7, 32, 545], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [1917, 11, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === -1644976347455);
  });

  test('[Create instance] Attributes normalizing :: Month :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valud value
    dt = new DateTime([2014, 1, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1389798452545);

    dt = new DateTime([2014, 6, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 6, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1402844852545);

    dt = new DateTime([2014, 12, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1418656052545);

    // Positive value
    dt = new DateTime([2014, 13, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1421334452545);

    dt = new DateTime([2014, 36, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1481814452545);

    dt = new DateTime([2014, 37, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2017, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1484492852545);

    // Negative
    dt = new DateTime([2015, 0, 31, 22, 50, 52, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 12, 31, 22, 50, 52, 0]));
    ok(dt.valueOf() === 1420041052000);

    dt = new DateTime([2014, 0, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1387120052545);

    dt = new DateTime([2014, -1, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 11, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1384528052545);

    dt = new DateTime([2014, -6, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 6, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1371308852545);

    dt = new DateTime([2014, -11, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2013, 1, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1358262452545);

    dt = new DateTime([2014, -12, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2012, 12, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1355584052545);

    dt = new DateTime([2014, -25, 15, 22, 7, 32, 545], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2011, 11, 15, 22, 7, 32, 545]));
    ok(dt.valueOf() === 1321369652545);
  });

  test('[Create instance] Attributes normalizing :: Day of month :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 1, 1, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1420088400000);

    dt = new DateTime([2015, 1, 15, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 15, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1421298000000);

    dt = new DateTime([2015, 2, 28, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 28, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425099600000);

    dt = new DateTime([2016, 2, 29, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1456722000000);

    dt = new DateTime([2016, 4, 30, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 4, 30, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1461992400000);

    dt = new DateTime([2016, 5, 31, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 5, 31, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1464670800000);

    // Positive value
    dt = new DateTime([2015, 1, 32, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1422766800000);

    dt = new DateTime([2015, 2, 31, 14, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 3, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1425391200000);

    dt = new DateTime([2015, 4, 31, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1430456400000);

    dt = new DateTime([2016, 2, 31, 14, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 3, 2, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1456927200000);

    dt = new DateTime([2015, 4, 62, 14, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 6, 1, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1433167200000);

    dt = new DateTime([2015, 1, 426, 14, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 3, 1, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1456840800000);

    // Negative value
    dt = new DateTime([2015, 4, 0, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 31, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1427778000000);

    dt = new DateTime([2015, 4, -1, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 30, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1427691600000);

    dt = new DateTime([2015, 4, -15, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 16, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1426482000000);

    dt = new DateTime([2015, 4, -30, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425186000000);

    dt = new DateTime([2015, 4, -31, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 28, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425099600000);

    dt = new DateTime([2015, 4, -60, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 30, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1422594000000);

    dt = new DateTime([2015, 3, 0, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 28, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425099600000);

    dt = new DateTime([2016, 3, 0, 5, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1456722000000);
  });

  test('[Create instance] Attributes normalizing :: Day of month :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 1, 1, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1420063200000);

    dt = new DateTime([2015, 1, 15, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 15, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1421272800000);

    dt = new DateTime([2015, 2, 28, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 28, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425074400000);

    dt = new DateTime([2016, 2, 29, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1456696800000);

    dt = new DateTime([2016, 4, 30, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 4, 30, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1461967200000);

    dt = new DateTime([2016, 5, 31, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 5, 31, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1464645600000);

    // Positive value
    dt = new DateTime([2015, 1, 32, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1422741600000);

    dt = new DateTime([2015, 2, 31, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 3, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1425366000000);

    dt = new DateTime([2015, 4, 31, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1430431200000);

    dt = new DateTime([2016, 2, 31, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 3, 2, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1456902000000);

    dt = new DateTime([2015, 4, 62, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 6, 1, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1433142000000);

    dt = new DateTime([2015, 1, 426, 14, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 3, 1, 14, 0, 0, 0]));
    ok(dt.valueOf() === 1456815600000);

    dt = new DateTime([2015, 4, 0, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 31, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1427752800000);

    dt = new DateTime([2015, 4, -1, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 30, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1427666400000);

    dt = new DateTime([2015, 4, -15, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 16, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1426456800000);

    dt = new DateTime([2015, 4, -30, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 3, 1, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425160800000);

    dt = new DateTime([2015, 4, -31, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 28, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425074400000);

    dt = new DateTime([2015, 4, -60, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 1, 30, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1422568800000);

    dt = new DateTime([2015, 3, 0, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 2, 28, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1425074400000);

    dt = new DateTime([2016, 3, 0, 5, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 2, 29, 5, 0, 0, 0]));
    ok(dt.valueOf() === 1456696800000);
  });

  test('[Create instance] Attributes normalizing :: Hour :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 0, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 0, 0, 0, 0]));
    ok(dt.valueOf() === 1431648000000);

    dt = new DateTime([2015, 5, 15, 12, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 12, 0, 0, 0]));
    ok(dt.valueOf() === 1431691200000);

    dt = new DateTime([2015, 5, 15, 23, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 23, 0, 0, 0]));
    ok(dt.valueOf() === 1431730800000);

    // Positive value
    dt = new DateTime([2015, 5, 15, 24, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 16, 0, 0, 0, 0]));
    ok(dt.valueOf() === 1431734400000);

    dt = new DateTime([2015, 5, 15, 109, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 19, 13, 0, 0, 0]));
    ok(dt.valueOf() === 1432040400000);

    dt = new DateTime([2015, 5, 21, 263, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 31, 23, 0, 0, 0]));
    ok(dt.valueOf() === 1433113200000);

    // Negative value
    dt = new DateTime([2015, 5, 15, -1, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 23, 0, 0, 0]));
    ok(dt.valueOf() === 1431644400000);

    dt = new DateTime([2015, 5, 15, -12, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 12, 0, 0, 0]));
    ok(dt.valueOf() === 1431604800000);

    dt = new DateTime([2015, 5, 15, -23, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 1, 0, 0, 0]));
    ok(dt.valueOf() === 1431565200000);

    dt = new DateTime([2015, 5, 15, -24, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 0, 0, 0, 0]));
    ok(dt.valueOf() === 1431561600000);

    dt = new DateTime([2015, 5, 15, -156, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 8, 12, 0, 0, 0]));
    ok(dt.valueOf() === 1431086400000);
  });

  test('[Create instance] Attributes normalizing :: Hour :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 0, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 0, 0, 0, 0]));
    ok(dt.valueOf() === 1431622800000);

    dt = new DateTime([2015, 5, 15, 12, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 12, 0, 0, 0]));
    ok(dt.valueOf() === 1431666000000);

    dt = new DateTime([2015, 5, 15, 23, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 23, 0, 0, 0]));
    ok(dt.valueOf() === 1431705600000);

    // Positive value
    dt = new DateTime([2015, 5, 15, 24, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 16, 0, 0, 0, 0]));
    ok(dt.valueOf() === 1431709200000);

    dt = new DateTime([2015, 5, 15, 109, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 19, 13, 0, 0, 0]));
    ok(dt.valueOf() === 1432015200000);

    dt = new DateTime([2015, 5, 21, 263, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 31, 23, 0, 0, 0]));
    ok(dt.valueOf() === 1433088000000);

    // Negative value
    dt = new DateTime([2015, 5, 15, -1, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 23, 0, 0, 0]));
    ok(dt.valueOf() === 1431619200000);

    dt = new DateTime([2015, 5, 15, -12, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 12, 0, 0, 0]));
    ok(dt.valueOf() === 1431579600000);

    dt = new DateTime([2015, 5, 15, -23, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 1, 0, 0, 0]));
    ok(dt.valueOf() === 1431540000000);

    dt = new DateTime([2015, 5, 15, -24, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 14, 0, 0, 0, 0]));
    ok(dt.valueOf() === 1431536400000);

    dt = new DateTime([2015, 5, 15, -156, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 8, 12, 0, 0, 0]));
    ok(dt.valueOf() === 1431061200000);
  });

  test('[Create instance] Attributes normalizing :: Minute :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 7, 0, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 7, 0, 0, 0]));
    ok(dt.valueOf() === 1431673200000);

    dt = new DateTime([2015, 5, 15, 7, 30, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 7, 30, 0, 0]));
    ok(dt.valueOf() === 1431675000000);

    dt = new DateTime([2015, 5, 15, 7, 59, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 7, 59, 0, 0]));
    ok(dt.valueOf() === 1431676740000);

    // Positive value
    dt = new DateTime([2015, 5, 15, 7, 60, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 8, 0, 0, 0]));
    ok(dt.valueOf() === 1431676800000);

    dt = new DateTime([2015, 5, 15, 7, 445, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 14, 25, 0, 0]));
    ok(dt.valueOf() === 1431699900000);

    dt = new DateTime([2015, 5, 15, 19, 299, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 23, 59, 0, 0]));
    ok(dt.valueOf() === 1431734340000);

    // Negative value
    dt = new DateTime([2015, 5, 15, 7, -1, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 6, 59, 0, 0]));
    ok(dt.valueOf() === 1431673140000);

    dt = new DateTime([2015, 5, 15, 7, -59, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 6, 1, 0, 0]));
    ok(dt.valueOf() === 1431669660000);

    dt = new DateTime([2015, 5, 15, 7, -60, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 6, 0, 0, 0]));
    ok(dt.valueOf() === 1431669600000);

    dt = new DateTime([2015, 5, 15, 7, -61, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 5, 59, 0, 0]));
    ok(dt.valueOf() === 1431669540000);

    dt = new DateTime([2015, 5, 15, 14, -320, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 8, 40, 0, 0]));
    ok(dt.valueOf() === 1431679200000);
  });

  test('[Create instance] Attributes normalizing :: Minute :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 7, 0, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 7, 0, 0, 0]));
    ok(dt.valueOf() === 1431648000000);

    dt = new DateTime([2015, 5, 15, 7, 30, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 7, 30, 0, 0]));
    ok(dt.valueOf() === 1431649800000);

    dt = new DateTime([2015, 5, 15, 7, 59, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 7, 59, 0, 0]));
    ok(dt.valueOf() === 1431651540000);

    // Positive value
    dt = new DateTime([2015, 5, 15, 7, 60, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 8, 0, 0, 0]));
    ok(dt.valueOf() === 1431651600000);

    dt = new DateTime([2015, 5, 15, 7, 445, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 14, 25, 0, 0]));
    ok(dt.valueOf() === 1431674700000);

    dt = new DateTime([2015, 5, 15, 19, 299, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 23, 59, 0, 0]));
    ok(dt.valueOf() === 1431709140000);

    // Negative value
    dt = new DateTime([2015, 5, 15, 7, -1, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 6, 59, 0, 0]));
    ok(dt.valueOf() === 1431647940000);

    dt = new DateTime([2015, 5, 15, 7, -59, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 6, 1, 0, 0]));
    ok(dt.valueOf() === 1431644460000);

    dt = new DateTime([2015, 5, 15, 7, -60, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 6, 0, 0, 0]));
    ok(dt.valueOf() === 1431644400000);

    dt = new DateTime([2015, 5, 15, 7, -61, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 5, 59, 0, 0]));
    ok(dt.valueOf() === 1431644340000);

    dt = new DateTime([2015, 5, 15, 14, -320, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 8, 40, 0, 0]));
    ok(dt.valueOf() === 1431654000000);
  });

  test('[Create instance] Attributes normalizing :: Second :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 22, 7, 0, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 0, 0]));
    ok(dt.valueOf() === 1431727620000);

    dt = new DateTime([2015, 5, 15, 22, 7, 30, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 30, 0]));
    ok(dt.valueOf() === 1431727650000);

    dt = new DateTime([2015, 5, 15, 22, 7, 59, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 59, 0]));
    ok(dt.valueOf() === 1431727679000);

    // Positive value
    dt = new DateTime([2015, 5, 15, 22, 7, 60, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 8, 0, 0]));
    ok(dt.valueOf() === 1431727680000);

    dt = new DateTime([2015, 5, 15, 22, 7, 445, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 14, 25, 0]));
    ok(dt.valueOf() === 1431728065000);

    dt = new DateTime([2015, 5, 15, 22, 49, 659, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 59, 59, 0]));
    ok(dt.valueOf() === 1431730799000);

    // Negative value
    dt = new DateTime([2015, 5, 15, 22, 7, -1, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 59, 0]));
    ok(dt.valueOf() === 1431727619000);

    dt = new DateTime([2015, 5, 15, 22, 7, -30, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 30, 0]));
    ok(dt.valueOf() === 1431727590000);

    dt = new DateTime([2015, 5, 15, 22, 7, -59, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 1, 0]));
    ok(dt.valueOf() === 1431727561000);

    dt = new DateTime([2015, 5, 15, 22, 7, -60, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 0, 0]));
    ok(dt.valueOf() === 1431727560000);

    dt = new DateTime([2015, 5, 15, 22, 7, -61, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 5, 59, 0]));
    ok(dt.valueOf() === 1431727559000);

    dt = new DateTime([2015, 5, 15, 22, 10, -445, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 2, 35, 0]));
    ok(dt.valueOf() === 1431727355000);
  });

  test('[Create instance] Attributes normalizing :: Second :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 22, 7, 0, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 0, 0]));
    ok(dt.valueOf() === 1431702420000);

    dt = new DateTime([2015, 5, 15, 22, 7, 30, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 30, 0]));
    ok(dt.valueOf() === 1431702450000);

    dt = new DateTime([2015, 5, 15, 22, 7, 59, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 59, 0]));
    ok(dt.valueOf() === 1431702479000);

    // Positive value
    dt = new DateTime([2015, 5, 15, 22, 7, 60, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 8, 0, 0]));
    ok(dt.valueOf() === 1431702480000);

    dt = new DateTime([2015, 5, 15, 22, 7, 445, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 14, 25, 0]));
    ok(dt.valueOf() === 1431702865000);

    dt = new DateTime([2015, 5, 15, 22, 49, 659, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 59, 59, 0]));
    ok(dt.valueOf() === 1431705599000);

    // Negative value
    dt = new DateTime([2015, 5, 15, 22, 7, -1, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 59, 0]));
    ok(dt.valueOf() === 1431702419000);

    dt = new DateTime([2015, 5, 15, 22, 7, -30, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 30, 0]));
    ok(dt.valueOf() === 1431702390000);

    dt = new DateTime([2015, 5, 15, 22, 7, -59, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 1, 0]));
    ok(dt.valueOf() === 1431702361000);

    dt = new DateTime([2015, 5, 15, 22, 7, -60, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 6, 0, 0]));
    ok(dt.valueOf() === 1431702360000);

    dt = new DateTime([2015, 5, 15, 22, 7, -61, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 5, 59, 0]));
    ok(dt.valueOf() === 1431702359000);

    dt = new DateTime([2015, 5, 15, 22, 10, -445, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 2, 35, 0]));
    ok(dt.valueOf() === 1431702155000);
  });

  test('[Create instance] Attributes normalizing :: Millisecond :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 22, 7, 32, 0], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 32, 0]));
    ok(dt.valueOf() === 1431727652000);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, 500], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 32, 500]));
    ok(dt.valueOf() === 1431727652500);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, 999], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 32, 999]));
    ok(dt.valueOf() === 1431727652999);

    // Positive value
    dt = new DateTime([2015, 5, 15, 22, 7, 32, 1000], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 33, 0]));
    ok(dt.valueOf() === 1431727653000);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, 6344], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 38, 344]));
    ok(dt.valueOf() === 1431727658344);

    dt = new DateTime([2015, 5, 15, 22, 7, 52, 7999], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 59, 999]));
    ok(dt.valueOf() === 1431727679999);

    // Negative value
    dt = new DateTime([2015, 5, 15, 22, 7, 32, -1], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 31, 999]));
    ok(dt.valueOf() === 1431727651999);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -999], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 31, 1]));
    ok(dt.valueOf() === 1431727651001);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -1000], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 31, 0]));
    ok(dt.valueOf() === 1431727651000);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -1001], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 30, 999]));
    ok(dt.valueOf() === 1431727650999);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -6344], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 25, 656]));
    ok(dt.valueOf() === 1431727645656);

    dt = new DateTime([2015, 5, 15, 22, 7, 8, -7999], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 0, 1]));
    ok(dt.valueOf() === 1431727620001);
  });

  test('[Create instance] Attributes normalizing :: Millisecond :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Valid value
    dt = new DateTime([2015, 5, 15, 22, 7, 32, 0], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 32, 0]));
    ok(dt.valueOf() === 1431702452000);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, 500], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 32, 500]));
    ok(dt.valueOf() === 1431702452500);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, 999], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 32, 999]));
    ok(dt.valueOf() === 1431702452999);

    // Positive value
    dt = new DateTime([2015, 5, 15, 22, 7, 32, 1000], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 33, 0]));
    ok(dt.valueOf() === 1431702453000);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, 6344], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 38, 344]));
    ok(dt.valueOf() === 1431702458344);

    dt = new DateTime([2015, 5, 15, 22, 7, 52, 7999], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 59, 999]));
    ok(dt.valueOf() === 1431702479999);

    // Negative value
    dt = new DateTime([2015, 5, 15, 22, 7, 32, -1], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 31, 999]));
    ok(dt.valueOf() === 1431702451999);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -999], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 31, 1]));
    ok(dt.valueOf() === 1431702451001);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -1000], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 31, 0]));
    ok(dt.valueOf() === 1431702451000);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -1001], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 30, 999]));
    ok(dt.valueOf() === 1431702450999);

    dt = new DateTime([2015, 5, 15, 22, 7, 32, -6344], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 25, 656]));
    ok(dt.valueOf() === 1431702445656);

    dt = new DateTime([2015, 5, 15, 22, 7, 8, -7999], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2015, 5, 15, 22, 7, 0, 1]));
    ok(dt.valueOf() === 1431702420001);
  });

  test('[Create instance] Attributes normalizing :: All attributes :: UTC', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    // Positive value
    dt = new DateTime([2015, 15, 31, 22, 50, 52, 8001 + 540000 + 3600000], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 4, 1, 0, 0, 0, 1]));
    ok(dt.valueOf() === 1459468800001);

    // Negative value
    dt = new DateTime([2015, -2, -150, -22, -50, -5, -6000], UTC_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 5, 2, 1, 9, 49, 0]));
    ok(dt.valueOf() === 1398992989000);
  });

  test('[Create instance] Attributes normalizing :: All attributes :: Timezone', function () {
    setTestTimezone({
      dst: [
        false
      ],
      offset: [
        -420 // +0700
      ],
      until: [
        null
      ]
    });

    dt = new DateTime([2015, 15, 31, 22, 50, 52, 8001 + 540000 + 3600000], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2016, 4, 1, 0, 0, 0, 1]));
    ok(dt.valueOf() === 1459443600001);

    // Negative value
    dt = new DateTime([2015, -2, -150, -22, -50, -5, -6000], TEST_TIMEZONE);
    ok(equalArrays(getDateAttributes(dt), [2014, 5, 2, 1, 9, 49, 0]));
    ok(dt.valueOf() === 1398967789000);
  });

  /**
   * -------------------------------------------------------------------------------------
   * Create instance :: DateTime instance
   * -------------------------------------------------------------------------------------
   */

  test('[Create instance] DateTime :: UTC :: Before UNIX epoch', function () {
    dt = new DateTime(-1415733423121);
    dt2 = new DateTime(dt);
    ok(dt2.valueOf() === dt.valueOf());
  });

  test('[Create instance] DateTime :: UTC :: UNIX epoch', function () {
    dt = new DateTime(1415733423121);
    dt2 = new DateTime(dt);
    ok(dt2.valueOf() === dt.valueOf());
  });

  test('[Create instance] DateTime :: Timezone :: Positive offset', function () {
    setTestTimezone({
      dst: [
        false,
        false,
        false
      ],
      offset: [
        -180, // +0300
        -240, // +0400
        0
      ],
      until: [
        172800000, // 2 days
        345600000, // 4 days
        null
      ]
    });

    dt = new DateTime([1970, 1, 4, 0, 30, 0, 0], TEST_TIMEZONE); // until + 30 minutes
    dt2 = new DateTime(dt);

    ok(equalDates(dt, dt2) === true);
  });
})();
