(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Prepare
   * ----------------------------------------------------------------------------------------
   */

  var Day = DateTime.Day;

  var UTC_TIMEZONE = 'UTC';

  var test = createTestFn();
  var Interval = DateTime.Interval;

  function isInvalid (intervalToCheck) {
    return intervalToCheck.isValid() === false &&
      intervalToCheck.isInvalid() === true &&
      intervalToCheck.toString() === 'Invalid interval';
  }

  /**
   * ----------------------------------------------------------------------------------------
   * Class
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] Class', function () {
    ok(typeof Interval === 'function');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Create instance
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] Create', function () {
    var dt1 = new DateTime('2016-10-05T14:23:45.555', UTC_TIMEZONE);
    var dt2 = new DateTime('2016-11-08T11:05:58.123', UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    ok(interval instanceof Interval);
    ok(isInvalid(interval) === false);

    ok(interval.toStart().isEqual(dt1));
    ok(interval.toEnd().isEqual(dt2));
  });

  // FIXME
  test('[Interval] Create :: Timezone', function () {
    setTestTimezone({
      abbr: [
        'TST',
        'TST_1',
        'TST'
      ],
      dst: [
        false,
        true,
        false
      ],
      offset: [
        0,
        -60, // +0100
        0
      ],
      until: [
        180000000, // 1970-01-03T02:00:00
        262800000, // 1970-01-04T02:00:00
        null
      ]
    });

    var dt1 = new DateTime('1970-01-03T01:00:00+0000', TEST_TIMEZONE);
    var dt2 = new DateTime('1970-01-03T03:00:00+0100', TEST_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    ok(interval.isValid() === true, 'interval.isValid() === true');
    ok(interval.getDuration() === 3600000, 'interval.getDuration() === 3600000');

    dt1 = new DateTime('1970-01-04T01:30:00.000+0100', TEST_TIMEZONE);
    dt2 = new DateTime('1970-01-04T01:00:00.000+0000', TEST_TIMEZONE);

    interval = new Interval(dt1, dt2);

    ok(interval.isValid() === true, 'interval.isValid() === true');
    ok(interval.getDuration() === 1800000, 'interval.getDuration() === 1800000');
    ok(interval.toString() === 'Sun Jan 04 1970 01:30:00 GMT+0100 (TST_1) – Sun Jan 04 1970 01:00:00 GMT+0000 (TST)');
  });

  test('[Interval] Create :: Wrong attributes', function () {
    var interval = new Interval('abc', 'def');
    ok(isInvalid(interval) === true);
  });

  test('[Interval] Create :: Start is greater than end', function () {
    var dt1 = new DateTime('2016-10-05T14:23:45.555', UTC_TIMEZONE);
    var dt2 = new DateTime('2016-11-08T11:05:58.123', UTC_TIMEZONE);

    var interval = new Interval(dt2, dt1);

    var start = interval.toStart();
    var end = interval.toEnd();

    ok(isInvalid(interval) === true);
    ok(start.isEqual(dt2) === true);
    ok(end.isEqual(dt1) === true);

    interval = new Interval(dt1, dt1);
    start = interval.toStart();
    end = interval.toEnd();

    ok(isInvalid(interval) === false);
    ok(start.isEqual(dt1) === true);
    ok(end.isEqual(dt1) === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Invalid interval
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] Invalid :: Unsupported attributes', function () {
    var dt1;
    var dt2;

    dt1 = new DateTime(NaN, UTC_TIMEZONE);
    dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);
    ok(isInvalid(interval) === true);

    dt1 = new DateTime(NaN, UTC_TIMEZONE);
    dt2 = new DateTime('2016-11-08T11:05:58.123', UTC_TIMEZONE);

    interval = new Interval(dt1, dt2);
    ok(isInvalid(interval) === true);
  });

  test('[Interval] Invalid :: toString', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);
    ok(interval.toString() === 'Invalid interval');
  });

  test('[Interval] Invalid :: toISOString', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);
    ok(interval.toISOString() === 'Invalid interval');
  });

  test('[Interval] Invalid :: toLocaleString', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);
    ok(interval.toLocaleString() === 'Invalid interval');
  });

  test('[Interval] Invalid :: toUTCString', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);
    ok(interval.toUTCString() === 'Invalid interval');
  });

  test('[Interval] Invalid :: format', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);
    ok(interval.format() === 'Invalid interval');
  });

  test('[Interval] Invalid :: format', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    ok(interval.format() === 'Invalid interval');
  });

  test('[Interval] Invalid :: getDuration', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    ok(isNaN(interval.getDuration()) === true);
  });

  test('[Interval] Invalid :: toStart / toEnd', function () {
    var dt1 = new DateTime(NaN, UTC_TIMEZONE);
    var dt2 = new DateTime(NaN, UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    var start = interval.toStart();
    var end = interval.toEnd();

    ok(start instanceof DateTime, 'start instanceof DateTime');
    ok(start.isInvalid() === true, 'start.isInvalid() === true');
    ok(start !== dt1, 'start !== dt1');

    ok(end instanceof DateTime, 'end instanceof DateTime');
    ok(end.isInvalid() === true, 'end.isInvalid() === true');
    ok(end !== dt2, 'end() !== dt2');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Utilities
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] isEqual', function () {
    var dt1 = new DateTime('2016-10-05T14:23:45.555', UTC_TIMEZONE);
    var dt2 = new DateTime('2016-11-08T11:05:58.123', UTC_TIMEZONE);
    var dt3 = new DateTime('2016-12-10T18:00:30.005', UTC_TIMEZONE);

    var intervalA = new Interval(dt1, dt2);
    var intervalB = new Interval(dt1, dt3);
    var intervalC = new Interval(dt1, dt2);

    ok(intervalA.isEqual(intervalB) === false);
    ok(intervalB.isEqual(intervalA) === false);

    ok(intervalB.isEqual(intervalC) === false);
    ok(intervalC.isEqual(intervalB) === false);

    ok(intervalA.isEqual(intervalC) === true);
    ok(intervalC.isEqual(intervalA) === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Includes
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] includes :: Interval', function () {
    var intervalA;
    var intervalB;

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-06-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-09-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === true);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-09-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === true);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-06-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === true);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === true);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-03-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === false);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-20-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === false);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-05-01T14:29:59', UTC_TIMEZONE),
      new DateTime('2016-07-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === false);

    intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    intervalB = new Interval(
      new DateTime('2016-06-01T14:29:59', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00.001', UTC_TIMEZONE)
    );

    ok(intervalA.includes(intervalB) === false);
  });

  test('[Interval] includes :: DateTime', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(interval.includes(new DateTime('2016-05-01T14:29:59.999', UTC_TIMEZONE)) === false);
    ok(interval.includes(new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(interval.includes(new DateTime('2016-07-01T00:00:00', UTC_TIMEZONE)) === true);
    ok(interval.includes(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(interval.includes(new DateTime('2016-10-01T14:30:00.001', UTC_TIMEZONE)) === false);
  });

  test('[Interval] includes :: DateTime', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(interval.includes(1462112999999) === false);
    ok(interval.includes(1462113000000) === true);
    ok(interval.includes(1467331200000) === true);
    ok(interval.includes(1475332200000) === true);
    ok(interval.includes(1475332200001) === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Intersects
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] intersects :: Intersects left', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.intersects(intervalB) === true);
  });

  test('[Interval] intersects :: Intersects right', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    ok(intervalA.intersects(intervalB) === true);
  });

  test('[Interval] intersects :: Includes', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.intersects(intervalB) === true);
  });

  test('[Interval] intersects :: Included', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    ok(intervalA.intersects(intervalB) === true);
  });

  test('[Interval] intersects :: Equals', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    ok(intervalA.intersects(intervalB) === true);
  });

  test('[Interval] intersects :: No intersection', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalD = new Interval(
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    ok(intervalA.intersects(intervalB) === false);
    ok(intervalC.intersects(intervalD) === false);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Get duration
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] getDuration', function () {
    var dt1 = new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE);
    var dt2 = new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    ok(interval.getDuration() === 10552780111);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Get intersection
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] getIntersection :: Intersects left', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalC = intervalA.getIntersection(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
  });

  test('[Interval] getIntersection :: Intersects right', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = intervalA.getIntersection(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
  });

  test('[Interval] getIntersection :: Includes', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalC = intervalA.getIntersection(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
  });

  test('[Interval] getIntersection :: Included', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = intervalA.getIntersection(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
  });

  test('[Interval] getIntersection :: Equals', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalC = intervalA.getIntersection(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
  });

  test('[Interval] getIntersection :: No intersection', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalD = new Interval(
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    ok(intervalA.getIntersection(intervalB) === null);
    ok(intervalC.getIntersection(intervalD) === null);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Union
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] union :: Intersects left', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalC = intervalA.union(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)) === true);
  });

  test('[Interval] union :: Intersects right', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = intervalA.union(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)) === true);
  });

  test('[Interval] union :: Includes', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalC = intervalA.union(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)) === true);
  });

  test('[Interval] union :: Included', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = intervalA.union(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)) === true);
  });

  test('[Interval] union :: Equals', function () {
    var intervalA = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE),
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)
    );

    var intervalC = intervalA.union(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE)) === true);
  });

  test('[Interval] union :: No intersection', function () {
    var intervalA = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    var intervalB = new Interval(
      new DateTime('2016-10-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)
    );

    var intervalC = intervalA.union(intervalB);

    ok(intervalC instanceof Interval);
    ok(intervalC.toStart().isEqual(new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE)) === true);
    ok(intervalC.toEnd().isEqual(new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE)) === true);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Transforming
   * ----------------------------------------------------------------------------------------
   */

  // @todo
  test('[Interval] shift', function () {
    // interval = new Interval(
    //   new DateTime('2016-10-03T14:30:00', UTC_TIMEZONE),
    //   new DateTime('2016-10-07T15:20:35.555', UTC_TIMEZONE)
    // );
    ok(1);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Converting to days
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] toIntersectingDays', function () {
    var interval;
    var days;

    interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-05-05T12:00:55.444', UTC_TIMEZONE)
    );

    days = interval.toIntersectingDays();

    ok(days[0].isEqual(new Day('2016-05-01', UTC_TIMEZONE)) === true);
    ok(days[1].isEqual(new Day('2016-05-02', UTC_TIMEZONE)) === true);
    ok(days[2].isEqual(new Day('2016-05-03', UTC_TIMEZONE)) === true);
    ok(days[3].isEqual(new Day('2016-05-04', UTC_TIMEZONE)) === true);
    ok(days[4].isEqual(new Day('2016-05-05', UTC_TIMEZONE)) === true);
    ok(days.length === 5);

    interval = new Interval(
      new DateTime('2016-05-01T14:00:00', UTC_TIMEZONE),
      new DateTime('2016-05-01T15:00:00', UTC_TIMEZONE)
    );

    days = interval.toIntersectingDays();

    ok(days[0].isEqual(new Day('2016-05-01', UTC_TIMEZONE)) === true);
    ok(days.length === 1);
  });

  test('[Interval] toIncludingDays', function () {
    var interval;
    var days;

    interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-05-05T12:00:55.444', UTC_TIMEZONE)
    );

    days = interval.toIncludingDays();

    ok(days[0].isEqual(new Day('2016-05-02', UTC_TIMEZONE)) === true);
    ok(days[1].isEqual(new Day('2016-05-03', UTC_TIMEZONE)) === true);
    ok(days[2].isEqual(new Day('2016-05-04', UTC_TIMEZONE)) === true);
    ok(days.length === 3);

    interval = new Interval(
      new DateTime('2016-05-01T14:00:00', UTC_TIMEZONE),
      new DateTime('2016-05-01T15:00:00', UTC_TIMEZONE)
    );

    days = interval.toIncludingDays();
    ok(days.length === 0);
  });

  test('[Interval] toStart', function () {
    var interval = new Interval(
      new DateTime('2016-10-03T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-07T15:20:35.555', UTC_TIMEZONE)
    );

    ok(interval.toStart().isEqual(new DateTime('2016-10-03T14:30:00', UTC_TIMEZONE)));
  });

  test('[Interval] toEnd', function () {
    var interval = new Interval(
      new DateTime('2016-10-03T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-10-07T15:20:35.555', UTC_TIMEZONE)
    );

    ok(interval.toEnd().isEqual(new DateTime('2016-10-07T15:20:35.555', UTC_TIMEZONE)));
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Converting to other formats
   * ----------------------------------------------------------------------------------------
   */

  // @todo
  test('[Interval] toPeriod', function () {
    ok(1);
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Display
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] format', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    ok(interval.format('YYYY-MM-DDTHH:mm:ss') === '2016-05-01T14:30:00 – 2016-08-01T12:00:55');
  });

  test('[Interval] Display :: toISOString', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    ok(interval.toISOString() === '2016-05-01T14:30:00.000Z – 2016-08-01T12:00:55.444Z');
  });

  test('[Interval] Display :: toLocaleString', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    ok(interval.toLocaleString() === '5/1/2016, 2:30:00 PM – 8/1/2016, 12:00:55 PM');
  });

  test('[Interval] Display :: toString', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    ok(interval.toString() === 'Sun May 01 2016 14:30:00 GMT+0000 (UTC) – Mon Aug 01 2016 12:00:55 GMT+0000 (UTC)');
  });

  test('[Interval] Display :: toUTCString', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    ok(interval.toUTCString() === 'Sun, 01 May 2016 14:30:00 GMT – Mon, 01 Aug 2016 12:00:55 GMT');
  });

  /**
   * ----------------------------------------------------------------------------------------
   * Other methods
   * ----------------------------------------------------------------------------------------
   */

  test('[Interval] toJSON', function () {
    var interval = new Interval(
      new DateTime('2016-05-01T14:30:00', UTC_TIMEZONE),
      new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE)
    );

    ok(interval.toJSON() === 'Sun May 01 2016 14:30:00 GMT+0000 (UTC) – Mon Aug 01 2016 12:00:55 GMT+0000 (UTC)');
  });

  test('[Interval] valueOf', function () {
    var dt1 = new DateTime('2016-08-01T12:00:55.444', UTC_TIMEZONE);
    var dt2 = new DateTime('2016-12-01T15:20:35.555', UTC_TIMEZONE);

    var interval = new Interval(dt1, dt2);

    ok(interval.valueOf() === 10552780111);
  });
})();
