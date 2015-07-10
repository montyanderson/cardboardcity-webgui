module.exports = function() {
    window.admin = false;

    var renderBuildings = require("./render.js");
    var getBuilding = require("./getBuilding.js");

    window.socket = io.connect(location.origin);

    window.db = {};

    socket.on("init", function(update) {
        window.db = update;
        renderBuildings();
    });

    socket.on("vote-up", function(id) {
        db.buildings[getBuilding(id)].votes += 1;
        renderBuildings();
    });

    socket.on("vote-down", function(id) {
        db.buildings[getBuilding(id)].votes -= 1;
        renderBuildings();
    });

    socket.on("approve", function(id) {
        db.buildings[getBuilding(id)].approved = true;
        renderBuildings();
    });

    socket.on("unapprove", function(id) {
        db.buildings[getBuilding(id)].approved = false;
        renderBuildings();
    });

    socket.on("building", function(building) {
        db.buildings.push(building);
        renderBuildings();
    });

    socket.on("admin", function(data) {
        if(data === true) {
            admin = true;
            renderBuildings();
            alert("Welcome, you're now logged in!");
        } else {
            alert("Sorry, we didn't recognise that password!");
        }
    });

    socket.on("err", function(error) {
        alert(error);
    });
};
