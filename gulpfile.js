var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('scripts', function(){
    gulp.src([
        './node_modules/angular.min.js',
        './src/*.js',
        './src/app/**/*.js'
    ])
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function() {
    gulp.src([
        "./src/styles/*.scss",
        "./node_modules/bootstrap/scss/*.scss"
    ])
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"));
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

    gulp.watch("./src/styles/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./*.html", ['html']).on('change', browserSync.reload);
    gulp.watch("./src/app/*.js", ['scripts']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);