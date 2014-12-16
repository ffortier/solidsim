'use strict';

var gulp = require('gulp');
var es6ify = require('es6ify');
var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

if (!Array.prototype.concatAll) {
    Array.prototype.concatAll = function() {
        return Array.prototype.concat.apply([], this);
    };
}

function getAllFiles(dirname) {
    var files = fs.readdirSync(dirname);

    return files.map(function(file) {
        var filename = path.join(dirname, file);
        var stat = fs.statSync(filename);

        if (stat.isDirectory()) {
            return getAllFiles(filename);
        }

        return filename;
    }).concatAll();
}

function addImports(file) {
    var CombinedStream = require('combined-stream');
    var strm = new CombinedStream();

    strm.append(fs.createReadStream(file));

    strm.append(getAllFiles(path.resolve(__dirname, 'src', 'app')).map(function(f) {
        return 'require(' + f + ')';
    }).join('\n'));

    return strm;
}

gulp.task('default', function () {
    mkdirp.sync('build/app');

    return browserify({ debug: true })
        .transform(es6ify)
        .transform(addImports)
        .require(require.resolve('./src/main.js'), { entry: true })
        .bundle()
        .pipe(fs.createWriteStream('build/main.js'));
});

gulp.watch('src/**/*.js', ['default']);
