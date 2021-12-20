const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Category
    const category = {
        label: req.body.label,
    };

    // Save Category in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving category."
            })
        })
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const label = req.params.id;
    Category.findByPk(label)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category with label=${label}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with label=" + label
            });
        });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    const label = req.params.id;

    Category.update(req.body, {
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with label=${label}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with label=" + label
            });
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const label = req.params.id;

    Category.destroy({
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with label=${label}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with label=" + label
            });
        });
};