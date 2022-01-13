const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const DescriptionStep = sequelize.define('descriptionStep', {
        numDescriptionStep:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true
        },
        nameStep:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING(5000)
        },
        duration:{
            type: DataTypes.INTEGER,
            defaultValue : 0
        }
    });

    return DescriptionStep;
};