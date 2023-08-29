const {DataTypes} = require("sequelize")
const sequelize = require("../Database/database")


const Media = sequelize.define('Media',{
    media_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
        //unique:true
    },
    type:{
        type:DataTypes.ENUM('Film','TVShow','Videogame','Book','Comic','Other'),
        allowNull:false
    },
    genre:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.TEXT
    },
    cover:{
        type:DataTypes.JSON
    },
    duration:{
        type:DataTypes.STRING
    }
})

module.exports = Media