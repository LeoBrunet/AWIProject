module.exports = app => {
    const categories = require("../controllers/categorie.controller.js");

    var router = require("express").Router();

    // Create a new Categories
    router.post("/", categories.create);

    // Retrieve all Categories
    router.get("/", categories.findAll);

    // Retrieve a single Categories with id
    router.get("/:id", categories.findOne);

    // Update a Categories with id
    router.put("/:id", categories.update);

    // Delete a Categories with id
    router.delete("/:id", categories.delete);

    app.use('/api/categories', router);
};