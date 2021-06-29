const quality = 80; // 75 - 85

const { src, dest, series } = require('gulp'),
      del = require('del'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      ttf2woff = require('gulp-ttf2woff'),
      ttf2woff2 = require('gulp-ttf2woff2');


// =============================================================== fonts
const delFontFolder = () => {
  return del('./dist/font/');
}

const fontConvertWoff = () => {
  return src('./src/font/**/*')
    .pipe(ttf2woff())
    .pipe(dest('./dist/font/'))
}

const fontConvertWoff2 = () => {
  return src('./src/font/**/*')
    .pipe(ttf2woff2())
    .pipe(dest('./dist/font/'))
}


// =============================================================== imgs
const delImgFolder = () => {
  return del('./dist/img/')
}

const imgMin = () => {
  return src('src/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: quality,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      pngquant({
        speed: 5
      }),
      imagemin.svgo()
    ], {
      verbose: true
    }))
    .pipe(dest('dist/img/'))
}


// =============================================================== task
exports.imgMin = series(delImgFolder, imgMin);
exports.fontConvert = series(delFontFolder, fontConvertWoff, fontConvertWoff2);
