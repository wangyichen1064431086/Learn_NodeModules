const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const tmpDir = '.tmp';

gulp.task('html',() => {
  return gulp.src('d3/views/*.html')
    .pipe(gulp.dest(tmpDir))
    .pipe(browserSync.stream({once: true}));
});
gulp.task('js',() => {
  const DEST = '.tmp/js';
  return gulp.src('d3/myExercise/*.js')
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once: true}));;
});
gulp.task('static',() => {
  const DEST = '.tmp/static';
  return gulp.src('d3/material/*.*')
    .pipe(gulp.dest(DEST));
});
gulp.task('serve', gulp.series('static','html','js',() => {
  browserSync.init({
    server:{
      baseDir: [tmpDir],
      index:'d3-demo.html',
      routes:{
        '/js/':'js/'
      }
    },
    port:9000,
    files:['d3/material']
  });
  gulp.watch('d3/Tutorials/*.js',gulp.parallel('js'));
  gulp.watch('d3/myExercise/*.js',gulp.parallel('js'));
  gulp.watch('d3/material/*.tsv',gulp.series('static','js'));
  gulp.watch('d3/views/*.html',gulp.parallel('html'));
}));