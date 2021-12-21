const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const IngredientInStep = sequelize.define('ingredientInStep', {
        numDescriptionStep: {
            type: DataTypes.INTEGER,
            references: {
                model: "descriptionSteps",
                key: 'numDescriptionStep',
                foreignKey: 'numDescriptionStep'
            }
        },
        numIngredient: {
            type: DataTypes.INTEGER,
            references: {
                model: "ingredients",
                key: 'numIngredient',
                foreignKey: "numIngredient"
            }
        },
        quantity:{
            type: DataTypes.REAL
        }
    });

    return IngredientInStep;
};