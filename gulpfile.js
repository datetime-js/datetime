'use strict';

const buble = require('rollup-plugin-buble');
const exec = require('child_process').exec;
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const rollup = require('rollup');
const sizereport = require('gulp-sizereport');
const uglify = require('gulp-uglify');

const getBanner = ctx => (
`/**
 * datetime2
 * Version: ${ctx.version}
 * Author: ${ctx.author}
 * License: MIT
 * https://github.com/datetime-js/datetime
 */`
);

/**
 * -------------------------------------------------------------------------------------
 * Builds datetime
 * -------------------------------------------------------------------------------------
 */

gulp.task('build', callback => {
  const pkg = require('./dist/package.json');

  const options = {
    entry: './src/index.js',
    plugins: [
      buble()
    ]
  };

  rollup.rollup(options)
    .then(bundle => {
      const result = bundle.generate({
        banner: getBanner(pkg),
        format: 'umd',
        moduleName: 'DateTime'
      });

      fs.writeFileSync('./dist/datetime.js', result.code);

      callback(null);
    })
    .catch(callback);
});

/**
 * -------------------------------------------------------------------------------------
 * Creates minified version
 * -------------------------------------------------------------------------------------
 */

gulp.task('min', () =>
  gulp.src('./dist/datetime.js')
    .pipe(uglify({
      mangle: true,
      preserveComments: 'license'
    }))
    .pipe(rename('datetime.min.js'))
    .pipe(gulp.dest('dist/'))
);

/**
 * -------------------------------------------------------------------------------------
 * Prints report about file size
 * -------------------------------------------------------------------------------------
 */

gulp.task('report', () =>
  gulp.src('dist/*.js')
    .pipe(sizereport({
      gzip: true,
      total: false
    }))
);

/*
 * -------------------------------------------------------------------------------------
 * Creates the target directory
 * -------------------------------------------------------------------------------------
 */

gulp.task('target', cb => {
  exec('mkdir -p ./dist', err => cb(err));
});

/*
 * -------------------------------------------------------------------------------------
 * Default task
 * -------------------------------------------------------------------------------------
 */

gulp.task('default', ['build']);
