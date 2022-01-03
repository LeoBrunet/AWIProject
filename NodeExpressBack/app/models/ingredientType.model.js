const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const ingredientType = sequelize.define('ingredientType', {
        idType:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        label:{
            type: DataTypes.STRING
        }
    });

    return ingredientType;
};