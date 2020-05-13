// HTTPエコーサーバー HTTPリクエストボディデータを返す
let http = require('http');
let server = http.createServer();
let port = process.env.SERVER_PORT || 8080;

// クライアントからリクエストボディデータをレスポンスとして返す
server.on('request', function (req, res) {
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function () {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            "body": data,
            }
        ));
    });
});


// HTTPの生データを出力する
server.on('connection', function (socket) {
    console.log('=== Raw Socket Data Start ===');
    socket.on('data', function (chunk) {
        console.log(chunk.toString());
    });

    socket.on('end', function () {
        console.log('=== Raw Socket Data End ===');
    });
});

server.listen(port, function () {
    console.log('listening on ' + port);
})
