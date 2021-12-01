const db = require("../models");
const Allergene = db.allergenes;
const Op = db.Sequelize.Op;

// Create and Save a new Allergene
exports.create = (req, res) => {
    // Validate request
    if (!req.body.code_allergene || !req.body.libelle_allergene) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Allergene
    const allergene = {
        code_allergene: req.body.code_allergene,
        libelle_allergene: req.body.libelle_allergene,
    };

    // Save Allergene in the database
    Allergene.create(allergene)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Allergene."
            });
        });
};

// Retrieve all Allergenes from the database.
exports.findAll = (req, res) => {
    Allergene.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving allergenes."
            })
        })
};

// Find a single Allergene with an id
exports.findOne = (req, res) => {
    const code_allergene = req.params.id;
    Allergene.findByPk(code_allergene)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Allergene with code=${code_allergene}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Allergene with code=" + code_allergene
            });
        });
};

// Update a Allergene by the id in the request
exports.update = (req, res) => {
    const code_allergene = req.params.id;

    Allergene.update(req.body, {
        where: { code_allergene: code_allergene }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Allergene was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Allergene with code=${code_allergene}. Maybe Allergene was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Allergene with code=" + code_allergene
            });
        });
};

// Delete a Allergene with the specified id in the request
exports.delete = (req, res) => {
    const code_allergene = req.params.id;

    Allergene.destroy({
        where: { code_allergene: code_allergene }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Allergene was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Allergene with code=${code_allergene}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Allergene with code=" + code_allergene
            });
        });
};