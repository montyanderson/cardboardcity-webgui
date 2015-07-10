var fs = require("fs"),
    express = require("express"),
    async = require("async"),
    Mustache = require("mustache"),
    marked = require("marked");

var router = express.Router();

router.get("/", function(req, res) {
    var files = [
        __dirname + "/templates/index.mustache",
        __dirname + "/templates/building.mustache",
        __dirname + "/readme.md",
        __dirname + "/about.md"
    ];

    async.map(files, fs.readFile, function(err, results) {
        if(!err) {
            var html = Mustache.render(results[0].toString(), {
                // Variables
                building: results[1].toString(),
                modals: [
                    {
                        id: "readme",
                        html: marked(results[2].toString())
                    },
                    {
                        id: "about",
                        html: marked(results[3].toString())
                    }
                ]
            });

            res.end(html);
        }
    });
});

router.get("/json", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.sendFile(__dirname + "/db.json");
});

module.exports = router;
