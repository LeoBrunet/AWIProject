module.exports = app => {
    const generalStep = require("../controllers/generalStep.controller.js");

    var router = require("express").Router();

    // Create a new GeneralStep
    router.post("/", generalStep.create);

    router.post("/desc", generalStep.createGeneralAndDescriptionStep)

    // Retrieve all GeneralSteps for a given Recipe and the description of DescriptionSteps
    router.get("/allOfRecipe/:id", generalStep.findAllOfARecipe);

    // Retrieve a single GeneralStep with id
    router.get("/:id", generalStep.findOne);

    // Update a GeneralStep with id
    router.put("/:id", generalStep.update);

    // Delete a GeneralStep with id
    router.delete("/:id", generalStep.delete);

    app.use('/api/generalStep', router);
};