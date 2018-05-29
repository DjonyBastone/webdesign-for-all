'use strict';

module.exports = () => {

    let paths = require('../paths');  // Включаем файл с путями

// 'gulp html' -- Ни чего не делает
// 'gulp html --prod' -- минимизирует и сжимает(gzip) HTML файлы для продакшн
    $.gulp.task('html', () => {
        return $.gulp.src(paths.siteFolderName + paths.htmlPattern)
            .pipe($.gp.when($.argv.prod, $.gp.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: false,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                minifyJS: true,
                minifyCSS: true
            })))
            .pipe($.gp.when($.argv.prod, $.gp.size({title: 'optimized HTML'})))
            .pipe($.gp.when($.argv.prod, $.gulp.dest(paths.siteFolderName)))
            .pipe($.gp.when($.argv.prod, $.gp.gzip({append: true})))
            .pipe($.gp.when($.argv.prod, $.gp.size({title: 'gzipped HTML', gzip: true})))
            .pipe($.gp.when($.argv.prod, $.gulp.dest(paths.siteFolderName)))
    });

// 'gulp xml' -- does nothing
// 'gulp xml' --prod'  -- minifies XML and JSON files for production
    $.gulp.task('xml', () => {
        return $.gulp.src(paths.siteFolderName + paths.xmlPattern)
            .pipe($.gp.when($.argv.prod, $.gp.prettyData({
                type: 'minify',
                preserveComments: true
            })))
            .pipe($.gp.when($.argv.prod, $.gp.size({title: 'optimized XML'})))
            .pipe($.gp.when($.argv.prod, $.gulp.dest(paths.siteFolderName)))
    });
};