/*
	Gulp shik v2.5

	Ilya Komichev
	ilko.me
*/


// ==============================================
//	#modules
// ==============================================
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var customwatch = require('gulp-watch');
var notify = require("gulp-notify");


// ==============================================
//	#paths
// ==============================================
var paths = {
	root: 'site/',
	css: 'site/css',
	js: 'site/js/*.js',
	sources: {
		jade: {
			src: 'source/jade/*.jade',
			inc: 'source/jade/_*.jade',
			excl: '!source/jade/_*.jade',
		},
		stylus: {
			src: 'source/styl/*.styl',
			inc: 'source/styl/_*.styl',
			excl: '!source/styl/_*.styl',
		}
	}
}


// ===============================================
//	#server
// ===============================================
gulp.task('webserver', function () {
	connect.server({
		port: '8080',
		root: paths.root,
		livereload: true
	});
});



// ==============================================
//	#watch
// ==============================================
gulp.watch([paths.sources.jade.inc], ['jade']);
gulp.watch([paths.sources.stylus.inc], ['stylus']);


//	#gulp-watch
// =====================
gulp.task('customwatch', function() {

	//	#stylys
	// =====================
	customwatch([paths.sources.stylus.src, paths.sources.stylus.excl])
		.pipe(plumber())
		.pipe(stylus())
		.pipe(prefix())
		.pipe(gulp.dest(paths.css))
		.pipe(connect.reload())

	//	#jade
	// =====================
	customwatch([paths.sources.jade.src, paths.sources.jade.excl])
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(paths.root))
		.pipe(connect.reload())

	// #JavaScript
	// =====================
	customwatch([paths.js])
		.pipe(plumber())
		.pipe(connect.reload())
})



// ==============================================
//	#tasks
// ==============================================

//	#stylus
// =====================
gulp.task('stylus', function () {
	gulp.src([paths.sources.stylus.src, paths.sources.stylus.excl])
		.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
		.pipe(stylus())
		.pipe(prefix())
		.pipe(gulp.dest(paths.css))
		.pipe(connect.reload())
});

// 	#jade
// =====================
gulp.task('jade', function() {
	gulp.src([paths.sources.jade.src, paths.sources.jade.excl])
		.pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(paths.root))
		.pipe(connect.reload())
});



// ==============================================
//	#run-tasks
// ==============================================
gulp.task('default', ['webserver', 'customwatch', 'jade', 'stylus']);
