var gulp = require('gulp');
var ts = require('gulp-typescript');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
var del = require('del');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    return del([
        'pub/*'
    ]);
});

gulp.task('copy', function () {
    return gulp.src(['src/**/*', '!src/{ts,ts/**}'])
        .pipe(gulp.dest('pub'));
});

gulp.task('build-ts', function () {
    return gulp.src('src/ts/**/*.{ts,tsx}')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('pub/js'));
});

gulp.task('build', ['copy', 'build-ts']);

gulp.task('watch', function () {
    gulp.watch('src/ts/**/*.{ts,tsx}', ['build-ts']);
    gulp.watch(['src/**/*', '!src/**/*.{ts,tsx}'], ['copy']);
});

gulp.task('webserver', function () {
    return gulp.src('pub')
        .pipe(webserver({
            port: 8080
        }));
});

gulp.task('db', shell.task("pouchdb-server"));

gulp.task('rebuild', ['clean'], function () {
    return gulp.start('build');
});

gulp.task('default', ['rebuild']);

gulp.task('dev', ['rebuild', 'watch'], function () {
    return gulp.start('webserver');
});
