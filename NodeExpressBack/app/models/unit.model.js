const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define('unit', {
        label:{
            type: DataTypes.STRING,
            primaryKey : true
        }
    });

    return Unit;
};