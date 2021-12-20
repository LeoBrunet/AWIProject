const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipe", {
        numRecipe: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name: {
            type: DataTypes.STRING
        },
        nbDiners: {
            type: DataTypes.INTEGER
        },
        image :{
            type: DataTypes.STRING
        }
    });

    return Recipe;
};