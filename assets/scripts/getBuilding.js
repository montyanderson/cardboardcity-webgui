module.exports = function(id) {/* gets the index of a building in the array */
    var matches = $.grep(db.buildings, function(building) {
        return building.id == id;
    });

    return db.buildings.indexOf(matches[0]);
};
