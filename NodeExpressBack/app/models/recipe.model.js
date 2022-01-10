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
        },
        idCategory:{
            type: DataTypes.INTEGER,
            references: {
                model: "categories",
                key: "idCategory",
                foreignKey: "idCategory"
            }
        },
        description:{
            type:DataTypes.STRING(2000)
        }
    });

    return Recipe;
};