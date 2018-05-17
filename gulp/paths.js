'use strict';

let paths = {};

//Наименование папок в структуре проекта (только имена)
paths.assetsFolderName          = 'assets';
paths.imageFolderName           = 'images/source';
paths.fontFolderName            = 'fonts'
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
paths.imageFiles                = paths.sourceDir + paths.assetsDir + paths.imageFolderName; // src/assets/images
paths.imageFilesOpt             = paths.imageFiles+ '/optimal'; // src/assets/images/optimal
paths.fontFiles                 = paths.sourceDir + paths.assetsDir + paths.fontFolderName; // src/assets/

//Расположение временных файлов
paths.assetsFilesTemp           = paths.tempDir + paths.assetsFolderName;
paths.imageFilesTemp            = paths.tempDir + paths.assetsDir + paths.imageFolderName; // .tmp/assets/images
paths.fontFilesTemp             = paths.tempDir + paths.assetsDir + paths.fontFolderName;

//Расположение файлов ресурсов готового сайта
paths.assetsFilesSite           = paths.siteDir + paths.assetsFolderName;
paths.imageFilesSite            = paths.siteDir + paths.assetsDir + paths.imageFolderName; // dist/assets/images
paths.fontFilesSite             = paths.siteDir + paths.assetsDir + paths.fontFolderName;

//Глобальные шаблоны по типу файла
paths.imagePattern              = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';

//Глобальные файлы
paths.imageFilesGlob            = paths.imageFiles + paths.imagePattern; // src/assets/images/source + pattern

module.exports = paths;