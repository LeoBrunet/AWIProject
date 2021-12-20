const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const GeneralStep = sequelize.define('generalStep', {
        numStep:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        position: {
            type: DataTypes.STRING
        },
        numDescriptionStep:{
            type: DataTypes.INTEGER,
            references: {
                model: "descriptionSteps",
                key: "numDescriptionStep",
                foreignKey: "numDescriptionStep"
            }
        },
        recipeStep:{
            type: DataTypes.INTEGER,
            references: {
                model: "recipes",
                key: "numRecipe",
                foreignKey : "recipeStep"
            }
        }
    },
    {
        sequelize,
        validate:{
            oneOrAnother() {
                if ((this.numDescriptionStep != null & this.recipeStep != null) || (this.numDescriptionStep === null & this.recipeStep === null)) {
                    throw new Error('descriptionStep or recipeStep !');
                }
            }
        }
    });

    return GeneralStep;
};