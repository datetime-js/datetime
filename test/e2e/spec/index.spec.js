(function () {
  'use strict';

  /**
   * ----------------------------------------------------------------------------------------
   * Configuration
   * ----------------------------------------------------------------------------------------
   */

  var test = createTestFn();

  DateTime.setTzdata(tzdata);

  /**
   * ----------------------------------------------------------------------------------------
   * Helpers
   * ----------------------------------------------------------------------------------------
   */

  function isArray (arg) {
    return {}.toString.call(arg) === '[object Array]';
  }

  function equalDateAttrs (attrsA, attrsB) {
    if (isArray(attrsA) && isArray(attrsB) && attrsA.length === attrsB.length) {
      for (var idx = 0, len = attrsA.length; idx < len; idx++) {
        if (attrsA[idx] !== attrsB[idx]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * ----------------------------------------------------------------------------------------
   * Specs
   * ----------------------------------------------------------------------------------------
   */

  function testGroup (group) {
    var caseIdx;
    var groupLen;

    function testDateToMoment (testCase) {
      test('[' + group.zone + '] Date to moment :: ' + testCase.date, function () {
        var properTimestamp = testCase.timestamp;

        DateTime.setDefaultTimezone(group.zone);

        var dt = new DateTime(testCase.date);

        ok(dt.valueOf() === properTimestamp);
      });
    }

    function testMomentToDate (testCase) {
      test('[' + group.zone + '] Moment to date :: ' + testCase.date, function () {
        var properTimestamp = testCase.timestamp;

        DateTime.setDefaultTimezone(group.zone);

        var dt = new DateTime(properTimestamp);
        var date = [
          dt.getYear(),
          dt.getMonth(),
          dt.getDayOfMonth(),
          dt.getHour(),
          dt.getMinute(),
          dt.getSecond(),
          dt.getMillisecond()
        ];

        ok(equalDateAttrs(date, testCase.date));
      });
    }

    // Date to moment
    for (caseIdx = 0, groupLen = group.dateArray.length; caseIdx < groupLen; caseIdx++) {
      testDateToMoment(group.dateArray[caseIdx]);
    }

    // Moment to date
    for (caseIdx = 0, groupLen = group.dateArray.length; caseIdx < groupLen; caseIdx++) {
      testMomentToDate(group.dateArray[caseIdx]);
    }

    // Formatted string to date
    function testStringToDate (testCase) {
      test('[' + group.zone + '] String to date :: ' + testCase.dateStr, function () {
        DateTime.setDefaultTimezone(group.zone);

        var dt = new DateTime(testCase.dateStr);
        var date = [
          dt.getYear(),
          dt.getMonth(),
          dt.getDayOfMonth(),
          dt.getHour(),
          dt.getMinute(),
          dt.getSecond(),
          dt.getMillisecond()
        ];

        ok(date.toString() === testCase.date.toString());
      });
    }

    // Tests all formats
    for (var groupKey in group) {
      if ({}.hasOwnProperty.call(group, groupKey)) {
        if (groupKey !== 'dateArray' && groupKey !== 'zone') {
          var cases = group[groupKey];
          for (caseIdx = 0, groupLen = cases.length; caseIdx < groupLen; caseIdx++) {
            if (cases[caseIdx].dateStr.match(/00$/)) {
              testStringToDate(cases[caseIdx]);
            }
          }
        }
      }
    }
  }

  for (var groupIdx = 0, groupLen = testData.length; groupIdx < groupLen; groupIdx++) {
    testGroup(testData[groupIdx]);
  }
})();
