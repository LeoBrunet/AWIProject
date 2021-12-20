module.exports = app => {
    const ingredientType = require("../controllers/ingredientType.controller.js");

    var router = require("express").Router();

    // Create a new Types_ingredients
    router.post("/", ingredientType.create);

    // Retrieve all Types_ingredients
    router.get("/", ingredientType.findAll);

    // Retrieve a single Types_ingredients with id
    router.get("/:id", ingredientType.findOne);

    // Update a Types_ingredients with id
    router.put("/:id", ingredientType.update);

    // Delete a Types_ingredients with id
    router.delete("/:id", ingredientType.delete);

    app.use('/api/ingredientType', router);
};