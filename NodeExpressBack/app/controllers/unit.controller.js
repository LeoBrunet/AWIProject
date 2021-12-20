const db = require("../models");
const Unit = db.unit;
const Op = db.Sequelize.Op;

// Create and Save a new Unit
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Unit
    const unit = {
        label: req.body.label,
    };

    // Save Unit in the database
    Unit.create(unit)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Unit."
            });
        });
};

// Retrieve all Units from the database.
exports.findAll = (req, res) => {
    Unit.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving units."
            })
        })
};

// Find a single Unit with an id
exports.findOne = (req, res) => {
    const label = req.params.id;
    Unit.findByPk(label)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Unit with label=${label}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Unit with label=" + label
            });
        });
};

// Update a Unit by the id in the request
exports.update = (req, res) => {
    const label = req.params.id;

    Unit.update(req.body, {
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Unit was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Unit with label=${label}. Maybe Unit was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Unit with label=" + label
            });
        });
};

// Delete a Unit with the specified id in the request
exports.delete = (req, res) => {
    const label = req.params.id;

    Unit.destroy({
        where: { label: label }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Unit was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Unit with label=${label}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Unit with label=" + label
            });
        });
};