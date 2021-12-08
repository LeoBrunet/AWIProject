const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        numUser:{
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nameUser:{
            type: DataTypes.STRING
        },
        firstNameUser:{
            type: DataTypes.STRING
        },
        mail:{
            type: DataTypes.STRING,
            validate : {
                isEmail : true
            }
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        password:{
            type:DataTypes.STRING,
        }
    });

    return User;
};