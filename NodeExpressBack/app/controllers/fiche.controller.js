const db = require("../models");
const Fiche = db.fiches;
const Op = db.Sequelize.Op;

// Create and Save a new Fiche
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom_fiche || !req.body.nb_couvert || !req.body.auteur) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Fiche
    const fiche = {
        nom_fiche: req.body.nom_fiche,
        nb_couvert: req.body.nb_couvert,
        auteur : req.body.auteur
    };

    // Save Fiche in the database
    Fiche.create(fiche)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fiche."
            });
        });
};

// Retrieve all Utilisateurs from the database.
exports.findAll = (req, res) => {
    Fiche.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving fiches."
            })
        })
};

// Find a single Utilisateur with an id
exports.findOne = (req, res) => {
    const num_fiche = req.params.id;
    Fiche.findByPk(num_fiche)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Fiche with id=${num_fiche}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Fiche with id=" + num_fiche
            });
        });
};

// Update a Utilisateur by the id in the request
exports.update = (req, res) => {
    const num_fiche = req.params.id;

    Fiche.update(req.body, {
        where: { num_fiche: num_fiche }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fiche was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Fiche with num_fiche=${num_fiche}. Maybe Fiche was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Fiche with num_fiche=" + num_fiche
            });
        });
};

// Delete a Utilisateur with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Fiche.destroy({
        where: { num_fiche: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Fiche was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Fiche with num_fiche=${id}. Maybe Fiche was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Fiche with num_fiche=" + id
            });
        });
};