const { DataTypes } = require('sequelize');
const sequelize = require("../Database/database");

const CollectionEntry = sequelize.define('Collection_Entry',{
    col_entry_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement: true,
        //defaultValue: literal("nextval('custom_sequence')"),
        //defaultValue:1,
    }
})

module.exports = CollectionEntry