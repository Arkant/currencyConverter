/* eslint-disable no-undef */
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');


const path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/'
  },
  src: {
    html: 'src/index.html',
    js: 'src/js/**/*.js',
    style: 'src/styles/main.scss'
  }
};

gulp.task('index', function() {
  gulp.src(path.src.html)
    .pipe(htmlreplace({
      'css': 'css/main.css',
      'js': 'js/index.js'
    }))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('html', function() {
  gulp.src('src/js/components/templates/converter.html')
    .pipe(gulp.dest(path.build.html));
});

gulp.task('script', function() {
  return gulp.src([
    'src/js/index.js',
    'src/js/components/*.js',
    'src/js/routing/*.js',
    'src/js/directives/*.js'
  ])
    .pipe(concat('index.js'))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('script:build', function() {
  return gulp.src([
    'src/js/index.js',
    'src/js/components/converter.js',
    'src/js/components/converter.service.js',
    'src/js/components/converter.controller.js',
    'src/js/components/converter.filter.js',
    'src/js/directives/internetCheck.directive.js'
  ])
    .pipe(concat('index.js'))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('style', function() {
  gulp.src(path.src.style)
    .pipe(sass())
    .pipe(gulp.dest(path.build.css));
});

gulp.task('style:build', function() {
  gulp.src(path.src.style)
    .pipe(sass())
    .pipe(gulp.dest(path.build.css));
});


gulp.task('server', ['index', 'html', 'script', 'style'], function(done) {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    host: 'localhost',
    files: [path.build.html, path.build.js, path.build.css]
  });
  done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['index']).on('change', browserSync.reload);
  gulp.watch(path.src.html, ['html']).on('change', browserSync.reload);
  gulp.watch(path.src.style, ['style']).on('change', browserSync.reload);
  gulp.watch(path.src.js, ['script']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'server']);
gulp.task('build', ['index', 'html', 'script:build', 'style:build']);