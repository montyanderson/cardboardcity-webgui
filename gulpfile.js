var gulp = require("gulp"),
    less = require("gulp-less"),
    streamify = require("gulp-streamify"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    minify = require("gulp-minify-css"),
    source = require("vinyl-source-stream"),
    browserify = require("browserify"),
    path = require("path");

var paths = {
        styles: ["./assets/styles/*.less"],
        scripts: ["./assets/scripts/*.js"]
};

gulp.task("watch", function() {
    gulp.watch(paths.styles, ["styles"]);
    gulp.watch(paths.scripts, ["scripts"]);
});

gulp.task("styles", function() {
    return gulp.src("./assets/styles/main.less")
        .pipe(less({
            paths: [__dirname + "/assets/styles/"]
        }))
        .pipe(minify())
        .pipe(rename("bundle.css"))
        .pipe(gulp.dest("./public/"));
});

gulp.task("scripts", function() {
    return browserify("./assets/scripts/index.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(streamify(uglify()))
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("./public/"));
});

gulp.task("build", ["styles", "scripts"]);
gulp.task("dev", ["build", "watch"]);
