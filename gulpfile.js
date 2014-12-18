'use strict';

var gulp = require('gulp');
var es6ify = require('es6ify');
var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var through = require('through');

function getAllFiles(dirname) {
    var files = fs.readdirSync(dirname);
    var arr = [];

    files.forEach(function(file) {
        var filename = path.join(dirname, file);
        var stat = fs.statSync(filename);

        if (!stat.isDirectory()) {
            arr.push(filename);
        }
    });

    return arr;
}

function addImports(file) {
    var source = '';

    var read = function(chunk) {
        source += chunk;
    };

    var end = function() {
        var basename = path.basename(file);
        var dirname = path.dirname(file);

        this.queue(source);

        if (basename === 'index.js') {
            this.queue(getAllFiles(dirname).filter(function(file) {
                return path.basename(file) !== 'index.js';
            }).map(function(file) {
                return 'import "./' + path.relative(dirname, file) + '";';
            }).join('\n'));
        }

        this.queue(null);
    };

    return through(read, end);
}

gulp.task('main', function() {
    mkdirp.sync('./build');

    return browserify({ debug: true })
        .transform(addImports)
        .transform(es6ify)
        .require(require.resolve('./src/main.js'), { entry: true })
        .bundle()
        .pipe(fs.createWriteStream('./build/main.js'));
});

gulp.task('worker', function() {
    mkdirp.sync('./build/app/services/statistics');

    return browserify({ debug: true })
        .transform(es6ify)
        .require(require.resolve('./src/app/services/statistics/worker.js'), { entry: true })
        .bundle()
        .pipe(fs.createWriteStream('./build/app/services/statistics/worker.js'));
});

gulp.task('default', ['main', 'worker']);

gulp.watch('src/**/*.js', ['default']);
