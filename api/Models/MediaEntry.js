const { DataTypes } = require('sequelize');
const sequelize = require("../Database/database");

const Entry = sequelize.define('Entry',{
    entry_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement: true,
        //defaultValue: literal("nextval('custom_sequence')"),
        //defaultValue:1,
    },
    review:{
        type:DataTypes.TEXT
    },
    state:{
        type:DataTypes.ENUM('finished','on hold','to date','bookmarked','repeating','repeated')
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    finish_date:{
        type:DataTypes.DATE,
        allowNull:true
    }
})

module.exports = Entry