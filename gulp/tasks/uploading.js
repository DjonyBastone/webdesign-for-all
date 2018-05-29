'use strict';

module.exports = () => {

    const paths = require('../paths');  // Включаем файл с путями

    // 'gulp upload' -- читает файл учетных данных rsync и постепенно загружает сайт на сервер
    $.gulp.task('upload', () => {
        let credentials = JSON.parse($.fs.readFileSync('rsync-credentials.json', 'utf8'));

        return gulp.src(paths.siteFolderName)
            .pipe($.gp.rsync({
                // dryrun: true
                root: paths.siteDir,
                hostname: credentials.hostname,
                username: credentials.username,
                destination: credentials.destination,
                incremental: true,
                recursive: true,
                compress: true,
                clean: false,
                chmod: 'Du=rwx,Dgo=rx,Fu=rw,Fgo=r'
            }));
    });

// 'gulp submit:sitemap` -- отправить файл sitemap XML в Google и Bing
    $.gulp.task('submit:sitemap', (cb) => {
        let SitemapUrl = paths.prodUrl + '/sitemap.xml';

        require('submit-sitemap').submitSitemap(SitemapUrl, function(err) {
            if (err)
                console.warn(err);
            cb();
        });
    });
};