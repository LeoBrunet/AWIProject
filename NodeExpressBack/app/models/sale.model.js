const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define('sale', {
        numSale:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        nbPortion:{
            type: DataTypes.INTEGER
        },
        saleDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    return Sale;
};