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

    //verificar existente
    let userExists = await UserService.checkExistingData(username, email)
    if(userExists){
        let msg = "Either your username or your mail alredy belong to a user"
        winston.log("info","createUser: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let passwdHash = await UserService.generateHash(rawPass)
    if(!passwdHash){
        let msg = "An error ocurred while trying to"
    }

    let validMail = UserService.checkEmailFormat(email)
    if(!validMail){
        let msg = "Invalid email format"
        winston.log("info","createUser: " + err)
        res.status(400).json({msg:msg})
        return false
    }

    let nUser = await UserService.createUserRow(username,passwdHash,email)
    if(!nUser){
        let msg = "Unable to create the new user"
        winston.log("info","createUser: "+ msg)
        res.status(400).json({"msg":msg})
        return false
    }

    //verificar formato email
    let mailRes = await UserService.sendVerificationMail(email,nUser.id, username)
    if(!mailRes){
        let msg = "unable to send verification email. Please sign up again"
        winston.log("info","createUser: " + msg)


        let deleted = await UserService.deleteUserRow(nUser.id)
        if(!deleted){
            winston.log("info","createUser: unable to delete user after inability to send email")
        }
        res.status(500).json({msg:msg})
        return false
    }

    let token = UserService.createToken(username)

    if(token){
        nUser = UserService.filterUserFields(nUser)
        res.status(201).json({user:nUser, token:token})
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

    if(!username || !passwd){
        let msg = "Missing parameters"
        winston.log("info","userLogin: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let user = await UserService.getUserRowByName(username)
    if(!user){
        let msg = "the user does not exist"
        winston.log("info","userLogin: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let passRes = await UserService.comparePassword(passwd,user.password_hash)
    if(!passRes){
        let msg = "Incorrect password"
        winston.log("info","userLogin: " + msg)
        res.status(401),json({msg:msg})
        return false
    }

    //delete danger fields
    user = await UserService.filterUserFields(user)

    let token = await UserService.createToken(username)
    if(token){
        res.status(200).json({user:user, token:token})
        return true
    }else{
        let msg = "unable to generate token"
        winston.log("info","userLogin: " + msg)
        res.status(400).json({msg:msg})
        return false
    }
}
