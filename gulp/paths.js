'use strict';

let paths = {};

//Наименование папок в структуре проекта (только имена)
paths.assetsFolderName          = 'assets';
paths.dataFolderName            = '_data';
paths.imageFolderName           = 'images';
paths.fontFolderName            = 'fonts';
paths.iconFolderName            = 'icons';
paths.scriptFolderName          = 'js';
paths.siteFolderName            = 'dist';
paths.sourceFolderName          = 'src';
paths.stylesFolderName          = 'css';
paths.tempFolderName            = '.tmp';

paths.prodUrl                   = 'https://webdesign-for-all.ru';

//Локальные директории
paths.sourceDir                 = paths.sourceFolderName + '/';
paths.assetsDir                 = paths.assetsFolderName + '/';
paths.tempDir                   = paths.tempFolderName + '/';
paths.siteDir                   = paths.siteFolderName + '/';

//Расположение исходных данных
paths.cssFiles                  = paths.sourceDir + paths.assetsDir + paths.stylesFolderName;               // src/assets/css
paths.jsFiles                   = paths.sourceDir + paths.assetsDir + paths.scriptFolderName;               // src/assets/js
paths.imageFiles                = paths.sourceDir + paths.assetsDir + paths.imageFolderName;                // src/assets/images
paths.imageFilesOpt             = paths.sourceDir + paths.assetsDir + paths.imageFolderName + '/optimal';   // src/assets/images/optimal
paths.imageFilesSrc             = paths.sourceDir + paths.assetsDir + paths.imageFolderName + '/source';    // src/assets/images/source
paths.fontFiles                 = paths.sourceDir + paths.assetsDir + paths.fontFolderName;                 // src/assets/fonts
paths.iconFiles                 = paths.sourceDir + paths.assetsDir + paths.iconFolderName;                 // src/assets/icons

//Расположение временных файлов
paths.assetsFilesTemp           = paths.tempDir + paths.assetsFolderName;                   // .tmp/assets/images
paths.cssFilesTemp              = paths.tempDir + paths.assetsDir + paths.stylesFolderName; // .tmp/assets/css
paths.jsFilesTemp               = paths.tempDir + paths.assetsDir + paths.scriptFolderName; // .tmp/assets/js
paths.imageFilesTemp            = paths.tempDir + paths.assetsDir + paths.imageFolderName;  // .tmp/assets/images
paths.fontFilesTemp             = paths.tempDir + paths.assetsDir + paths.fontFolderName;   // .tmp/assets/fonts
paths.iconFilesTemp             = paths.tempDir + paths.assetsDir + paths.iconFolderName;   // .tmp/assets/icons

//Расположение файлов ресурсов готового сайта
paths.assetsFilesSite           = paths.siteDir + paths.assetsFolderName;                   // dist/assets
paths.cssFilesSite              = paths.siteDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFilesSite               = paths.siteDir + paths.assetsDir + paths.scriptFolderName; // dist/assets/js
paths.imageFilesSite            = paths.siteDir + paths.assetsDir + paths.imageFolderName;  // dist/assets/images
paths.fontFilesSite             = paths.siteDir + paths.assetsDir + paths.fontFolderName;   // dist/assets/fonts
paths.iconFilesSite             = paths.siteDir + paths.assetsDir + paths.iconFolderName;   // dist/assets/icons

//Глобальные шаблоны по типу файла
paths.cssPattern        = '/**/*.css';
paths.jsPattern                 = '/**/*.js';
paths.imagePattern              = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';

//Глобальные файлы
paths.cssFilesGlob              = paths.cssFiles + paths.cssPattern;
paths.jsFilesGlob               = paths.jsFiles + paths.jsPattern;        // src/assets/js + pattern
paths.imageFilesGlob            = paths.imageFiles + paths.imagePattern; // src/assets/images/source + pattern

module.exports = paths;