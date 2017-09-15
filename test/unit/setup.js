'use strict';

/**
 * ------------------------------------------------------------------------------------------
 * Expose DateTime to globals
 * ------------------------------------------------------------------------------------------
 */

const distPath = '../../dist';
const nodeModulesPath = '../../node_modules';

const localeRu = require(`${nodeModulesPath}/datetime2-locale-ru/ru`);

global.DateTime = require(`${distPath}/datetime`);
global.tzdata = require(`${nodeModulesPath}/datetime2-tzdata/tzdata/2017a/js/2017a-all`);

DateTime.setTzdata(tzdata);
DateTime.defineLocale('ru', localeRu);
