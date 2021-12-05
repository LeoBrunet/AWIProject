const db = require("../models");
const Type_ingredient = db.types_ingredients;
const Op = db.Sequelize.Op;

// Create and Save a new Type_ingredient
exports.create = (req, res) => {
    // Validate request
    if (!req.body.libelle_type) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Type_ingredient
    const type = {
        libelle_type: req.body.libelle_type,
    };

    // Save Type_ingredient in the database
    Type_ingredient.create(type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Type_ingredient."
            });
        });
};

// Retrieve all Type_ingredients from the database.
exports.findAll = (req, res) => {
    Type_ingredient.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving types."
            })
        })
};

// Find a single Type_ingredient with an id
exports.findOne = (req, res) => {
    const libelle_type = req.params.id;
    Type_ingredient.findByPk(libelle_type)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Type_ingredient with libelle=${libelle_type}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Type_ingredient with libelle=" + libelle_type
            });
        });
};

// Update a Type_ingredient by the id in the request
exports.update = (req, res) => {
    const libelle_type = req.params.id;

    Type_ingredient.update(req.body, {
        where: { libelle_type: libelle_type }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Type_ingredient was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Type_ingredient with libelle=${libelle_type}. Maybe Type_ingredient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Type_ingredient with libelle=" + libelle_type
            });
        });
};

// Delete a Type_ingredient with the specified id in the request
exports.delete = (req, res) => {
    const libelle_type = req.params.id;

    Type_ingredient.destroy({
        where: { libelle_type: libelle_type }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Type_ingredient was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Type_ingredient with libelle=${libelle_type}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Type_ingredient with libelle=" + libelle_type
            });
        });
};