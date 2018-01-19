var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    del = require('del');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'piroll_land'
        },
        notify: false
    });
});

gulp.task('sass', function () {
    gulp.src('./piroll_land/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./piroll_land/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './piroll_land/js/main.js'
    ])
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./piroll_land/js'));
});

gulp.task('clean', function () {
   return del.sync('prod');
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
    gulp.watch('./piroll_land/**/*.scss', ['sass']);
    gulp.watch('./piroll_land/*.html', browserSync.reload);
    gulp.watch('./piroll_land/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts'], function () {
    var buildcss = gulp.src('./piroll_land/css/style.css')
        .pipe(gulp.dest('prod/css'));

    var buildFonts = gulp.src('./piroll_land/fonts/**/*')
        .pipe(gulp.dest('prod/fonts'));

    var buildJs = gulp.src('./piroll_land/js/application.min.js')
        .pipe(gulp.dest('prod/js'));

    var buildHtml = gulp.src('./piroll_land/index.html')
        .pipe(gulp.dest('prod'));

    var buildImg = gulp.src('./piroll_land/img/**/*')
        .pipe(gulp.dest('prod/img'));
});