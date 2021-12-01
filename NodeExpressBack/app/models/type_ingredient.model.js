const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Type_ingredient = sequelize.define('type_ingredient', {
        libelle_type:{
            type: DataTypes.STRING,
            primaryKey : true
        }
    });

    return Type_ingredient;
};