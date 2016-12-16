const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cache = require('gulp-cached');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const { execCommand } = require('./scripts/helpers');

gulp.task('build:sass', (cb) => {
    return gulp.src('./styles/**/*.scss')
        .pipe(cache('sass'))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('orotter.css'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('build:styleguide', (cb) => {
    setTimeout(() => {
    execCommand('npm run styleguide')
        .catch(err => console.error(err))
        .then(cb);
    }, 0);
});

gulp.task('serve', ['build:sass', 'build:styleguide'], () => {
    browserSync.init({
        server: './styleguide',
        serveStatic: [{
            route: '/css',
            dir: 'css'
        }]
    });

    gulp.watch(['./styles/**/*.scss'], () => {
        runSequence('build:sass');
    });
    gulp.watch(['./styles/**/*.scss'], ['build:styleguide']);
});