'use strict';

module.exports = () => {

    const paths = require('../paths');  // Включаем файл с путями

// 'gulp clean:assets' -- удаляет все временные, и готового сайта CSS/JS ресурсы, кроме изображений готового сайта
    $.gulp.task('clean:assets', () => {
        return $.del([paths.assetsFilesTemp, paths.assetsFilesSite + '/**/*', '!' + paths.imageFilesSite, '!' + paths.imageFilesSite + '/**/*']);
    });

// 'gulp clean:images' -- удаляет только изображения с готового сайта
    $.gulp.task('clean:images', () => {
        return $.del([paths.imageFilesSite]);
    });

// 'gulp clean:dist' -- удаляет готовый сайт, кроме папки assets и изображений
    $.gulp.task('clean:dist', () => {
        return $.del([paths.siteFolderName + '/**/*', '!' + paths.assetsFilesSite, '!' + paths.imageFilesSite, '!' + paths.imageFilesSite + '/**/*'], {'dot': true});
    });

// 'gulp clean:gzip' -- удаляет gzip файлы
    $.gulp.task('clean:gzip', () => {
        return $.del([paths.siteFolderName  + '/**/*.gz']);
    });

// 'gulp clean:site' -- удаляет временный ресурс сайта
    $.gulp.task('clean:site', () => {
        return $.del([paths.tempDir  + paths.sourceFolderName]);
    });

};