const db = require("../models");
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new Ingredient
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nameIngredient || !req.body.unitePrice) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Ingredient
    const ingredient = {
        nameIngredient: req.body.nameIngredient,
        unitePrice: req.body.unitePrice,
        codeAllergen: req.body.codeAllergen,
        labelType: req.body.labelType,
        labelUnit: req.body.labelUnit
    };

    // Save Ingredient in the database
    Ingredient.create(ingredient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Ingredient."
            });
        });
};

// Retrieve all Ingredients from the database.
exports.findAll = (req, res) => {
    Ingredient.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving ingredients."
            })
        })
};

// Find a single Ingredient with an id
exports.findOne = (req, res) => {
    const numIngredient = req.params.id;
    Ingredient.findByPk(numIngredient)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Ingredient with numIngredient=${numIngredient}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ingredient with numIngredient=" + numIngredient
            });
        });
};

// Update a Ingredient by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const ingredient = {
        nameIngredient: req.body.nameIngredient,
        unitePrice: req.body.unitePrice,
        codeAllergen: req.body.codeAllergen,
        labelType: req.body.labelType,
        labelUnite: req.body.labelType
    };

    Ingredient.update(ingredient, {
        where: { numIngredient: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ingredient was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ingredient with numIngredient=${id}. Maybe Ingredient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ingredient with numIngredient=" + id
            });
        });
};

// Delete a Ingredient with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Ingredient.destroy({
        where: { numIngredient: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ingredient with numIngredient=${id}. Maybe Ingredient was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ingredient with numIngredient=" + id
            });
        });
};