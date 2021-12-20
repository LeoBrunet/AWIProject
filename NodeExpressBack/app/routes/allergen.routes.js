module.exports = app => {
    const allergen = require("../controllers/allergen.controller.js");

    var router = require("express").Router();

    // Create a new Allergen
    router.post("/", allergen.create);

    // Retrieve all Allergens
    router.get("/", allergen.findAll);

    // Retrieve a single Allergen with id
    router.get("/:id", allergen.findOne);

    // Update a Allergen with id
    router.put("/:id", allergen.update);

    // Delete a Allergen with id
    router.delete("/:id", allergen.delete);

    app.use('/api/allergen', router);
};