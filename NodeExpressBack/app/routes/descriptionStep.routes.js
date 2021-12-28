module.exports = app => {
    const descriptionStep = require("../controllers/descriptionStep.controller.js");

    var router = require("express").Router();

    // Create a new GeneralStep
    router.post("/", descriptionStep.create);

    // Retrieve all GeneralSteps for a given Recipe and the description of DescriptionSteps
    router.get("/:id", descriptionStep.findAll);

    // Retrieve a single GeneralStep with id
    router.get("/:id", descriptionStep.findOne);

    // Update a GeneralStep with id
    router.put("/:id", descriptionStep.update);

    // Delete a GeneralStep with id
    router.delete("/:id", descriptionStep.delete);

    app.use('/api/descriptionStep', router);
};