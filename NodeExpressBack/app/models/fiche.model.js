module.exports = (sequelize, Sequelize) => {
    const Fiche = sequelize.define("fiche", {
        num_fiche: {
            type: Sequelize.INT,
            primaryKey : true,
            autoIncrement : true
        },
        nom_fiche: {
            type: Sequelize.STRING
        },
        nb_couvert: {
            type: Sequelize.INT
        },
        auteur :{
            type: Sequelize.INT
        }
    });

    return Tutorial;
};