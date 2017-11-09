var express = require('express');
var path = require('path');
var fs = require('fs');
var https = require('https');
var http = require('http')



var privateKey = fs.readFileSync('sslcert/server.key');
var certificate = fs.readFileSync('sslcert/server.crt');
var credentials = { key: privateKey, cert: certificate };

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('./public'))

app.use('/', require('./routes/index'));
app.use('/html', require('./routes/index'));
app.use('/websocket', require('./routes/websocket'));
app.use('/turn', require('./routes/turn'));
app.use('/iceconfig', require('./routes/ice'));

// app.listen(1443);
server = https.createServer(credentials, app).listen(1443, '');


module.exports = app;