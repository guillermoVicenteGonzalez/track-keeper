const {Sequelize} = require("sequelize")
require("dotenv").config({path:"../.env"})

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENV,/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    port: process.env.DB_PORT,
    logging:false
})

async function testConnection(){
    try {
        //alter = true updates the database if schema has changed
        await sequelize.sync({alter:true});
        await sequelize.authenticate();
        console.log("Database connection succesfull")
        //winston.log("info","Connection has been established succesfully")
    } catch (error) {
        console.log("error connection to database: " +error)
        //winston.log("error",'Unable to connect to the database: ' + error);
    }
}

//testConnection();
module.exports = sequelize;