# Test

## Unit tests

#### Browser environment

Open [test/unit/index.html](./test/unit/index.html) page in the browser.

Tests should work in any ES3-compliant browser starting from IE 5.5, Safari 3, and FF 2.


#### NodeJS environment

Run unit tests:

```
npm run unit
```

Run unit tests and generate code coverage report:

```
npm run cov
```

This command runs the unit tests, then prints the code coverage report
into the stdout, and writes it also into a [coverage](./coverage) directory.

## E2E tests

E2E tests run against pre-defined reference collection of dates.

### Prerequisites

To run E2E tests first you need to generate them:

    npm run gen -- --version <tzdata_version> --timezone <timezone_name>

where ``<tzdata_version>`` is the version of tzdata, and ``<timezone_name>``
is the name of timezone.

Examples:

    # Generate test dates for Europe/Amsterdam
    npm run gen -- --version 2017a --timezone Europe/Amsterdam

    # Generate test dates for all timezones
    npm run gen -- --version 2017a --timezone all

Generated references will be saved in `test/e2e/spec/reference` directory.

NOTE: On Macbook Pro it takes **1 hour** to generate all the test references, and **4 hours**
to run the tests. Generated test references take **7 GB** of disk space.

### Run in browser

Open [test/e2e/index.html](test/e2e/index.html) in browser and select a timezone
in the navigation menu.

Tests should work in any ES3-compliant browser starting from IE 5.5, Safari 3, and FF 2.

### Run in node

Run the following command to run E2E tests for specific timezone:

```
npm run e2e -- 2017a Europe/Amsterdam
```

Replace _2017a_ and _Europe/Amsterdam_ with needed tzdata version and timezone name.

NOTE: Code coverage is not available for E2E tests.
