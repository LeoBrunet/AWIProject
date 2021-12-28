module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");

    var router = require("express").Router();

    // Create a new Categories
    router.post("/", recipes.create);

    // Retrieve all Categories
    router.get("/", recipes.findAll);

    // Retrieve a single Categories with id
    router.get("/:id", recipes.findOne);

    // Update a Categories with id
    router.put("/:id", recipes.update);

    // Delete a Categories with id
    router.delete("/:id", recipes.delete);

    app.use('/api/recipe', router);
};