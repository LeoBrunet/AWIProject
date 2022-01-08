const db = require("../models");
const Recipe = db.recipe;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.nbDiners || !req.body.numUser || !req.body.idCategory) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Recipe
    const recipe = {
        name: req.body.name,
        nbDiners: req.body.nbDiners,
        numUser : req.body.numUser,
        idCategory: req.body.idCategory
    };

    // Save Recipe in the database
    Recipe.create(recipe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Recipe."
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Recipe.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving recipe."
            })
        })
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const numRecipe = req.params.id;
    Recipe.findByPk(numRecipe)
        .then(async data => {
            if (data) {
                let descriptionSteps = await getAllDescriptionStep(data)
                recipe = data.dataValues
                recipe["ingredientCost"] = await getTotalIngredientCost(descriptionSteps);
                recipe["duration"] = await getTotalDuration(descriptionSteps);
                res.send(recipe);
            } else {
                res.status(404).send({
                    message: `Cannot find Recipe with id=${numRecipe}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Recipe with id=" + numRecipe
            });
        });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    const numRecipe = req.params.id;

    Recipe.update(req.body, {
        where: { numRecipe: numRecipe }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Recipe with numRecipe=${numRecipe}. Maybe Recipe was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recipe with numRecipe=" + numRecipe
            });
        });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.destroy({
        where: { numRecipe: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Recipe was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Recipe with numRecipe=${id}. Maybe Recipe was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recipe with numRecipe=" + id
            });
        });
};

// Find a single Recipe with an id
exports.findAllIngredients = (req, res) => {
    const numRecipe = req.params.id;
    Recipe.findByPk(numRecipe)
        .then(async data => {

            if (data) {
                let descriptionSteps = await getAllDescriptionStep(data)
                let ingredients = await getAllIngredients(descriptionSteps)
                res.send(ingredients)
            } else {
                res.status(404).send({
                    message: `Cannot find Recipe with id=${numRecipe}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Recipe with id=" + numRecipe
            });
        });
};

async function getAllDescriptionStep(recipe) {

    stepToProcess = await recipe.getProprietaryStep();
    let allStep = [];
    while (stepToProcess.length > 0) {
        step = stepToProcess.pop()
        if (step.recipeStep == null) {
            dStep = await step.getDescriptionStep();
            allStep.push(dStep);
        } else {
            stepToProcess.concat(step.getRecipe().getGeneralSteps());
        }
    }
    return allStep;
}

async function getAllIngredients(descriptionSteps) {
    ingredientsBrut = [];
    for (let i = 0; i < descriptionSteps.length; i++) {
        step = descriptionSteps[i];
        ig = await step.getIngredients({
            attributes: {exclude: ['ingredientInStep.numIngredient', 'ingredientInStep.numDescriptionStep']}
        })
        ingredientsBrut = ingredientsBrut.concat(ig);
    }


    ingredients = []
    while (ingredientsBrut.length > 0) {
        current = ingredientsBrut.pop();
        current = current.dataValues;
        quantity = current["ingredientInStep"]["quantity"];
        delete current["ingredientInStep"];
        current["quantity"] = quantity;
        maj(current, ingredients);
    }
    return ingredients;
}

function maj(current, ingredients){
    find = false;
    let i = 0
    while (i < ingredients.length && !find) {
        currentKey = ingredients[i]
        if(currentKey["numIngredient"] === current["numIngredient"]){
            currentKey["quantity"] += current["quantity"];
            find = true;
        }
        i++
    }

    if(!find){
        ingredients.push(current)
    }
    return ingredients;
}

async function getTotalIngredientCost(descriptionSteps) {
    ingredients = await getAllIngredients(descriptionSteps);
    cost = 0;
    for (let i = 0; i < ingredients.length; i++) {
        current = ingredients[i]
        cost += current["unitePrice"] * current["quantity"];
    }
    return cost;
}

async function getTotalDuration(descriptionSteps) {
    let timeInMinutes = 0;
    for (let i = 0; i < descriptionSteps.length; i++) {
        timeInMinutes += descriptionSteps[i].duration;
    }
    return timeInMinutes;
}