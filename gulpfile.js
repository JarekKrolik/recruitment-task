const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const paths = {
  sass: "./src/sass/**/*.scss",
  dist: "./dist",
  sassDest: "./dist/css",
};

const sassCompiler = (done) => {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest));
  done();
};

const startBrowserSync = (done) => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  done();
};

const watchForChanges = (done) => {
  watch("./*.html").on("change", reload);
  watch([paths.sass], parallel(sassCompiler)).on("change", reload);
  done();
};

exports.default = series(sassCompiler, startBrowserSync, watchForChanges);
