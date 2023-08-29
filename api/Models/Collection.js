const { DataTypes } = require('sequelize');
const sequelize = require("../Database/database");


const Collection = sequelize.define('Collection',{
    collection_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    }
})

module.exports = Collection