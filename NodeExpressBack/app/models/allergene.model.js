const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Allergene = sequelize.define('allergene', {
        code_allergene:{
            type: DataTypes.INTEGER,
            primaryKey : true
        },
        libelle_allergene:{
            type: DataTypes.STRING
        }
    });

    return Allergene;
};