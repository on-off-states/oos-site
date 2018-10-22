const gulp = require("gulp"),
      watch = require("gulp-watch"),
      // only require specific browser sync method
      browserSync = require("browser-sync").create();


gulp.task('watch', function() {
	// create server and any other browser-sync settings
	browserSync.init({
		// notify: false,
		server: {
			baseDir: "app"
		}
	})
	// files/folders to watch for changes and task to run on change
	// auto refresh everytime html changed
	// technically, could just add second path to compiled css file to trigger reload on css change but browser-sync can auto inject new css into page WITHOUT FORCING REFRESH 
	watch('./app/index.html', function() {
		browserSync.reload();
	});
	watch('./app/assets/css/**/*.css', function() {
		gulp.start('cssInject');
	})
});
// css inject with browser-sync.stream method which makes available to browser whatever is piped into it
// second argument in square brackets is dependency task to run first
gulp.task('cssInject', ["styles"], function() {
	return gulp.src('./app/dev/css/style.css')
		.pipe(browserSync.stream()); 
});