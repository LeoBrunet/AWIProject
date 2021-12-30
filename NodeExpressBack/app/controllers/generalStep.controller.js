const db = require("../models");
const GeneralStep = db.generalStep;
const DescriptionStep = db.descriptionStep;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;

// Create and Save a new GeneralStep
exports.create = (req, res) => {
    // Validate request
    if (!req.body.position || (!req.body.numDescriptionStep && !req.body.recipeStep) || !req.body.proprietaryRecipe) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a GeneralStep
    const generalStep = {
        position: req.body.position,
        numDescriptionStep: req.body.numDescriptionStep,
        recipeStep: req.body.recipeStep,
        proprietaryRecipe: req.body.proprietaryRecipe
    };

    // Save GeneralStep in the database
    GeneralStep.create(generalStep)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the GeneralStep."
            });
        });
};

exports.createGeneralAndDescriptionStep = async (req, res) => {
    if (!req.body.position || !req.body.proprietaryRecipe || !req.body.nameStep || !req.body.description) {
        console.log(req.body)
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const generalStep = {
        position: req.body.position,
        proprietaryRecipe: req.body.proprietaryRecipe,
        descriptionStep: {
            nameStep: req.body.nameStep,
            description: req.body.description,
        }
    };

    let dataToScend;
    let check;

    GeneralStep.create(generalStep, {include: [DescriptionStep]})
        .then(data => {
            ingredients = JSON.parse(req.body.ingredients);
            for(i=0; i<ingredients.length; i++){
                data.descriptionStep.addIngredients(ingredients[i].numIngredient, {through: {quantity: ingredients[i].quantity}});
            }
            res.send(data);
        })
        .catch(err => {
            check = false;
            dataToScend = err;
        })


}

// Retrieve all GeneralSteps for a Recipe from the database.
exports.findAllOfARecipe = (req, res) => {
    GeneralStep.findAll({where : {proprietaryRecipe: req.params.id}, include: DescriptionStep})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving generalSteps."
            })
        })
};

// Find a single GeneralStep with an id
exports.findOne = (req, res) => {
    const numGeneralStep = req.params.id;
    GeneralStep.findByPk(numGeneralStep)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find GeneralStep with numGeneralStep=${numGeneralStep}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving GeneralStep with numGeneralStep=" + numGeneralStep
            });
        });
};

// Update a GeneralStep by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    const generalStep = {
        position: req.body.position,
        numDescriptionStep: req.body.numDescriptionStep,
        recipeStep: req.body.recipeStep
    };

    GeneralStep.update(generalStep, {
        where: { numGeneralStep: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "GeneralStep was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update GeneralStep with numGeneralStep=${id}. Maybe GeneralStep was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating GeneralStep with numGeneralStep=" + id
            });
        });
};

// Delete a GeneralStep with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    GeneralStep.destroy({
        where: { numGeneralStep: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Utilisateur was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete GeneralStep with numGeneralStep=${id}. Maybe GeneralStep was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GeneralStep with numGeneralStep=" + id
            });
        });
};
