const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Cost = sequelize.define('cost', {
        numCost:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        hourlyEmployeeCost:{
            type: DataTypes.REAL
        },
        hourlyFluidCost:{
            type: DataTypes.REAL
        },
        multiplierCoefficient: {
            type: DataTypes.REAL
        }
    });

    return Cost;
};