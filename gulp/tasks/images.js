'use strict';

module.exports = () => {

    //Включаем файл с настройками путей
    let paths = require('../paths');

    $.gulp.task('images:optimize', () => {
        return $.gulp.src([paths.imageFilesGlobSrc])
            .pipe($.gp.changed(paths.imageFilesOpt)) //Берет и сверяет файлы, вычисляет новые изменения
            .pipe($.gp.imagemin([
                $.gp.imagemin.gifsicle({interlaced: true}),
                $.gp.imagemin.jpegtran({progressive: true}),
                $.mozjpeg({quality:90}),  //Процент качества для формата jpg
                $.gp.imagemin.optipng(),
                $.gp.imagemin.svgo({plugins: [{cleanIDs: false}]})
            ], {verbose: true}))
            .pipe($.gulp.dest(paths.imageFilesOpt)) // Складываем результат в dest/assets/images/optimal
            .pipe($.gp.size({title: 'images'})) // Выводит результат в консоль
    });

    // Изменение размеров  изображения
    $.gulp.task('images:response', () => {
        return $.gulp.src([paths.imageFilesOpt + paths.imagePattern, '!' + paths.imageFilesOpt + '/**/*.{gif,svg}'])
            .pipe($.gp.changed(paths.imageFilesSite))
            .pipe($.gp.responsive({
                '**/*.*': [{
                    width: 20,
                    rename: {suffix: '-lq'},
                }, {
                    width: 320,
                    rename: {suffix: '-320'},
                },{
                    width: 768,
                    rename: {suffix: '-768'},
                },{
                    width: 1024,
                    rename: {suffix: '-1024'},
                },{
                    width: 1920,
                    rename: {suffix: ''},
                }]
            }, {
                //Глобальная конфигурация для всех изображений
                errorOnEnlargement: false,
                withMetadata: false,
                errorOnUnusedConfig: false

            }))
            .pipe($.gulp.dest(paths.imageFilesSite)) // Складываем результат в dest/assets/images
            .pipe($.gulp.src([paths.imageFilesOpt + '/**/*.{gif,svg}']))
            .pipe($.gulp.dest(paths.imageFilesSite)) // Складываем результат в dest/assets/images

    });
};