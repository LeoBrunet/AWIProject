module.exports = app => {
    const fiches = require("../controllers/fiche.controller.js");

    var router = require("express").Router();

    // Create a new Categories
    router.post("/", fiches.create);

    // Retrieve all Categories
    router.get("/", fiches.findAll);

    // Retrieve a single Categories with id
    router.get("/:id", fiches.findOne);

    // Update a Categories with id
    router.put("/:id", fiches.update);

    // Delete a Categories with id
    router.delete("/:id", fiches.delete);

    app.use('/api/fiches', router);
};