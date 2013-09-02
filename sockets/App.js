var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(8080);

function handler(req, res){
    fs.readFile(__dirname + '/index.html', function(err, data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var socketPool = {};
var socketIDs = [];

io.sockets.on('connection', function(socket){
    console.log('client connected, sessionID:' + socket.id);
    socketPool['"' + socket.id + '"'] = socket;
    socketIDs.push(socket.id);

    console.log(socketIDs[0]);

    for(i in socketPool){
        console.log('poolItem: ' + i);
        console.log(socketPool[i].emit);
    }


    //  取到设备信息
    socket.on('send device info', function(data){
        // 向绑定的调试端发送设备信息
        socketPool['"' + data.devSessionId + '"'].emit('new client connected', {
            'UA': data.UA,
            'sessionID': socket.id
        });
    });

    socket.on('run', function(data){
        console.log(data);
        data.device.forEach(function(item){
            socketPool['"' + item[1] + '"'].emit('device run', {'demo': data.demo});
        });
    });
});