'use strict';

module.exports = () => {

    let paths = require('../paths');  // Включаем файл с путями

    // 'gulp site:tmp' -- копирует сайт Jekyll во временный каталог для обработки
    $.gulp.task('site:tmp', () => {
        return $.gulp.src([paths.sourceFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName], {dot: true})
            .pipe($.gulp.dest(paths.tempDir + paths.sourceFolderName))
            .pipe($.gp.size({title: 'Jekyll'}))
    });

    // 'gulp site' -- построение сайта с параметрами разработки _config.yml
    // 'gulp site --prod' -- построение сайта с параметрами production
    $.gulp.task('site', done => {
        if (!$.argv.prod) {
            $.shell.exec('bundle exec jekyll build --config _config.yml,_config.dev.yml');
            done();
        } else if ($.argv.prod) {
            $.shell.exec('bundle exec jekyll build');
            done();
        }
    });

    // 'gulp site:check' -- строит сайт с параметрами production затем проводит тест с html-proofer
    $.gulp.task('site:check', done => {
        $.shell.exec('gulp build --prod');
        $.shell.exec('bundle exec rake test');
        done();
    });
};