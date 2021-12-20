const db = require("../models");
const Allergen = db.allergen;
const Op = db.Sequelize.Op;

// Create and Save a new Allergen
exports.create = (req, res) => {
    // Validate request
    if (!req.body.codeAllergen || !req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Allergen
    const allergen = {
        codeAllergen: req.body.codeAllergen,
        label: req.body.label,
    };

    // Save Allergen in the database
    Allergen.create(allergen)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Allergen."
            });
        });
};

// Retrieve all Allergens from the database.
exports.findAll = (req, res) => {
    Allergen.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving allergens."
            })
        })
};

// Find a single Allergen with an id
exports.findOne = (req, res) => {
    const codeAllergen = req.params.id;
    Allergen.findByPk(codeAllergen)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Allergen with code=${codeAllergen}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Allergen with code=" + codeAllergen
            });
        });
};

// Update a Allergen by the id in the request
exports.update = (req, res) => {
    const codeAllergen = req.params.id;

    Allergen.update(req.body, {
        where: { codeAllergen: codeAllergen }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Allergen was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Allergen with code=${codeAllergen}. Maybe Allergen was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Allergen with code=" + codeAllergen
            });
        });
};

// Delete a Allergen with the specified id in the request
exports.delete = (req, res) => {
    const codeAllergen = req.params.id;

    Allergen.destroy({
        where: { codeAllergen: codeAllergen }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Allergen was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Allergen with code=${codeAllergen}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Allergen with code=" + codeAllergen
            });
        });
};