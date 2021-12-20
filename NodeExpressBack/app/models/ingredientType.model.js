const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const ingredientType = sequelize.define('ingredientType', {
        label:{
            type: DataTypes.STRING,
            primaryKey : true
        }
    });

    return ingredientType;
};