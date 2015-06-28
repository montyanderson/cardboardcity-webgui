function sockets(io, db) {
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
                };

                io.emit("building", building);
                db.buildings.push(building);
            } else {
                socket.emit("err", "Suggestions should be between 1 and 20 characters.");
            }
        });
    });
}

module.exports = sockets;
