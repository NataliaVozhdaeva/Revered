const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');

function browsersync() {
  browserSync.init({
    server: 'src/',
    notify: false,
  });
}

function buildSass() {
  return src('src/styles/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(dest('src/styles'))
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
}

function html() {
  return src('src/**/*.html').pipe(browserSync.stream()).pipe(dest('dist/'));
}

function copyimg() {
  return src('src/assets/**/*.*').pipe(dest('dist/assets/'));
}

function copyFavicon() {
  return src('src/favicon.ico').pipe(dest('dist/'));
}

function cleanDist() {
  return del('dist/**/*', { force: true });
}

function buildJs() {
  return src('src/main.js').pipe(browserSync.stream()).pipe(dest('dist'));
}

function serve() {
  watch('src/**/*.scss', buildSass);
  watch('src/**/*.html', html);
  watch(['src/*.js', '!src/js/**/*.min.js'], buildJs);
}

exports.clean = series(cleanDist);
exports.build = series(cleanDist, buildSass, buildJs, html, copyimg, copyFavicon);
exports.default = series([cleanDist, buildSass, buildJs], parallel(browsersync, serve));
