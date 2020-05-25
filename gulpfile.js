const {task, src, dest, parallel, series} = require('gulp');
const cleaner = require('gulp-clean');
const babel = require('gulp-babel');
const spawn = require('child_process').spawn;


const entries = ['core', 'draw', 'math', 'vector'];

entries.forEach(entry => {
  task(`clean_${entry}`, () => src(`./${entry}/dist/`, {read: false, allowEmpty: true}).pipe(cleaner())); // Option read:false prevents gulp from reading the contents of the file and makes this task a lot faster
  task(`build_${entry}`, () => src(`./${entry}/src/*.js`).pipe(babel({
    presets: ["@babel/preset-env", "@babel/preset-react"]
  })).pipe(dest(`./${entry}/dist/`)));
  task(`publish_${entry}`, (cb) => {
    spawn('npm', ['publish', `./${entry}`, '--access', 'public'], {stdio: 'inherit'}).on('close', cb);
  })
});

task('clean', parallel(...entries.map(entry => task(`clean_${entry}`))));
task('build', series(
  task('clean'),
  parallel(entries.map(entry => task(`build_${entry}`)))
));
task('publish', series(
  task('build'),
  parallel(...entries.map(entry => task(`publish_${entry}`)))
));


task('default', task('publish'));
