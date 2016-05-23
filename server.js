var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('http-proxy-middleware');

var HOSTNAME = 'localhost',
    PORT = 9000,
    PUBLIC_DIR = __dirname + '/public_html';

app
    .use('/', express.static(PUBLIC_DIR))
    .use(errorHandler());

app.listen(PORT, function () {
    console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

app.use('/api', proxy('http://127.0.0.1:8080/', {ws: true}));
