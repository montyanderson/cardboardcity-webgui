module.exports = function() {
    $(document).ready(function() {
        $("#new .post").click(function() {
            socket.emit("suggestion", $("#new .name").val());
        });
    });
};
