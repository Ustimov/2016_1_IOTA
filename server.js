var fs = require('fs')
    https = require('https')
    express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('http-proxy-middleware');

var HOSTNAME = 'localhost',
    PORT = 9000,
    PUBLIC_DIR = __dirname + '/public_html';

app
    .use('/', express.static(PUBLIC_DIR))
    .use(errorHandler());

var options = {
    key: fs.readFileSync(__dirname + '/protected/server.key'),
    cert: fs.readFileSync(__dirname + '/protected/server.crt')
}

app.use('/api', proxy('https://api.iota.su', {changeOrigin: true, secure: false, ssl: options, ws: true}));

https.createServer(options, app).listen(PORT, function () {
    console.log("Simple static server showing %s listening at https://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

//app.use('/api', proxy('http://172.16.51.213:8080/', {ws: true}));
