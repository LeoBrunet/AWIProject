const db = require("../models");
const IngredientType = db.ingredientType;
const Op = db.Sequelize.Op;

// Create and Save a new IngredientType
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a IngredientType
    const type = {
        label: req.body.label,
    };

    // Save IngredientType in the database
    IngredientType.create(type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the IngredientType."
            });
        });
};

// Retrieve all IngredientTypes from the database.
exports.findAll = (req, res) => {
    IngredientType.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving types."
            })
        })
};

// Find a single IngredientType with an id
exports.findOne = (req, res) => {
    const label = req.params.id;
    IngredientType.findByPk(label)
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
                message: "Error retrieving IngredientType with label=" + label
            });
        });
};

// Update a IngredientType by the id in the request
exports.update = (req, res) => {
    const label = req.params.id;

    IngredientType.update(req.body, {
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IngredientType was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update IngredientType with label=${label}. Maybe IngredientType was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating IngredientType with label=" + label
            });
        });
};

// Delete a IngredientType with the specified id in the request
exports.delete = (req, res) => {
    const label = req.params.id;

    IngredientType.destroy({
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "IngredientType was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete IngredientType with label=${label}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete IngredientType with label=" + label
            });
        });
};