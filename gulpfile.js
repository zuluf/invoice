(function (process, require) {
	var gulp, less, css, rename, task;

	if (typeof process === "undefined" || typeof require === "undefined") {
		throw "The whole thing went up in flames";
	}

	/**
	 * Require necessary tools
	 */
	gulp = require('gulp');
	less = require('gulp-less');
	css = require('gulp-minify-css');
	rename = require('gulp-rename');

	/**
	 * Get the task name
	 */
	task = (process.argv[2] || null);

	/**
	 * Gulp Less task for building the app css files
	 * Function converts less to minified css
	 */
	gulp.task('less', function() {
		return gulp.src(['assets/less/main.less'])
			.pipe(less())
			.pipe(css())
			.pipe(rename('app.min.css'))
			.pipe(gulp.dest('assets/dist'));
	});

	/**
	 * Gulp Live task for building the app css and js distribution
	 */
	gulp.task('live', function() {
		gulp.watch('assets/less/**/*.less', ['less']);
	});

	/**
	 * Register default gulp tasks
	 */
	gulp.task('build', ['less']);
	gulp.task('default', ['build']);

	/**
	 * If the process argument is not a registered gulp task, throw exception to terminate the process
	 */
	if (task && !gulp.hasTask(task)) {
		throw "Gulp task '" + task + "' not registered";
	}
})(process, require);