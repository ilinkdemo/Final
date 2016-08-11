const sourcemaps = require('gulp-sourcemaps');
const gulp = require('gulp');
const del = require('del');

const tscConfig = require('./tsconfig.json');

var buildpath='./TicketsWeb/';
var publishpath = './TicketsWeb/Angular1.0'; 
// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('concat', function() {
    gulp.src(buildpath + 'App/**/*.js').pipe(concat('main.js')).pipe(gulp.dest(publishpath));
});


gulp.task('build', ['copy:assets','copy:libs','lint']);
gulp.task('default', ['build']);
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src([buildpath + 'App/**/*',buildpath +'index.html',buildpath + 'images/**/*', '!' + buildpath + 'App/**/*.ts','!' + buildpath + 'App/**/*.map',buildpath + 'css/**/*',buildpath + 'Style/**/*',buildpath + 'Scripts/**/*',buildpath + 'bin/**/*',buildpath + 'web.config',buildpath + 'packages.config'], { base : buildpath })
    .pipe(gulp.dest(publishpath))
});
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
    ])
    .pipe(gulp.dest(publishpath + 'lib'))
});


const jshint  = require('gulp-jshint');

gulp.task('lint', function() {
var __dirname=publishpath;
  return gulp.src(buildpath + 'App/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: __dirname + '/jshint-output.html',
      createMissingFolders : false  
    }));
});
