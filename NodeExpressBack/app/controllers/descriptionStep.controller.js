const db = require("../models");
const DescriptionStep = db.descriptionStep;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new DescriptionStep
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nameStep || !req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a DescriptionStep
    let descriptionStep;
    if(!req.body.ingredients){
        descriptionStep = {
            nameStep: req.body.nameStep,
            description: req.body.description,
            duration: req.body.duration
        };
        // Save DescriptionStep in the database
        DescriptionStep.create(descriptionStep)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the DescriptionStep."
                });
            });
    }
    else{
        descriptionStep = {
            nameStep: req.body.nameStep,
            description: req.body.description,
            ingredients: req.body.ingredients,
            duration: req.body.duration
        };
        // Save DescriptionStep and Ingredients in the database
        DescriptionStep.create(descriptionStep, {include: Ingredient})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the DescriptionStep."
                });
            });
    }
};

// Retrieve all DescriptionSteps from the database.
exports.findAll = (req, res) => {
    DescriptionStep.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving descriptionSteps."
            })
        })
};

// Find a single DescriptionStep with an id
exports.findOne = (req, res) => {
    const numDescriptionStep = req.params.id;
    DescriptionStep.findByPk(numDescriptionStep, {include: Ingredient})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find DescriptionStep with code=${numDescriptionStep}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving DescriptionStep with code=" + numDescriptionStep
            });
        });
};

// Update a DescriptionStep by the id in the request
exports.update = (req, res) => {
    const numDescriptionStep = req.params.id;

    DescriptionStep.update(req.body, {
        where: { numDescriptionStep: numDescriptionStep }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "DescriptionStep was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update DescriptionStep with code=${numDescriptionStep}. Maybe DescriptionStep was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating DescriptionStep with code=" + numDescriptionStep
            });
        });
};

// Delete a DescriptionStep with the specified id in the request
exports.delete = (req, res) => {
    const numDescriptionStep = req.params.id;

    DescriptionStep.destroy({
        where: { numDescriptionStep: numDescriptionStep }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "DescriptionStep was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete DescriptionStep with code=${numDescriptionStep}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete DescriptionStep with code=" + numDescriptionStep
            });
        });
};