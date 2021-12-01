const db = require("../models");
const Categorie = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Categorie
exports.create = (req, res) => {
    // Validate request
    if (!req.body.libelle_categorie) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Categorie
    const categorie = {
        libelle_categorie: req.body.libelle_categorie,
    };

    // Save Categorie in the database
    Categorie.create(categorie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Categorie."
            });
        });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    Categorie.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving categories."
            })
        })
};

// Find a single Categorie with an id
exports.findOne = (req, res) => {
    const libelle_categorie = req.params.id;
    Categorie.findByPk(libelle_categorie)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Categorie with libelle=${libelle_categorie}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Categorie with libelle=" + libelle_categorie
            });
        });
};

// Update a Categorie by the id in the request
exports.update = (req, res) => {
    const libelle_categorie = req.params.id;

    Categorie.update(req.body, {
        where: { libelle_categorie: libelle_categorie }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categorie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Categorie with libelle=${libelle_categorie}. Maybe Categorie was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Categorie with libelle=" + libelle_categorie
            });
        });
};

// Delete a Categorie with the specified id in the request
exports.delete = (req, res) => {
    const libelle_categorie = req.params.id;

    Categorie.destroy({
        where: { libelle_categorie: libelle_categorie }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Categorie was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Categorie with libelle=${libelle_categorie}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Categorie with libelle=" + libelle_categorie
            });
        });
};