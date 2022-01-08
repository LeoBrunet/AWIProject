module.exports = app => {
    const ingredient = require("../controllers/ingredient.controller.js");

    var router = require("express").Router();

    // Create a new Types_ingredients
    router.post("/", ingredient.create);

    // Retrieve all Types_ingredients
    router.get("/", ingredient.findAll);

    // Retrieve a single Types_ingredients with id
    router.get("/:id", ingredient.findOne);

    // Update a Types_ingredients with id
    router.put("/:id", ingredient.update);

    // Delete a Types_ingredients with id
    router.delete("/:id", ingredient.delete);

    router.put("/add/:id", ingredient.incrementStock);

    app.use('/api/ingredient', router);
};