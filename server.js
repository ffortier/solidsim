'use strict';

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

app.use(express.static('build'));
app.use(express.static('src'));
app.use(express.static('bower_components'));

server.listen(process.env.npm_package_config_port || 8080, function() {
    console.log('Listening on ', this.address());
});