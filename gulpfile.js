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
  img: "./src/img/*",
  dist: "./dist",
  sassDest: "./dist/css",
  imgDest: "./dist/img",
};

function sassCompiler(done) {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest));
  done();
}

function startBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  done();
}

function watchForChanges(done) {
  watch("./*.html").on("change", reload);
  watch([paths.html, paths.sass], parallel(sassCompiler)).on("change", reload);
  done();
}

const mainFunctions = parallel(sassCompiler);
exports.cleanStuff = cleanStuff;
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
