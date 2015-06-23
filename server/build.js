function build() {
    var fs = require("fs"),
        path = require("path"),
        less = require("less"),
        browserify = require("browserify");

    console.log("Building stylesheets...");
    var stylesheet = __dirname + "/../style/style.less";

    less.render(fs.readFileSync(stylesheet).toString(), {
        //filename: path.resolve(stylesheet)
    }, function(e, output) {
        if(!e) {
            fs.writeFileSync(__dirname + "/../public/bundle.css", output.css);
        } else {
            console.log("Failed to build stylesheets.");
        }
    });

    console.log("Building client scripts...");
    var JSbundle = fs.createWriteStream(__dirname + "/../public/bundle.js");
    browserify().add(__dirname + "/../client/client.js").bundle().pipe(JSbundle);


}

module.exports = build;
