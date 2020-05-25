const {task, src, parallel, series} = require('gulp');
const cleaner = require('gulp-clean');
const spawn = require('child_process').spawn;


const entries = ['core', 'draw', 'math', 'vector'];

entries.forEach(entry => {
  task(`clean_${entry}`, () => src(`./${entry}/dist/`, {read: false, allowEmpty: true}).pipe(cleaner())); // Option read:false prevents gulp from reading the contents of the file and makes this task a lot faster
  task(`publish_${entry}`, (cb) => {
    spawn('npm', ['publish', `./${entry}`, '--access', 'public'], {stdio: 'inherit'}).on('close', cb);
  })
});

task('clean', parallel(...entries.map(entry => task(`clean_${entry}`))));
task('publish', series(
  task('clean'),
  parallel(...entries.map(entry => task(`publish_${entry}`)))
));


task('default', task('publish'));
