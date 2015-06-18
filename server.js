var fs = require("fs"),
    less = require("less"),
    http = require("http"),
    express = require("express"),
    socketio = require("socket.io");


var app = express();
app.use(express.static("public"));

app.get("/style.css", function(req, res) {
    fs.readFile(__dirname + "/public/style.less", function(err, data) {

        less.render(data.toString()).then(function(output) {
            res.write(output.css);
            res.end();
        }, function(error) {
            console.log(error);
        });

    });
});

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

function buildingExists(name) { /* gets wheather a building exists */
    var exists = false;

    db.buildings.forEach(function(building) {
        if(building.name == name) {
            exists = true;
        }
    });

    return exists;
}

io.on("connection", function(socket) {
    socket.emit("init", db);

    socket.on("vote-up", function(id) {
        if(getBuilding(id) != -1) {
            io.emit("vote-up", id);
            db.buildings[getBuilding(id)].votes += 1;
        }
    });

    socket.on("vote-down", function(id) {
        if(getBuilding(id) != -1) {
            io.emit("vote-down", id);
            db.buildings[getBuilding(id)].votes -= 1;
        }
    });

    socket.on("suggestion", function(name) {

        if(buildingExists(name) === true) {
            socket.emit("err", "Suggestion already exists.");
        } else if(name !== "" && name.length < 20) {
            var building = {
                name: name,
                votes: 0,
                id: db.buildings.length
            }

            io.emit("building", building);
            db.buildings.push(building);
        } else {
            socket.emit("err", "Suggestions should be between 1 and 20 characters.");
        }
    });
});
