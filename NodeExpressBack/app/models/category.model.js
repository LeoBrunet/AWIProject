const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('category', {
        idCategory:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:{
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        }
    });

    return Category;
};