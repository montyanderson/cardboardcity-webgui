var fs = require("fs"),
    glob = require("glob"),
    marked = require("marked");

module.exports = function(callback) {
    glob(__dirname + "/*.md", function(globErr, data) {
        data.forEach(function(file) {
            fs.readFile(file, function(fileErr, markdown) {
                if(!fileErr) {
                    callback({
                        name: file.replace(__dirname + "/", "").replace(".md", ""),
                        html: marked(markdown.toString())
                    });
                }
            });
        });
    });
};
