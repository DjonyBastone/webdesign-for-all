'use strict';

//Настройки глобальных переменных для Gulp
global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')({
        rename: {
            'gulp-if': 'when'
        }
    }),
    argv: require('yargs').argv,
    browserSync: require('browser-sync').create(),
    cssnext: require('postcss-cssnext'),
    del: require('del'),
    mozjpeg: require('imagemin-mozjpeg'),
    mqpacker: require('css-mqpacker'),
    postcssImport: require('postcss-import'),
    postcssNested: require('postcss-nested'),
    shell: require('shelljs')
};

//Настройка путей до тасков
require('./gulp/paths');
require('./gulp/tasks/assets.js')();
require('./gulp/tasks/images.js')();
require('./gulp/tasks/fonts.js')();
require('./gulp/tasks/html.js')();
require('./gulp/tasks/copy.js')();
require('./gulp/tasks/clean.js')();