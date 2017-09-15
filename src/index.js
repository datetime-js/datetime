import DateTime from './DateTime';
import { extend } from './utils';

import localeEn from './locale/en';

import Duration from './duration/Duration';
import Interval from './interval/Interval';

import Second from './calendar/Second';
import Minute from './calendar/Minute';
import Hour from './calendar/Hour';
import Day from './calendar/Day';
import Week from './calendar/Week';
import Month from './calendar/Month';
import MonthWeeks from './calendar/MonthWeeks';
import Year from './calendar/Year';

extend(DateTime, {
  Day,
  Duration,
  Hour,
  Interval,
  Minute,
  Month,
  MonthWeeks,
  Second,
  Week,
  Year
});

DateTime.defineLocale('en', localeEn);

export default DateTime;
