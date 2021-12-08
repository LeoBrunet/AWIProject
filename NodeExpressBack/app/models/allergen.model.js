const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Allergen = sequelize.define('allergen', {
        codeAllergen:{
            type: DataTypes.INTEGER,
            primaryKey : true
        },
        label:{
            type: DataTypes.STRING
        }
    });

    return Allergen;
};