"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var pug = require("gulp-pug");
var del = require("del");
var server = require("browser-sync").create();


gulp.task("symbols", function() {
  return gulp.src("img/svg/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("../build/img"));
});


gulp.task("images", function() {
  return gulp.src("/img/**/*.{png, jpg, gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("../build/img"));
});


gulp.task("clean", function() {
  return del("../build", {force: true});
});


gulp.task("copy", function() {
  return gulp.src([
    "fonts/**",
    "img/**",
    "js/**",
    "css/**"
    ], {
      base: "."
    })
  .pipe(gulp.dest("../build"));
});



gulp.task('html', function buildHTML() {
  return gulp.src("pug/*.pug")
  .pipe( pug({ pretty: true }) )
  .pipe( gulp.dest("../build") );
});


gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version"
        ]}),
      mqpacker ({
        sort: true
        })
      ]))
    .pipe(gulp.dest("../build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("../build/css"))
    .pipe(server.reload({stream: true}));
});


gulp.task("js", function() {
  return gulp.src("js/*.js")
    .pipe( gulp.dest("../build/js") );
});


gulp.task("serve", function() {
  server.init(["css/*.css", "*.html"], {
    server: "../build",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    reloadOnRestart: true
  });


  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("js/**/*.js", ["js"]);
  gulp.watch("pug/**/*.pug", ["html"]).on("change", server.reload);
});


gulp.task("build", function(fn) {
  run("clean", "copy", "html", "style", "images", "symbols", fn);
});