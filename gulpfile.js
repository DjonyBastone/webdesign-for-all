'use strict';

//Настройки глобальных переменных для Gulp
global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    mozjpeg: require('imagemin-mozjpeg')
};

//Настройка путей до тасков
require('./gulp/paths');
require('./gulp/tasks/images.js')();
require('./gulp/tasks/fonts.js')();


$.gulp.task('images', $.gulp.series('images:optimize', 'images:response'))