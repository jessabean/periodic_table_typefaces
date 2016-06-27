var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var modernizr   = require('gulp-modernizr');

gulp.task('modernizr', function() {
  gulp.src('./js/*.js')
    .pipe(modernizr())
    .pipe(gulp.dest("vendor/js/"))
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('browser-reload', function() {
  browserSync.reload();
});

gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

gulp.task('watch', function () {
    gulp.watch('_scss/**/*.scss', ['sass']);
    gulp.watch(['js/*.js', 'js/*.json'], ['browser-reload']);
    gulp.watch(['*.html', '_layouts/*.html', 'templates/*.html'], ['browser-reload']);
});


gulp.task('default', ['express', 'browser-sync', 'watch']);
