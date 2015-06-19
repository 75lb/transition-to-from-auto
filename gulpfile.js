var fs = require('fs');
var gulp = require('gulp');
var size = require('gulp-size');
var header = require('gulp-header');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
	return gulp.src([
			'test/*.js',
			'lib/*.js'
		])
		.pipe(jshint())
		.pipe(jshint.reporter())
});

gulp.task('build', function () {
	var pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
	return gulp.src('lib/*.js')
		.pipe(header([
			'/*!',
			' * <%= name %> <%= version %>',
			' * <%= homepage %>',
			' * Copyright <%= new Date().getFullYear() %> <%= author %>',
			' */\n\n'
		].join('\n'), pkg))
		.pipe(size({ showFiles: true }))
		.pipe(gulp.dest('dist'))
		.pipe(uglify({ preserveComments: 'some' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(size({ showFiles: true }))
		.pipe(gulp.dest('dist'))
});

gulp.task('dev', function () {
	gulp.start('build');
	gulp.watch('lib/*.js', ['build'])
});

gulp.task('default', ['build']);
