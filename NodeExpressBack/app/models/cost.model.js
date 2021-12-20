const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Cost = sequelize.define('cost', {
        NumCost:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        hourlyCost:{
            type: DataTypes.REAL
        },
        hourlyCostAverage:{
            type: DataTypes.REAL
        },
        time: {
            type: DataTypes.TIME
        },
        multiplierCoefficient: {
            type: DataTypes.REAL
        }
    });

    return Cost;
};