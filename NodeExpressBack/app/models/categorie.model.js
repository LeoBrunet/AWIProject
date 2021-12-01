const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Categorie = sequelize.define('categorie', {
        libelle_categorie:{
            type: DataTypes.STRING,
            primaryKey : true
        }
    });

    return Categorie;
};