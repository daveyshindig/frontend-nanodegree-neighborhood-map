var gulp = require('gulp');
var gutil = require('gutil');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

// Command line option:
//  --fatal=[warning|error|off]
var fatalLevel = require('yargs').argv.fatal;
 
var ERROR_LEVELS = ['error', 'warning'];
 
// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
   return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}
 
// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
   gutil.log(error.message);
   if (isFatal(level)) {
      process.exit(1);
   }
}

// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}
// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);} 

// Copy HTML
gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(gulp.dest('dist'));
});

// Copy Imgs
gulp.task('img', function() {
	return gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

// Copy Lib
gulp.task('lib', function() {
	return gulp.src('lib/*')
		.pipe(gulp.dest('dist/lib'));
});

// Linting
gulp.task('lint', function() {
	return gulp.src('js/*.js')
			   .pipe(jshint({lookup: false, globals: false}))
			   .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('js/*.js')
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Minify CSS
gulp.task('css', function() {
	return gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
		.on('error', onError)
		.on('warning', onWarning);
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint', 'scripts']);
});

gulp.task('default', ['html', 'img', 'lib', 'lint', 'scripts', 'css']);