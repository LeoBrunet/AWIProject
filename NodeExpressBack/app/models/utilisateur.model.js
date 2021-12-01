const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define('utilisateur', {
        num_utilisateur:{
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nom_utilisateur:{
            type: DataTypes.STRING
        },
        prenom_utilisateur:{
            type: DataTypes.STRING
        },
        mail:{
            type: DataTypes.STRING
        },
        is_admin:{
            type: DataTypes.BOOLEAN
        }
    });

    return Utilisateur;
};