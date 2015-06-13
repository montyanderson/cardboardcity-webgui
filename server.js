var fs = require("fs"),
    http = require("http"),
    express = require("express");
    socketio = require("socket.io");

var app = express();
app.use(express.static("public"));

var server = http.createServer(app);
var io = socketio(server);

server.listen(8080);


var db = {};

db.buildings = [
    {
        name: "Toothpaste Factory",
        votes: 6,
        id: 0
    },
    {
        name: "Shopping Mall",
        votes: 0,
        id: 1
    },
    {
        name: "Police Station",
        votes: -2,
        id: 2
    }
];

io.on("connection", function(socket) {
    socket.emit("init", db);

    socket.on("vote-up", function(id) {
        if(db.buildings[id]) {
            console.log(id);
            io.emit("vote-up", id);
        }
    });

    socket.on("vote-down", function(id) {
        if(db.buildings[id]) {
            console.log(id);
            io.emit("vote-down", id);
        }
    });
});
