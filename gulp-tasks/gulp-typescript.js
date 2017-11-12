var gulp = require("gulp");
var typescript = require("gulp-typescript");
var uglify = require("gulp-uglify");

var tsConfig = {
  source : ["./src/**/*.ts"],
  destinationFolder : "./dist/",
  destinationFile : "MvcAjaxHelper.js"
};

function typescriptCompile() {
  var result = gulp.src(tsConfig.source).pipe(typescript({noImplicitAny : true, out : tsConfig.destinationFile}));
  return result.js.pipe(gulp.dest(tsConfig.destinationFolder));
};

function minifyCompilation() {
  gulp.src(tsConfig.destinationFolder + tsConfig.destinationFile).pipe(uglify()).pipe(gulp.dest(tsConfig.destinationFolder + "release/"));
}

function typescriptCompileDef() {
  var result = gulp.src(tsConfig.source).pipe(typescript({noImplicitAny : true, declaration : true}));
  return result.dts.pipe(gulp.dest(tsConfig.destinationFolder + "def/"));
}

gulp.task("typescript:debug", typescriptCompile);
gulp.task("typescript:release", minifyCompilation);
gulp.task("typescript:def", typescriptCompileDef);
