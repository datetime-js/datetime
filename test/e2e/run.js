'use strict';

const chalk = require('chalk');
const path = require('path');
const shell = require('shelljs');
const qunit = require('qunit');

const args = Array.prototype.slice.call(process.argv, 2);

const tzdataVersion = args[0];
const zoneName = args[1];

const skipVersionLog = args.indexOf('--skip-tzdata-version-info') !== -1;
const withCoverage = args.includes('--coverage');

/**
 * ----------------------------------------------------------------------------------------
 * Validate arguments
 * ----------------------------------------------------------------------------------------
 */

const tip = 'npm run e2e -- <tzdata version> <timezone name|"all">';

if (!tzdataVersion) {
  console.log(chalk.red('Tzdata version is required'));
  console.log(tip);
  process.exit(2);
}

if (!zoneName) {
  console.log(chalk.red('Timezone name is required'));
  console.log(tip);
  process.exit(2);
}

/**
 * ----------------------------------------------------------------------------------------
 * Load tzdata
 * ----------------------------------------------------------------------------------------
 */

const tzdataKey = (zoneName && zoneName !== 'all')
  ? zoneName
  : `${tzdataVersion}-all`;

const tzdataPath = path.resolve(__dirname, `../../node_modules/datetime2-tzdata/tzdata/${tzdataVersion}/js/${tzdataKey}`);
let tzdata;

try {
  tzdata = require(tzdataPath);
} catch (ex) {
  console.log(chalk.red(`Could not find "${tzdataPath}"`));
  process.exit(2);
}

global.tzdata = tzdata;

if (!skipVersionLog) {
  console.log(chalk.blue(`Tzdata ${tzdataVersion}`));
}

/**
 * ------------------------------------------------------------------------------------------
 * All timezones
 * ------------------------------------------------------------------------------------------
 */

const testAllZones = zones => {
  let current = 0;
  const total = zones.length;

  console.log(`Run tests for all ${total} timezones\n`);

  const runTest = () => {
    const zone = zones.shift();
    if (zone) {
      current = current + 1;

      const cmd = `node test/e2e/run.js ${tzdataVersion} ${zone} --skip-tzdata-version-info`;

      console.log(chalk.blue(`[${current}/${total}] ${zone}`));

      shell.exec(cmd, {}, (code, output) => {
        if (code !== 0) {
          process.stdout.write(chalk.red(output));
          process.exit(2);
        }
        console.log('');
        runTest();
      });
    }
  };

  runTest();
};

if (zoneName === 'all') {
  testAllZones(Object.keys(tzdata.zones));
  // eslint-disable-next-line no-use-before-define
  return;
}

/**
 * ----------------------------------------------------------------------------------------
 * Configuration
 * ----------------------------------------------------------------------------------------
 */

qunit.setup({
  coverage: withCoverage,
  log: {
    coverage: withCoverage,
    errors: true,
    summary: false
  },
  maxBlockDuration: 1000000
});

/**
 * ----------------------------------------------------------------------------------------
 * Test single timezone
 * ----------------------------------------------------------------------------------------
 */

const zoneTzdata = tzdata.zones[zoneName];

// Zone is required
if (!zoneTzdata) {
  console.log(chalk.red(`Timezone ${zoneName} not found in tzdata`));
  process.exit(2);
}

console.log(chalk.blue(`Test ${zoneName}`));

qunit.run({
  deps: [
    `test/e2e/setup.js`,
    `node_modules/datetime2-tzdata/tzdata/${tzdataVersion}/js/${tzdataVersion}-all.js`,
    `test/e2e/spec/reference/${tzdataVersion}/${zoneName}.js`,
    `test/lib/utils/qunit-extend.js`
  ],
  code: 'dist/datetime.js',
  tests: [
    'test/e2e/spec/index.spec.js'
  ]
}, (err, report) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log(chalk.green(`${report.passed} tests passed`));
});
