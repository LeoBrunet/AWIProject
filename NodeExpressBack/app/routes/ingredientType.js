module.exports = app => {
    const types_ingredients = require("../controllers/ingredientType.js");

    var router = require("express").Router();

    // Create a new Types_ingredients
    router.post("/", types_ingredients.create);

    // Retrieve all Types_ingredients
    router.get("/", types_ingredients.findAll);

    // Retrieve a single Types_ingredients with id
    router.get("/:id", types_ingredients.findOne);

    // Update a Types_ingredients with id
    router.put("/:id", types_ingredients.update);

    // Delete a Types_ingredients with id
    router.delete("/:id", types_ingredients.delete);

    app.use('/api/types_ingredients', router);
};