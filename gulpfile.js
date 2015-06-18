var gulp = require('gulp');
var size = require('gulp-size');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
	return gulp.src([
			'test/*.js',
			'src/*.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter())
});

gulp.task('build', function () {
	return gulp.src('src/*.js')
		.pipe(size({ showFiles: true }))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(size({ showFiles: true }))
		.pipe(gulp.dest('dist'))
});

gulp.task('dev', function () {
	gulp.start('build');
	gulp.watch('src/*.js', ['build'])
});

gulp.task('default', ['build']);
