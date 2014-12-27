'use strict';

var gulp = require('gulp');
var es6ify = require('es6ify');
var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var through = require('through');

function relative(p) {
    if (p.charAt(0) !== '.') {
        return './' + p;
    }

    return p;
}

function getAllFiles(dirname, recursive) {
    var files = fs.readdirSync(dirname);
    var arr = [];

    files.forEach(function(file) {
        var filename = path.join(dirname, file);
        var stat = fs.statSync(filename);

        if (!stat.isDirectory()) {
            arr.push(filename);
        } else if (recursive) {
            arr.push.apply(arr, getAllFiles(filename, true));
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

function resolveNgMocksConflicts(file) {
    var source = '';

    var read = function(chunk) {
        source += chunk;
    };

    var end = function() {
        if (/Spec.js$/.test(file)) {
            source = source.replace(/\bmodule\(/g, 'angular.mock.module(');
        }

        this.queue(source);
        this.queue(null);
    };

    return through(read, end);
}

gulp.task('main', function() {
    mkdirp.sync('./build');

    return browserify({ debug: true })
        .add('./src/addons.js')
        .transform(addImports)
        .transform(es6ify)
        .require(require.resolve('./src/main.js'), { entry: true })
        .bundle()
        .pipe(fs.createWriteStream('./build/main.js'));
});

gulp.task('worker', function() {
    mkdirp.sync('./build/app/services/statistics');

    return browserify({ debug: true })
        .add('./src/addons.js')
        .add(es6ify.runtime)
        .transform(addImports)
        .transform(es6ify)
        .require(require.resolve('./src/app/services/statistics/worker.js'), { entry: true })
        .bundle()
        .pipe(fs.createWriteStream('./build/app/services/statistics/worker.js'));
});

gulp.task('allSpec', function() {
    mkdirp.sync('./build');

    return browserify({ debug: true })
        .add('./src/addons.js')
        .add(getAllFiles('./test', true).map(relative))
        .transform(resolveNgMocksConflicts)
        .transform(addImports)
        .transform(es6ify)
        .bundle()
        .pipe(fs.createWriteStream('./build/allSpec.js'));

});

gulp.task('default', ['main', 'worker', 'allSpec']);

gulp.watch(['src/**/*.js', 'test/**/*.js'], ['default']);
