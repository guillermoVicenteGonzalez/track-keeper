const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        methodOverride  = require("method-override"),
        cors            = require("cors"),
        database        = require("./Database/database"),
        router          = require("./Routes/index"),
        path            = require("path"),
        associations    = require("./Models/Associations")
        winston         = require("./logger/logger")
                          require("dotenv").config({path:"../.env"})

const usersCtrl = require("./Controllers/UserCtrl")

const expressSwagger = require("express-swagger-generator")(app)
let swOptions = {
    swaggerDefinition: {
        info: {
            description: 'Api ',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: process.env.API_HOST  + ":" + process.env.API_PORT,
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: "./",
    //files: ['./controllers/usuariosCtrl.js'] //Path to the API handle folder
    files: ['./controllers/*', './models/*']
};
expressSwagger(swOptions);


app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())
app.use("/api",router)

associations.synchronize();

let port = process.env.API_PORT
console.log(port)
app.listen(process.env.PORT || port, ()=> console.log("Server is running in port: " + process.env.API_PORT))