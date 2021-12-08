const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('category', {
        label:{
            type: DataTypes.STRING,
            primaryKey : true
        }
    });

    return Category;
};