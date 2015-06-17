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

function getBuilding(id) { /* gets the index of a building in the array */
    var index;

    db.buildings.forEach(function(building) {
        if(building.id == id) {
            index = db.buildings.indexOf(building);
        }
    });

    return index;
}

io.on("connection", function(socket) {
    socket.emit("init", db);

    socket.on("vote-up", function(id) {
        if(db.buildings[id]) {
            io.emit("vote-up", id);
            db.buildings[getBuilding(id)].votes += 1;
        }
    });

    socket.on("vote-down", function(id) {
            io.emit("vote-down", id);
            db.buildings[getBuilding(id)].votes -= 1;
    });
});
