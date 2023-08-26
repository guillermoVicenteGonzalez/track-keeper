const winston         = require("../logger/logger")
const UserService     = require("../Services/UserService")

exports.createUser = async function(req,res){
    let username = req.body.username
    let rawPass = req.body.password
    let email = req.body.email


    if(!username || !rawPass || !email){
        let msg = "missing arguments"
        winston.log("info",msg)
        res.status(400).json({message:msg})
        return -1
    }

    let passwdHash = await UserService.generateHash(rawPass)
    let nUser = await UserService.createUserRow(username,passwdHash,email)

    if(nUser){
        res.status(201).json(nUser)
        return true
    }else{
        let msg = "Unable to create the new user"
        winston.log("info",msg)
        res.status(400).json({"message":msg})
        return false
    }
}

exports.test = async function(req,res){
    res.status(200).send("success")
    return true 
}