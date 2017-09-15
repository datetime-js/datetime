'use strict';

const qunit = require('qunit');

/**
 * ----------------------------------------------------------------------------------------
 * Parse arguments
 * ----------------------------------------------------------------------------------------
 */

const args = Array.prototype.slice.call(process.argv, 2);
const withCoverage = args.includes('--coverage');

const specPath = 'test/unit/spec';

/**
 * ----------------------------------------------------------------------------------------
 * Prepare configuration
 * ----------------------------------------------------------------------------------------
 */

qunit.setup({
  coverage: withCoverage,
  log: {
    coverage: withCoverage,
    errors: true,
    summary: true
  },
  maxBlockDuration: 20000
});

/**
 * ----------------------------------------------------------------------------------------
 * Run tests
 * ----------------------------------------------------------------------------------------
 */

qunit.run({
  code: 'dist/datetime.js',
  deps: [
    'test/unit/setup.js',
    'test/lib/utils/qunit-extend.js',
    'test/lib/utils/utils.js'
  ],
  tests: [
    `${specPath}/clone.spec.js`,
    `${specPath}/create-instance.spec.js`,
    `${specPath}/format.spec.js`,
    `${specPath}/getters.spec.js`,
    `${specPath}/invalid.spec.js`,
    `${specPath}/is.spec.js`,
    `${specPath}/misc.spec.js`,
    `${specPath}/now.spec.js`,
    `${specPath}/parse.spec.js`,
    `${specPath}/setters.spec.js`,
    `${specPath}/timezone-default.spec.js`,
    `${specPath}/timezone-info.spec.js`,
    `${specPath}/transform.spec.js`,
    `${specPath}/transform-to.spec.js`,
    `${specPath}/duration/duration.spec.js`,
    `${specPath}/interval/interval.spec.js`,
    `${specPath}/calendar/second.spec.js`,
    `${specPath}/calendar/minute.spec.js`,
    `${specPath}/calendar/hour.spec.js`,
    `${specPath}/calendar/day.spec.js`,
    `${specPath}/calendar/week.spec.js`,
    `${specPath}/calendar/month.spec.js`,
    `${specPath}/calendar/month-weeks.spec.js`,
    `${specPath}/calendar/year.spec.js`,
    `${specPath}/locale.spec.js`,
    `${specPath}/locale/en.spec.js`,
    `${specPath}/locale/ru.spec.js`
  ]
});
