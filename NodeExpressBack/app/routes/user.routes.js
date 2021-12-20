module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new Utilisateur
    router.post("/", user.create);

    // Retrieve all Utilisateurs
    router.get("/", user.findAll);
    
    // Retrieve a single Utilisateur with id
    router.get("/:id", user.findOne);

    // Update a Utilisateur with id
    router.put("/:id", user.update);

    // Delete a Utilisateur with id
    router.delete("/:id", user.delete);

    app.use('/api/user', router);
};