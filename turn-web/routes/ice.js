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
router.post('/', function(req, resp) {
    var query = req.query;


    // var key = '4080218913'; // 这里的 key 是事先设置好的, 我们把他当成一个常亮来看, 所以就不从HTTP请求参数里读取了

    {
        var time_to_live = 600;
        var timestamp = Math.floor(Date.now() / 1000) + time_to_live;
        var turn_username = timestamp + ':' + query['username'];
        var key = query['key']; // 这里的 key 是事先设置好的, 我们把他当成一个常亮来看, 所以就不从HTTP请求参数里读取了
        var password = hmac(key, turn_username);

        var ices = [{
            "urls": [
                "stun:aws.apprtc.com:3478?transport=udp",
                "stun:aws.apprtc.com:3478?transport=tcp",
                "stun:aws.apprtc.com:3479?transport=udp",
                "stun:aws.apprtc.com:3479?transport=tcp"
            ],
            "username": "phoebus", //可选
            "credential": "123456" //可选
        }]

        resp.send({
            username: turn_username,
            password: password,
            ttl: time_to_live,
            "iceServers": ices
        });
    }
});

module.exports = router;