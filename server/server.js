var fs = require("fs"),
    less = require("less"),
    http = require("http"),
    express = require("express"),
    socketio = require("socket.io");

require("./build.js")();

console.log("Generating app...");

var app = express();
app.use(express.static(__dirname + "/../public"));

var server = http.createServer(app);

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

var dbFile = "db.json";

console.log("Loading database from " + dbFile + "...");

if(fs.existsSync(dbFile) === true) {
    var json = fs.readFileSync(dbFile);

    if(json) {
        var data = JSON.parse(json);

        if(data) {
            db = data;
        } else {
            console.log("Failed to parse " + dbFile + ".");
        }
    } else {
        console.log("Failed to read " + dbFile + ".");
    }
}

var io = socketio(server);

require("./sockets.js")(io, db);

setInterval(function() {

    fs.writeFile(dbFile, JSON.stringify(db), function(err) {
        if(err) {
            console.log("Failed saving database to file: " + err);
        }
    });

}, 30 * 1000); /* save the database to a json file, every 30 seconds */

/* Start the server */

console.log("Starting server...");
server.listen(8080);
