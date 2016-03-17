// Include gulp and plugins
var gulp    = require('gulp'); 
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var clean       = require('gulp-clean');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var merge       = require('merge-stream');

// Clean dist folder
gulp.task('clean',function() {
    return gulp.src(
        ['dist'],{read:false})
        .pipe(clean());
});

gulp.task('copy',['clean'],function() {
    var app = gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist'));

    var bower = gulp.src([
            'bower_components/*',
            'bower_components/**/*',
            'bower_components/**/**/**/*',
            'bower_components/**/**/**/**/*'
        ])
        .pipe(gulp.dest('dist/bower_components'));

    var node_modules = gulp.src(['node_modules/*',])
        .pipe(gulp.dest('dist/node_modules'));

    var angular = gulp.src(['src/app/*'])
        .pipe(gulp.dest('dist/app'));

    var data = gulp.src(['src/data/*'])
        .pipe(gulp.dest('dist/data'));

    return merge(app,bower,node_modules,angular,data);
});

// Watch files for changes and reload
gulp.task('serve',function() {
    browserSync({
        port: 3000,
        notify: false,
        logPrefix: 'PSK',
        server: {
            baseDir: ['dist'],
        }
    });

    gulp.watch(['src/*.html'], reload);
    gulp.watch(['src/sass/*.scss'], ['styles', reload]);
    gulp.watch(['src/css/*.css'], ['elements', reload]);
    gulp.watch(['src/scripts/*.js','src/*.html}'], ['jshint']);
    gulp.watch(['src/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
    browserSync({
        port: 3001,
        notify: false,
        logPrefix: 'PSK',
        server: 'dist',
        middleware: [ historyApiFallback() ]
    });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css/style.css'));
});

// Default Task
gulp.task('default', ['copy','serve']); // 'lint', 'watch'
