var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var hmac = function(key, content) {
    var method = crypto.createHmac('sha1', key);
    method.setEncoding('base64');
    method.write(content);
    method.end();
    return method.read();
};

/* GET home page. */
router.get('/', function(req, resp, next) {
    var query = req.query;
    // var key = '4080218913'; // 这里的 key 是事先设置好的, 我们把他当成一个常亮来看, 所以就不从HTTP请求参数里读取了

    if (!query['username']) {
        return resp.send({ 'error': 'AppError', 'message': 'Must provide username.' });
    }

    if (!query['key']) {
        return resp.send({ 'error': 'AppError', 'message': 'Must provide key.' });
    }

    {
        var time_to_live = 600;
        var timestamp = Math.floor(Date.now() / 1000) + time_to_live;
        var turn_username = timestamp + ':' + query['username'];
        var key = query['key']; // 这里的 key 是事先设置好的, 我们把他当成一个常亮来看, 所以就不从HTTP请求参数里读取了
        var password = hmac(key, turn_username);

        var ices = [{
            "urls": [
                "turn:aws.apprtc.com:3478?transport=udp",
                "turn:aws.apprtc.com:3478?transport=tcp",
                "turn:aws.apprtc.com:3479?transport=udp",
                "turn:aws.apprtc.com:3479?transport=tcp"
            ],
            "username": "phoebus", //可选
            "credential": "123456" //可选
        }]

        return resp.send({
            username: turn_username,
            password: password,
            ttl: time_to_live,
            "uris": [
                "turn:aws.apprtc.com:3478?transport=udp",
                "turn:aws.apprtc.com:3478?transport=tcp",
                "turn:aws.apprtc.com:3479?transport=udp",
                "turn:aws.apprtc.com:3479?transport=tcp"
            ],
            "iceServers": ices
        });
    }
});

module.exports = router;