var socket = io.connect(location.origin);

var db;

function renderBuildings() {
    $("#buildings").html("");

    db.buildings.sort(function(a, b) {
        if(a.votes < b.votes) {
            return 1;
        } else {
            return -1;
        }
    });

    db.buildings.forEach(function(building) {
        console.log(building);

        building.up = false;
        building.down = false;
        building.zero = false;

        if(building.votes > 0) {
            building.up = true;
        } else if(building.votes < 0) {
            building.down = true;
        } else if(building.votes == 0) {
            building.zero = true;
        }

        $("#buildings").append(
            Mustache.render($("#template-building").html(), building)
        );

        $(".vote-up[data-id=" + building.id + "]").click(function() {
            socket.emit("vote-up", building.id);
        });

        $(".vote-down[data-id=" + building.id + "]").click(function() {
            socket.emit("vote-down", building.id);
        });
    });
}

socket.on("init", function(update) {
    db = update;
    renderBuildings();
});

socket.on("vote-up", function(id) {
    db.buildings[id].votes += 1;
    renderBuildings();
});

socket.on("vote-down", function(id) {
    db.buildings[id].votes -= 1;
    renderBuildings();
});
