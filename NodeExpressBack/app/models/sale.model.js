const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define('sale', {
        numSale:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        quantity:{
            type: DataTypes.INTEGER
        },
        saleDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        cost:{
            type:DataTypes.REAL
        },
        price:{
            type:DataTypes.REAL
        }
    });

    return Sale;
};