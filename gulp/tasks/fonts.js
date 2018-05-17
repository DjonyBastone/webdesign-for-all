'use strict';

module.exports = () => {

    let paths = require('../paths');  // Включаем файл с путями

    // 'gulp fonts' -- Копируем шрифты во временную папку
    $.gulp.task('fonts', () => {
        return $.gulp.src(paths.fontFiles + '/**/*')
            .pipe($.gulp.dest(paths.fontFilesTemp))
            .pipe($.gp.size({title: 'fonts'}))
    });

};