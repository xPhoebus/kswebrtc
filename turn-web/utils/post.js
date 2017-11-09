var util = require('util');
var https = require('https');
var url = require('url');
var querystring = require('querystring')

function post(regURL, path, data, onFinished) {
    var post_option = url.parse(regURL);
    post_option.method = 'POST';
    post_option.path = path;
    post_option.rejectUnauthorized = false;
    post_option.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Content-Length': data.length
    };

    var post_req = https.request(post_option, function(res) {
        var content = '';
        res.on('data', function(buffer) {
            content += buffer;
        })

        res.on('end', function() {
            onFinished(content);
        });

        res.on('error', function(error) {
            console.log(error);
        });
    });

    post_req.on('error', function(error) {
        console.log(error);
    });

    post_req.write(data);
    post_req.end();
}

exports.post = post