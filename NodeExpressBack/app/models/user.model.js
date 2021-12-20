const {DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        numUser:{
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nameUser:{
            type: DataTypes.STRING,
            allowNull: false
        },
        firstNameUser:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mail:{
            type: DataTypes.STRING,
            validate : {
                isEmail : true
            },
            allowNull: false
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate:async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            },
            instanceMethods: {
                validPassword: (password) => {
                    return bcrypt.compareSync(password, this.password);
                }
            }
        });
    User.prototype.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }

    return User;
};