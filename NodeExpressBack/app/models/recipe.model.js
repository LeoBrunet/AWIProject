const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipe", {
        num_recipe: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name_recipe: {
            type: DataTypes.STRING
        },
        nb_diner: {
            type: DataTypes.INTEGER
        },
        author :{
            type: DataTypes.INTEGER
        },
        image :{
            type: DataTypes.STRING
        }
    });

    return Recipe;
};