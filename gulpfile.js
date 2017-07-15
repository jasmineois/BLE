const babelify = require('babelify')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const gulp = require('gulp');
const browserSync = require('browser-sync').create()
const eslint = require('gulp-eslint')


gulp.task('ts', function () {
    return browserify({debug: false})
        .add('./src/app.ts')
        .plugin('tsify', {
            noImplicitAny: true,
            removeComments: true
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('es6', function () {
    browserify({entries: 'es6/app.es6', debug: true})
        .transform(babelify)
        .bundle()
        .on('error', err => console.log('Error : ' + err.message))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('lint', () => {
  return gulp.src(['js/**/*.es6','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', () => {
    gulp.run(['es6', 'lint']);
    gulp.watch('**/*.ts', ['ts']);
    gulp.watch('**/*.es6', ['es6', 'lint']);
});