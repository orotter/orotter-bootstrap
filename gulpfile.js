const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cache = require('gulp-cached');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const discardComments = require('postcss-discard-comments');
const cssnano = require('cssnano');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const { execCommand } = require('./scripts/helpers');

gulp.task('sass', (cb) => {
    return gulp.src('./styles/orotter-bootstrap.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: [
                'node_modules',
            ],
        }).on('error', sass.logError))
        .pipe(postcss([
            discardComments(),
            autoprefixer({ browsers: ['last 2 versions'] }),
        ]))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:min', (cb) => {
    return gulp.src('./styles/orotter-bootstrap.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: [
                'node_modules',
            ],
        }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({ browsers: ['last 2 versions'] }),
            cssnano(),
        ]))
        .pipe(rename('orotter-bootstrap.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch:sass', ['sass'], (cb) => {
    return gulp.watch(['./styles/**/*.scss'], ['sass']);
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