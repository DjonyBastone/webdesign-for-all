'use strict';

module.exports = () => {

    let paths = require('../paths');  // Включаем файл с путями

// 'gulp copy:assets' -- копирует assets в папку /dist/ чтоьы избежать перезаписи Jekyll всей директории
    $.gulp.task('copy:assets', () => {
        return $.gulp.src([paths.assetsFilesTemp + '/**/*', paths.imageFiles + '/*.ico'])
            .pipe($.gulp.dest(paths.assetsFilesSite))
    });

// 'gulp copy:images' -- Копирует неоптимизированные изображения в /dist/
    $.gulp.task('copy:images', () => {
        return $.gulp.src([paths.imageFilesGlob, '!src/assets/images/{feature,feature/**,lazyload,lazyload/**}']) // do not process feature images
        // .pipe($.gp.changed(paths.imageFilesSite))
            .pipe($.gulp.dest(paths.imageFilesSite))
            .pipe($.gulp.dest([paths.tempDir + 'combo/' + paths.assetsDir + paths.imageFolderName]))
    });

// 'gulp copy:icons' -- копирует иконки в /dist/
    $.gulp.task('copy:icons', () => {
        return $.gulp.src(paths.imageFiles + '/*.ico')
            .pipe($.gp.changed(paths.imageFilesSite))
            .pipe($.gulp.dest(paths.imageFilesSite))
    });

// 'gulp copy:manifest' -- copies image json to /dist/
    $.gulp.task('copy:manifest', () => {
        return $.gulp.src(paths.imageFiles + '/*.json')
            .pipe($.gp.changed(paths.imageFilesSite))
            .pipe($.gulp.dest(paths.imageFilesSite))
    });

// 'gulp copy:site' -- копирует обработанный Jekyll сайт в /dist/
    $.gulp.task('copy:site', () => {
        return $.gulp.src([paths.tempDir + paths.siteFolderName + '/**/*', paths.tempDir + paths.siteFolderName + '/**/.*'])
            .pipe($.gulp.dest([paths.siteFolderName]))
    });

// 'gulp copy:site' -- копирует обработанный Jekyll сайт в .tmp/combo/ для рендера статика + PHP
    $.gulp.task('copy:site-combo', () => {
        return $.gulp.src([paths.tempDir + paths.siteFolderName + '/**/*', paths.tempDir + paths.siteFolderName + '/**/.*'])
            .pipe($.gulp.dest([paths.tempDir + 'combo']))
    });

    $.gulp.task('copy:styles-combo', () => {
        return $.gulp.src([paths.pcssFilesTemp + '/**/*'])
            .pipe($.gulp.dest(paths.tempDir + 'combo/' + paths.assetsDir + paths.stylesFolderName))
    });

    $.gulp.task('copy:js-combo', () => {
        return $.gulp.src([paths.jsFilesTemp  + '/**/*-*.js'])
            .pipe($.gulp.dest(paths.tempDir + 'combo/' + paths.assetsDir + paths.scriptFolderName))
    });

    $.gulp.task('copy:styles-head', () => {
        return $.gulp.src([paths.cssFilesTemp + '/**/_head_*.css'])
            .pipe($.gulp.dest(paths.tempDir + paths.sourceFolderName  + '/_includes/css'))
    });

// 'copy:design-tmp' --
    $.gulp.task('copy:design-tmp', () => {
        return $.gulp.src(['./src/design/**/*'])
            .pipe($.gulp.dest(paths.tempDir + paths.sourceDir +  'design'))
    });

};