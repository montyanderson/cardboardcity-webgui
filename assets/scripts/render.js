var renderBuildings = require("./render.js");
var getBuilding = require("./getBuilding.js");

module.exports = function() {
    $("#buildings").html("");

    db.buildings.sort(function(a, b) {
        if(a.votes <= b.votes) {
            return 1;
        } else {
            return -1;
        }
    });

    db.buildings.forEach(function(building) {
        if(building.approved === true || admin === true) {
            building.admin = admin;
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
        }
    });

    if($("#buildings").html().trim() === "") {
        $("#buildings").html("<h2>There aren't any buildings. Why not suggest some?</h2>");
    }

    $(".vote-up").click(function() {
        var buildingIndex = getBuilding($(this).data("id"));

        if(db.buildings[buildingIndex].voted === undefined) {
            db.buildings[buildingIndex].voted = true;
            socket.emit("vote-up", $(this).data("id"));
        } else {
            alert("You have already voted on the " + db.buildings[buildingIndex].id + ".");
        }
    });

    $(".vote-down").click(function() {
        var buildingIndex = getBuilding($(this).data("id"));

        if(db.buildings[buildingIndex].voted === undefined) {
            db.buildings[buildingIndex].voted = true;
            socket.emit("vote-down", $(this).data("id"));
        } else {
            alert("You have already voted on the " + db.buildings[buildingIndex].id + ".");
        }
    });

    $(".approve").click(function() {
        if(admin === true) {
            socket.emit("approve", $(this).data("id"));
        }
    });

    $(".unapprove").click(function() {
        if(admin === true) {
            socket.emit("unapprove", $(this).data("id"));
        }
    });
};
