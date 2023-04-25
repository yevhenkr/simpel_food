const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require("browser-sync").create();
const svgSprite = require('gulp-svg-sprite');
const ttf2woff2 = require('gulp-ttf2woff2');
const fileInclude = require('gulp-file-include');
const cleanCSS = require('gulp-clean-css');

function libsCSS() {
  return src([
    'node_modules/lightgallery/css/lightgallery.css',
    'node_modules/lightgallery/css/lg-pager.css',
    'node_modules/starry-rating/dist/starry.css',
    'node_modules/nouislider/dist/nouislider.css',
    'node_modules/swiper/swiper-bundle.css'
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('app/css'));
}

function libsJS() {
  return src([
    'node_modules/lightgallery/lightgallery.min.js',
    'node_modules/lightgallery/plugins/pager/lg-pager.min.js',
    'node_modules/starry-rating/dist/starry.min.js',
    'node_modules/nouislider/dist/nouislider.min.js',
    'node_modules/swiper/swiper-bundle.min.js'

  ])
    .pipe(concat('libs.min.js'))
    .pipe(dest('app/js'));
}

function svgSprites() {
  return src('app/images/icons/*.svg') // выбираем в папке с иконками все файлы с расширением svg
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', // указываем имя файла спрайта и путь
          },
        },
      })
    )
    .pipe(dest('app/images')); // указываем, в какую папку поместить готовый файл спрайта
}

function convertFonts() {
  return src('app/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'));
}

const htmlInclude = () => {
  return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы													
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
    }))
    .pipe(dest('app')) // указываем, в какую папку поместить готовый файл html
    .pipe(browserSync.stream());
}

function browsersync() {//место для сервера
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function build() {
  return src([
    "app/*.html",
    "app/favicon/**/*.*",
    "app/fonts/**/*.*",
    "app/css/*.css",
    "app/js/*.js",
    "app/images/**/*.*"
  ], { base: "app" })
    .pipe(dest("dist"))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/html/**/*.html'], htmlInclude);
  watch(['app/scss/**/*scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/images/icons/*.svg'], svgSprites);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.htmlInclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.convertFonts = convertFonts; //add to exports.default once for convert
exports.images = images;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites; libsJS
exports.libsCSS = libsCSS;
exports.libsJS = libsJS;
exports.build = series(cleanDist, build);

exports.default = parallel(htmlInclude, svgSprite, styles, scripts, browsersync, watching);