function sockets(io, db) {
    var fs = require("fs");
    var markdown = require("./markdown.js");

    function getBuilding(id) { /* gets the index of a building in the array */
        var index;

        db.buildings.forEach(function(building) {
            if(building.id == id) {
                index = db.buildings.indexOf(building);
            }
        });

        return index;
    }

    function buildingExists(id) { /* gets wheather a building exists */
        var exists = false;

        db.buildings.forEach(function(building) {
            if(building.id == id) {
                exists = true;
            }
        });

        return exists;
    }

    io.on("connection", function(socket) {
        socket.emit("init", db);

        markdown(function(text) {
            socket.emit("modal", text);
        });

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

        socket.on("approve", function(id) {
            if(getBuilding(id) != -1) {
                io.emit("approve", id);
                db.buildings[getBuilding(id)].approved = true;
            }
        });

        socket.on("unapprove", function(id) {
            if(getBuilding(id) != -1) {
                io.emit("unapprove", id);
                db.buildings[getBuilding(id)].approved = false;
            }
        });

        socket.on("suggestion", function(id) {

            if(buildingExists(id) === true) {
                socket.emit("err", "Suggestion already exists.");
            } else if(id !== "" && id.length < 30) {
                var building = {
                    id: id,
                    votes: 0,
                    approved: false
                };

                io.emit("building", building);
                db.buildings.push(building);
            } else {
                socket.emit("err", "Suggestions should be between 1 and 20 characters.");
            }
        });

        socket.on("login", function(password) {
            fs.readFile(__dirname + "/.password", function(err, data) {
                if (err) throw err;

                if(password.trim() == data.toString().trim()) {
                    console.log(true);
                    socket.emit("admin", true);
                } else {
                    console.log(false);
                    socket.emit("admin", false);
                }
            });
        });

    });
}

module.exports = sockets;
