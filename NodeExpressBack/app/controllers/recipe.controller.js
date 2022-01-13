const db = require("../models");
const Recipe = db.recipe;
const Ingredient = db.ingredient;
const Sale = db.sale;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    console.log(req);
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
        idCategory: req.body.idCategory,
        description: req.body.description,
        image: req.body.image
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
        .then(async data => {
            let resultat = [];
            for (let i = 0; i < data.length; i++) {
                let recipe = data[i];
                let descriptionSteps = await getAllDescriptionStep(recipe)
                recipe = recipe.dataValues
                recipe["ingredientCost"] = await getTotalIngredientCost(descriptionSteps);
                recipe["duration"] = await getTotalDuration(descriptionSteps);
                resultat.push(recipe)
            }
            res.send(resultat);
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

exports.sell = (req, res) => {
    const numRecipe = req.params.id;
    const quantity = req.body.quantity;
    Recipe.findByPk(numRecipe)
        .then(async data => {

            if (data) {
                //Récupère les ingrédients nécessaire à la recette qu'on veut vendre
                let descriptionSteps = await getAllDescriptionStep(data)
                let ingredients = await getAllIngredients(descriptionSteps)

                //Multiplie les quantité d'ingrédient par le nombre de recette vendu
                if(quantity > 1){
                    multiplyQuantity(ingredients, quantity);
                }

                //Récupère les stocks de tout les ingrédients utilisé dans la recette
                let ingredientIdList = [];
                for (let i = 0; i < ingredients.length; i++) {
                    ingredientIdList.push(ingredients[i].numIngredient);
                }
                Ingredient.findAll({where: {numIngredient:{[Op.in]: ingredientIdList}}})
                    .then(async availableIngredients => {
                        if (availableIngredients) {
                            //Vérifie qu'on a assez de quantité pour la vente demandé
                            for (let i = 0; i < ingredients.length; i++) {

                                //Cherche le même ingrédient en stock que celui qu'on est en train de vérifier
                                const isEqual = (element) => element.numIngredient === ingredients[i].numIngredient;
                                let ingInStock = availableIngredients[availableIngredients.findIndex(isEqual)];

                                //On compare le stock et la quantité nécessaire
                                if(ingInStock.stock < ingredients[i].quantity){
                                    //Vente non validé
                                    res.send({
                                        sell: false,
                                        message: "Pas assez de stock pour réaliser cette vente."
                                    });
                                    return;
                                }
                            }

                            for (let i = 0; i < ingredients.length; i++) {

                                //Cherche le même ingrédient en stock que celui qu'on est en train de vérifier
                                const isEqual = (element) => element.numIngredient === ingredients[i].numIngredient;
                                let ingInStock = availableIngredients[availableIngredients.findIndex(isEqual)];

                                ingInStock.increment({stock: -ingredients[i].quantity})
                            }

                            //Vente validé
                            const sale = {
                                numRecipe: numRecipe,
                                quantity: quantity,
                                price: req.body.price,
                                cost : req.body.cost
                            }
                            Sale.create(sale)
                                .then(data => {
                                    res.send({
                                        sell: true,
                                        message: "Vente enregistrée !"
                                    })
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message:
                                            err.message || "Some error occurred while creating the Recipe."
                                    });
                                });
                        }
                        else{
                            res.status(404).send({
                                message: `Cannot find availableIngredients.`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error retrieving ingredientsAvailable"
                        });
                    });
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
}

async function getAllDescriptionStep(recipe) {

    stepToProcess = await recipe.getProprietaryStep();
    let allStep = [];
    while (stepToProcess.length > 0) {
        let step = stepToProcess.pop()
        if (step.recipeStep == null) {
            let dStep = await step.getDescriptionStep();
            allStep.push(dStep);
        } else {
            let r = await step.getRecipeStep();
            let newSteps = await r.getProprietaryStep();
            stepToProcess.concat(newSteps);
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

function multiplyQuantity(ingredients, quantity){
    ingredients = ingredients.map(x => x.quantity = x.quantity * quantity);
    return ingredients;
}