const recipes = require("../controllers/recipe.controller.js");
module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");

    var router = require("express").Router();

    // Create a new Recipe
    router.post("/", recipes.create);

    // Retrieve all Recipes
    router.get("/", recipes.findAll);

    // Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);

    // Update a Recipe with id
    router.put("/:id", recipes.update);

    // Delete a Recipe with id
    router.delete("/:id", recipes.delete);

    // Retrieve all ingredients of a Recipe
    router.get("/ingredients/:id", recipes.findAllIngredients);

    router.post("/sell/:id", recipes.sell);

    app.use('/api/recipe', router);
};