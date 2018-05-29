'use strict';
module.exports = () => {

    let paths = require('../paths');  // Включаем файл с путями

// 'gulp scripts' -- создает index.js файл с Sourcemap из ваших файлов JavaScript
// 'gulp scripts --prod' -- создает index.js файл из ваших файлов JavaScript, минимизирует, и кэш перебрасывает его (не создает Sourcemap)
    $.gulp.task('scripts', () => {
        // Примечание: порядок здесь важен, так как он определяет порядок загрузки скриптов
        return $.gulp.src([
            paths.jsFiles + '/vendor/jquery-1.12.4.min.js',
            paths.jsFiles + '/plugins/**/*.js',
            paths.jsFiles + '/main.js'
        ])
            .pipe($.gp.changed(paths.jsFilesTemp + '/index.js', {dest: paths.jsFilesTemp, ext: '.js'}))
            .pipe($.gp.when(!$.argv.prod, $.gp.sourcemaps.init()))
            .pipe($.gp.concat('index.js'))  // Объединяем скрипты
            .pipe($.gp.size({showFiles: true}))
            .pipe($.gp.when($.argv.prod, $.gp.when('*.js', $.gp.uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))))  // минимизирует для production
            .pipe($.gp.when(!$.argv.prod, $.gp.sourcemaps.write('.')))  // Выходные данные sourcemap для разработки
            .pipe($.gulp.dest(paths.jsFilesTemp))
            .pipe($.gp.when($.argv.prod, $.gp.rev()))  // hash JS для production
            .pipe($.gp.when($.argv.prod, $.gp.size({showFiles: true})))
            .pipe($.gp.when($.argv.prod, $.gulp.dest(paths.jsFilesTemp)))  // вывод хэшированных файлов
            .pipe($.gp.rev.manifest('js-manifest.json')) // создать манифест хэшированных JS файлов
            .pipe($.gulp.dest(paths.tempDir + paths.sourceDir + paths.dataFolderName))
            .pipe($.gp.when($.argv.prod, $.gp.size({showFiles: true})))
    });

// 'gulp scripts:gzip --prod' -- gzip сжатие JS
    $.gulp.task('scripts:gzip', () => {
        return $.gulp.src([paths.jsFilesTemp + '/*.js'])
            .pipe($.gp.when($.argv.prod, $.gp.gzip( {deleteMode:(paths.jsFilesTemp)}, {skipGrowingFiles: true})))
            .pipe($.gp.when($.argv.prod, $.gp.size({
                gzip: true,
                showFiles: true
            })))
            .pipe($.gp.when($.argv.prod, $.gulp.dest(paths.jsFilesTemp)))
    });

// 'gulp styles' -- создает файл CSS через PostCSS
// 'gulp styles --prod' -- создает файл CSS через PostCSS,
//  минимизирует, создает хеш и пробрасывает результат в browserSync
    $.gulp.task('styles', () => {
        const config = (file) => ({
                plugins: [
                    $.postcssImport({ root: './src/assets/css *' }),
                    $.postcssNested
                ]
            }),
            processors = [
                $.cssnext({browsers: ['last 10 version']}),
                $.mqpacker
            ];
        return $.gulp.src([paths.cssFiles + '/**/*.*', '!' + paths.cssFiles + '/_block/**/*'])
            .pipe( $.gp.postcss(config) ) //Config нужен для postcss-import
            .pipe( $.gp.postcss(processors) )
            .pipe($.gp.when($.argv.prod, $.gp.csso() ))
            .pipe( $.gp.rename({extname: '.css'}) )  // Это шаблончик для переименования
            .pipe($.gulp.dest(paths.cssFilesTemp))  // Складывает результат во временную папку
            .pipe($.gp.when(!$.argv.prod, $.browserSync.stream())) //пробрасывает результат в browserSync
    });

    $.gulp.task('css-manifest', () => {
        return $.gulp.src([paths.cssFilesTemp + '/**/*.*', '!' + paths.cssFilesTemp + '/_blocks/**/*', '!' + paths.cssFilesTemp + '/**/_head_*.css'])
        // .pipe($.vinyl($.del))
            .pipe($.gp.when($.argv.prod, $.gp.csso())) // Минимизирует файлы
            .pipe($.gp.when($.argv.prod, $.gp.size({showFiles: true}))) //Показывает размер файлов в логе (см. консоль)
            .pipe($.gp.when( $.argv.prod, $.gp.rev() ) ) // Хеш CSS для production
            .pipe($.gulp.dest(paths.cssFilesTemp))  // Складывает результат во временную папку
            .pipe($.gp.rev.manifest('css-manifest.json'))  // генерирует manifest хэшированных CSS файлов
            .pipe($.gulp.dest(paths.tempDir + paths.sourceDir + paths.dataFolderName)) // Складывает результат Манифеста во временную папку
            .pipe($.gp.when($.argv.prod, $.gp.size({showFiles: true}))) //Показывает размер файлов в логе (см. консоль)
    });

