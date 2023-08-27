const winston         = require("../logger/logger")
const UserService     = require("../Services/UserService")

exports.createUser = async function(req,res){
    let username = req.body.username
    let rawPass = req.body.password
    let email = req.body.email


    if(!username || !rawPass || !email){
        let msg = "missing arguments"
        winston.log("info","createUser: " + msg)
        res.status(400).json({message:msg})
        return -1
    }

    let passwdHash = await UserService.generateHash(rawPass)
    let nUser = await UserService.createUserRow(username,passwdHash,email)

    if(!nUser){
        let msg = "Unable to create the new user"
        winston.log("info","createUser: "+ msg)
        res.status(400).json({"msg":msg})
        return false
    }

    let token = UserService.createToken(username)

    if(token){
        res.status(201).json({user:nUser, jwt:token})
        return true
    }else{
        let msg = "unable to generate jwt"
        winston.log("info","createUser: " + msg)
        res.status(400).json({"msg":msg})
    }
}

exports.userLogin = async function(req,res){
    let username = req.body.username
    let passwd = req.body.password


}
