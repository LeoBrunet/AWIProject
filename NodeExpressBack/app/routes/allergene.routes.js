const allergenes = require("../controllers/allergene.controller.js");
module.exports = app => {
    const allergenes = require("../controllers/allergene.controller.js");

    var router = require("express").Router();

    // Create a new Utilisateur
    router.post("/", allergenes.create);

    // Retrieve all Utilisateurs
    router.get("/", allergenes.findAll);

    // Retrieve a single Utilisateur with id
    router.get("/:id", allergenes.findOne);

    // Update a Utilisateur with id
    router.put("/:id", allergenes.update);

    // Delete a Utilisateur with id
    router.delete("/:id", allergenes.delete);

    app.use('/api/allergenes', router);
};