// 'gulp styles:gzip --prod' -- gzips CSS
    $.gulp.task('styles:gzip', () => {
        return $.gulp.src([paths.cssFilesTemp + '/pages/**/*.css', '!' + paths.cssFilesTemp + '/**/_head_*.css'])
            .pipe( $.gp.when( $.argv.prod, $.gp.gzip({
                append: true, //Добавляет .gz расширение файла
                skipGrowingFiles : true // Если размер .gz больше исходника, то .gz не добавляется.
            }) ) )
            .pipe($.gp.when($.argv.prod, $.gp.size({
                gzip: true,
                showFiles: true
            })))
            .pipe($.gp.when($.argv.prod, $.gulp.dest(paths.cssFilesTemp + '/pages')))
    });

// 'gulp icons' -- Объединяет все иконки в один файл
    $.gulp.task('icons', () => {
        return $.gulp.src(paths.iconFiles + '/**/*.svg')
            .pipe($.gp.svgmin())
            .pipe($.gp.rename({prefix: 'icon-'}))
            .pipe($.gp.svgstore({fileName: 'icons.svg', inlineSvg: true}))
            .pipe($.gp.cheerio({
                run: function ($, file) {
                    $('svg').attr('style', 'display:none');
                    $('[fill]').removeAttr('fill');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.size({
                showFiles: true
            }))
            .pipe($.gulp.dest(paths.iconFilesTemp))
    });

// Функция для правильной перезагрузки браузера
    function reloadSite(done) {
        $.browserSync.reload();
        done();
    }
// 'gulp serve' -- Открыть сайт в браузере и следить за изменениями
// в исходных файлах и обновлять их при необходимости
    $.gulp.task('serve', (done) => {
        console.log(paths.imageFilesSrc)
        console.log(paths.imageFilesOpt)
        $.browserSync.init({
            // tunnel: true,
            // open: false,
            proxy: "webdesign-for-all",
            notify: false,
            port: 4000, // изменить порт в соответствии с Jekyll (по умолчанию)
            ui: {
                port: 4001
            },
            // server: [paths.tempFolderName, paths.siteFolderName]
        });
        done();

        // Отслеживать различные файлы на изменения и запускать необходимые задачи
        // $.gulp.watch([paths.mdFilesGlob, paths.htmlFilesGlob, paths.ymlFilesGlob], $.gulp.series('build:site', 'copy:site-combo', reloadSite));
        // $.gulp.watch([paths.xmlFilesGlob, paths.txtFilesGlob], $.gulp.series('site', reloadSite));
        $.gulp.watch(paths.jsFilesGlob, $.gulp.series('scripts', reloadSite));
        $.gulp.watch(paths.cssFilesGlob, $.gulp.series('styles', /*'copy:styles-combo','copy:styles-head', 'build:site', 'copy:site-combo',*/ reloadSite));
        $.gulp.watch(paths.imageFilesSrc, $.gulp.series(/*'copy:images', */'images:optimize', 'images:response', reloadSite));
    });

};