var db;

function renderBuildings() { /* renders the entire array of buildings as html */
    $("#buildings").html("");

    db.buildings.sort(function(a, b) {
        if(a.votes <= b.votes) {
            return 1;
        } else {
            return -1;
        }
    });

    db.buildings.forEach(function(building) {
        building.up = false;
        building.down = false;
        building.zero = false;

        if(building.votes > 0) {
            building.up = true;
        } else if(building.votes < 0) {
            building.down = true;
        } else if(building.votes === 0) {
            building.zero = true;
        }

        $("#buildings").append(
            Mustache.render($("#template-building").html(), building)
        );
    });

    $(".vote-up").click(function() {
        socket.emit("vote-up", $(this).data("id"));
    });

    $(".vote-down").click(function() {
        socket.emit("vote-down", $(this).data("id"));
    });
}

function getBuilding(id) { /* gets the index of a building in the array */
    var matches = $.grep(db.buildings, function(building) {
        return building.id == id;
    });

    return db.buildings.indexOf(matches[0]);
}

var socket = io.connect(location.origin);

socket.on("init", function(update) {
    db = update;
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
