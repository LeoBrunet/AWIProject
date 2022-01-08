const cost = require("../controllers/cost.controller");
module.exports = app => {
    const cost = require("../controllers/cost.controller.js");

    var router = require("express").Router();

    // Create a new Allergen
    router.post("/", cost.create);

    // Retrieve all Allergens
    router.get("/", cost.findAll);

    // Retrieve a single Allergen with id
    router.get("/:id", cost.findOne);

    // Update a Allergen with id
    router.put("/:id", cost.update);

    // Delete a Allergen with id
    router.delete("/:id", cost.delete);

    app.use('/api/cost', router);
};