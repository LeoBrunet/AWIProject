module.exports = app => {
    const unit = require("../controllers/unit.controller.js");

    var router = require("express").Router();

    // Create a new Unit
    router.post("/", unit.create);

    // Retrieve all Units
    router.get("/", unit.findAll);

    // Retrieve a single Unit with id
    router.get("/:id", unit.findOne);

    // Update a Unit with id
    router.put("/:id", unit.update);

    // Delete a Unit with id
    router.delete("/:id", unit.delete);

    app.use('/api/unit', router);
};