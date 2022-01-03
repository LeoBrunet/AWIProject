const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define('unit', {
        idUnit:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:{
            type: DataTypes.STRING,
            primaryKey : true
        }
    });

    return Unit;
};