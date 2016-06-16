var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cp          = require('child_process');
var prefix      = require('gulp-autoprefixer');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

// gulp.task('sass', function () {
//     return gulp.src('_scss/main.scss')
//         .pipe(sass({
//             includePaths: ['scss'],
//             onError: browserSync.notify
//         }))
//         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//         .pipe(gulp.dest('_site/css'))
//         .pipe(browserSync.reload({stream:true}))
//         .pipe(gulp.dest('css'));
// });

gulp.task('watch', function () {
    // gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});


gulp.task('default', ['browser-sync', 'watch']);
