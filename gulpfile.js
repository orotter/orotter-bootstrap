const gulp = require('gulp');
const fs = require('fs');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const autoprefixer = require('autoprefixer');
const discardComments = require('postcss-discard-comments');
const styleGuide = require('postcss-style-guide');
const cssnano = require('cssnano');
const cheerio = require('cheerio');
const browserSync = require('browser-sync').create();
const event = process.env.npm_lifecycle_event || '';
const isRunningSites = event.includes('sites');

// Extra styles to apply styleguide page.
// TODO: move seperate file and importing it
const extraStyles = `
html {
    overflow-y: hidden;
}
code {
    font-family: 'Inconsolata', 'Consolas', monospace !important;
}
.cf:before,
.cf:after {
    content: " ";
    display: table;
}
.cf:after {
    clear: both;
}
.box + .box {
    padding-top: 40px;
    border-top: 1px solid #f1f1f1;
}
`;

gulp.task('sass', (cb) => {
    return gulp.src('./scss/orotter-bootstrap.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: [
                'node_modules',
            ],
        }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({ browsers: ['last 2 versions'] }),
        ]))
        .pipe(gulpif(!isRunningSites,
            postcss([
                styleGuide({
                    project: 'oRotter bootstrap',
                    dest: 'styleguide/index.html',
                    theme: 'psg-theme-sassline',
                    themePath: 'node_modules/psg-theme-sassline'
                })
            ])
        ))
        .pipe(postcss([
            discardComments(),
        ]))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('sass:min', (cb) => {
    return gulp.src('./scss/orotter-bootstrap.scss')
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
    return gulp.watch(['./scss/**/*.scss'], ['sass']);
});

gulp.task('styleguide', ['sass'], (cb) => {
    browserSync.init({
        server: './styleguide',
        middleware: [
            {
                route: '/',
                handle: function(req, res, next) {
                    // Control some contents of the styleguide html.
                    const indexHtml = fs.readFileSync('./styleguide/index.html', 'utf-8');
                    const $ = cheerio.load(indexHtml);
                    // Append custom css to the document.
                    $('head').append(`<style>${extraStyles}</style>`);
                    res.setHeader('Content-Type', 'text/html');
                    res.end($.html());
                }
            }
        ]
    });

    gulp.watch(['./scss/**/*.scss'], ['sass']);
});
