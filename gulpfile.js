var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('scripts', function(){
    gulp.src([
        './node_modules/angular.min.js',
        './src/app.js',
        './src/components/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function() {
    gulp.src("./src/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist"));
});

gulp.task('html', function() {
    gulp.src("./*.html")
    .pipe(gulp.dest("./dist"));
});

gulp.task('serve', ['sass','scripts','html'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./src/*.scss", ['sass']);
    gulp.watch("./*.html", ['html']).on('change', browserSync.reload);
    gulp.watch("./src/components/*.js", ['scripts']).on('change', browserSync.reload);
    gulp.watch("./src/*.js", ['scripts']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);