let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let less = require('gulp-less');
let autoprefixer = require('gulp-autoprefixer');
let livereload = require('gulp-livereload');
let replace = require('gulp-replace');
let imagemin = require('gulp-imagemin');
let plumber = require('gulp-plumber');

let basePath = 'src';
let outPath = 'dist';

gulp.task('less', function () {
    return gulp.src(`src/less/main.less`)
        .pipe(sourcemaps.init())
		.pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${outPath}/css`));
});

gulp.task('html', function () {
    return gulp.src(`${basePath}/*.html`)
        .pipe(replace('less', 'css'))
        .pipe(gulp.dest(`${outPath}`));
});

gulp.task('js', function () {
    return gulp.src(`${basePath}/javascripts/*.js`)
        .pipe(gulp.dest(`${outPath}/javascripts`));
});

gulp.task('imagemin', function () {
    return gulp.src(`${basePath}/images/*.{png, jpg, gif, ico}`)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest(`${outPath}/images`));
});

gulp.task('default', ['less', 'html', 'imagemin'], function () {
    gulp.watch(`${basePath}/less/**/*.less`, ['less']);
    gulp.watch(`${basePath}/*.html`, ['html']);
});
