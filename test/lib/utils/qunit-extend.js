'use strict';

/**
 * ----------------------------------------------------------------------------------------
 * QUnit extras
 * ----------------------------------------------------------------------------------------
 */

var qunitTest = test;

function createTestFn () {
  return qunitTest;
}

/**
 * CommonJS module
 */
if (typeof exports === 'object') {
  module.exports = { createTestFn: createTestFn };
}

if (typeof global === 'object') {
  global.createTestFn = createTestFn;
}
