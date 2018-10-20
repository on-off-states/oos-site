const gulp = require('gulp'),
	  postcss = require("gulp-postcss"),
      // import postcss from 'gulp-postcss';
      autoprefixer = require("autoprefixer"),
      customProperties =  require("postcss-custom-properties"),
      // import postcssNested from 'postcss-nested';
      postcssNested = require("postcss-nested"),
      postcssMixins = require('postcss-mixins'),
      postcssImport = require("postcss-import");

gulp.task('styles', function() {
	// need return because gulp.src is asynchonous function 
	// https://jakearchibald.com/2017/await-vs-return-vs-return-await/
	return gulp.src('./app/assets/css/style.css')
	// run src file through postcss filters pipe
	 .pipe(postcss([postcssImport(), postcssMixins(), customProperties(), postcssNested(), autoprefixer()]))
	 // catch errors
	 .on('error', function(errorInfo) {
	 	// console.log(errorInfo.toString());
	 	this.emit('end');
	 })
	 // pipe to destination
	 .pipe(gulp.dest('./app/dev/css'));
	 
});