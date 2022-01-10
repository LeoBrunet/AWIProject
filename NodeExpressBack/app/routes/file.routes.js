module.exports = app => {
    const file = require("../controllers/file.controller.js");
    var router = require("express").Router();

    router.post("/upload", file.upload);
    router.get("/", file.getListFiles);
    router.get("/:name", file.download);

    app.use('/api/file', router);
}
