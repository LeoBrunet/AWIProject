const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define('ingredient', {
        numIngredient:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        nameIngredient:{
            type: DataTypes.STRING
        },
        unitePrice:{
            type: DataTypes.REAL
        }
    });

    return Ingredient;
};