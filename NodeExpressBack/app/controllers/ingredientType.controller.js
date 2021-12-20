const db = require("../models");
const IngredientTypeController = db.ingredientType;
const Op = db.Sequelize.Op;

// Create and Save a new IngredientTypeController
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a IngredientTypeController
    const type = {
        label: req.body.label,
    };

    // Save IngredientTypeController in the database
    IngredientTypeController.create(type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the IngredientTypeController."
            });
        });
};

// Retrieve all IngredientTypes from the database.
exports.findAll = (req, res) => {
    IngredientTypeController.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving types."
            })
        })
};

// Find a single IngredientTypeController with an id
exports.findOne = (req, res) => {
    const label = req.params.id;
    IngredientTypeController.findByPk(label)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find IngredientType with label=${label}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving IngredientTypeController with label=" + label
            });
        });
};

// Update a IngredientTypeController by the id in the request
exports.update = (req, res) => {
    const label = req.params.id;

    IngredientTypeController.update(req.body, {
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IngredientTypeController was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update IngredientType with label=${label}. Maybe IngredientType was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating IngredientTypeController with label=" + label
            });
        });
};

// Delete a IngredientTypeController with the specified id in the request
exports.delete = (req, res) => {
    const label = req.params.id;

    IngredientTypeController.destroy({
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IngredientTypeController was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete IngredientType with label=${label}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete IngredientTypeController with label=" + label
            });
        });
};