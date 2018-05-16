'use strict';

module.exports = () => {

    //Включаем файл с настройками путей
    let paths = require('../paths');

    $.gulp.task('images:optimize', () => {
        return $.gulp.src([paths.imageFilesGlob])
            .pipe($.gp.newer(paths.imageFilesSite)) //Берет и сверяет файлы, вычисляет новые изменения
            .pipe($.gp.imagemin([
                $.gp.imagemin.gifsicle({interlaced: true}),
                $.gp.imagemin.jpegtran({progressive: true}),
                $.mozjpeg({quality:90}),  //Процент качества для формата jpg
                $.gp.imagemin.optipng(),
                $.gp.imagemin.svgo({plugins: [{cleanIDs: false}]})
            ], {verbose: true}))
            .pipe($.gulp.dest(paths.imageFilesSite)) // Складываем результат в dest/assets/images
            .pipe($.gp.size({title: 'images'})) // Выводит результат в консоль
    });
};