const { DataTypes } = require('sequelize');
const sequelize = require("../Database/database");


/**
 * @typedef User
 * @property {number} id - user id number. Generated automatically by db
 * @property {string} username.required - user login name
 * @property {string} password_hash.required - user password
 * @property {string} email.required - user mail
 * @property {boolean} verified - states wheter the user has verified his account or not.
 */
const User = sequelize.define('User',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement: true,
        //defaultValue: literal("nextval('custom_sequence')"),
        //defaultValue:1,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password_hash:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
    },
    image:{
        type:DataTypes.JSON, 
    },
    verified:{
        type:DataTypes.BOOLEAN,
    }
})

module.exports = User;