const {src, dest, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });  
  watch("./*.html").on("change", browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch('./css/*.css').on("change", browserSync.reload);
 /* watch('./css/*.css').on("change", cssmin);*/
  watch('./js/*.js').on("change", browserSync.reload);  
};

function cssmin() {  
  return src("./css/style.css")
      .pipe(cssnano())
      .pipe(rename({suffix: ".min"}))
      .pipe (dest("./css"));
};

function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: true,
        browsers: ['last 14 versions']
      }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};

function buildCSS(done) {
  src('css/**/**.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('dist/css/'));
  done();
};

function buildJS(done) {
  src(['js/**.js', '!js/**.min.js'])
  .pipe(minify(
    {
      ext:{
          min:'.js'
      },
      noSource: true
    }))
  .pipe(dest('dist/js/'));

  src('js/**.min.js')
  .pipe(dest('dist/js/'));
  done();
};

function html(done) {
  src('**.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
  done();  
};

function php(done) {
  src(['**.php'])
    .pipe(dest('dist/'));
  src('phpmailer/**/**')  
    .pipe(dest('dist/phpmailer/'))
  done();  
};

function font(done) {
  src('font/**/**')
    .pipe(dest('dist/font/'));
  done();  
};

function imagemin(done) {
  
  src('img/**/*.jpg')
    .pipe(tinypng({ key: '4sy4yB3GhKqXb0hLLzFPr4lB8KKkVj5X', }))
    .pipe(dest('dist/img/'))   
  src('img/**/*.png')
    .pipe(tinypng({ key: '4sy4yB3GhKqXb0hLLzFPr4lB8KKkVj5X', }))
    .pipe(dest('dist/img/'))   
  src('img/**/*.svg')  
    .pipe(dest('dist/img/'))
  done();  
};

exports.serve = bs;
exports.build = series(buildCSS, buildJS, html, php, font, imagemin);
exports.serveSass = serveSass;
exports.buildCSS = buildCSS;
exports.buildJS = buildJS;
exports.html = html;