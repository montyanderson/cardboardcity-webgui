var fs = require("fs"),
    less = require("less"),
    http = require("http"),
    express = require("express"),
    socketio = require("socket.io");

var router = require("./router.js");
var sockets = require("./sockets.js");

console.log("Generating app...");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(router);

var server = http.createServer(app);

var db = {
    buildings: []
};

var dbFile = __dirname + "/db.json";

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

sockets(io, db);

setInterval(function() {

    fs.writeFile(dbFile, JSON.stringify(db), function(err) {
        if(err) {
            console.log("Failed saving database to file: " + err);
        }
    });

}, 30 * 1000); /* save the database to a json file, every 30 seconds */

/* Start the server */

var port = process.env.PORT || process.argv[3] || 8080;

console.log("Server running on port " + port + ".");
server.listen(port);

if(process.argv[2] == "--test") {
    console.log("Test ran successfully.");
    process.exit();
}
