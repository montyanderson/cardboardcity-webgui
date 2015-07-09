module.exports = function() {
    $("#new .post").click(function() {
        socket.emit("suggestion", $("#new .name").val());

    });

    $("#login .post").click(function() {
        socket.emit("login", $("#login .password").val());
    });
};
