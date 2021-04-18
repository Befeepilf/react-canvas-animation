const {task, src, parallel, series} = require('gulp');
const cleaner = require('gulp-clean');
const spawn = require('child_process').spawn;
const fs = require('fs');

const version = "0.1.4";
const entries = ['core', 'draw', 'math', 'vector'];

entries.forEach(entry => {

  task(`clean_${entry}`, () => src(`./${entry}/dist/`, {read: false, allowEmpty: true}).pipe(cleaner())); // Option read:false prevents gulp from reading the contents of the file and makes this task a lot faster

  task(`build_${entry}`, (cb) => {
    spawn('npm', ['run', 'prepare', '--prefix', `./${entry}`], {stdio: 'inherit'}).on('close', cb);
  });

  task(`version_${entry}`, (cb) => {
    const config = JSON.parse(fs.readFileSync(`./${entry}/package.json`));
    config.version = version;
    fs.writeFile(`./${entry}/package.json`, JSON.stringify(config), cb);
  });

  task(`publish_${entry}`, (cb) => {
    spawn('npm', ['publish', `./${entry}`, '--access', 'public'], {stdio: 'inherit'}).on('close', cb);
  });

});

task('clean', parallel(...entries.map(entry => task(`clean_${entry}`))));

task('build', series(
  task('clean'),
  parallel(...entries.map(entry => task(`build_${entry}`)))
));

task('version', parallel(...entries.map(entry => task(`version_${entry}`))));
task('publish', series(
  task('clean'),
  task('version'),
  parallel(...entries.map(entry => task(`publish_${entry}`)))
));


task('default', task('publish'));
