let gulp				= require('gulp'),
	gulpConcat			= require('gulp-concat'),
	gulpAutoprefixer	= require('gulp-autoprefixer'),
	gulpFileInclude		= require('gulp-file-include'),
	gulpLess			= require('gulp-less'),
	gulpReplace			= require('gulp-replace'),
	browserSync			= require('browser-sync').create(),
	path				= require('path')

gulp.task('serve', function(done) {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})

	gulp.watch('assets/less/**/*.less', gulp.parallel('less'))
	gulp.watch('assets/vendor/**/*.css', gulp.parallel('vendor'))
	gulp.watch('template/**/*.html', gulp.parallel('html'))

	gulp.watch('*.html').on('change', browserSync.reload)
	gulp.watch('assets/css/*.css').on('change', browserSync.reload)
	gulp.watch('assets/js/*.js').on('change', browserSync.reload)

	done()
})

gulp.task('less', function(done) {
	gulp.src('./assets/less/**/*.less')
		.pipe( gulpConcat('Bundle.less'))
		.pipe( gulpLess({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe( gulpAutoprefixer({
			overrideBrowserslist: ['>1% in RU', 'ie 11'],
			grid: true,
			cascade: false
		}))
		.pipe( gulp.dest('./assets/css/'))

	done()
})

gulp.task('vendor', function(done) {
	gulp.src('./assets/vendor/**/*.css')
		.pipe( gulpConcat('Vendor.css'))
		.pipe( gulp.dest('./assets/css/'))

	done()
})

gulp.task('html', function(done) {
	gulp.src('./template/*.html')
		.pipe( gulpFileInclude({
			prefix: '@@',
			basepath: './template/'
		}))
		.pipe( gulpReplace('<img src="../../', '<img src="/'))
		.pipe( gulpReplace('<img src="../', '<img src="/'))
		.pipe( gulp.dest('./'))

	done()
})

gulp.task('default', gulp.parallel('less', 'html', 'serve'))