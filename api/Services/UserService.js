const winston       = require("../logger/logger")
const User          = require("../Models/UserModel")
const bcrypt        = require("bcrypt")
const jwt           = require("jsonwebtoken")
const word          = 'secret'
const nodemailer    = require("nodemailer")
const emailConf     = require("../emailConf.json")
const fs            = require("fs")
                      require("dotenv").config({path:"../.env"})

exports.generateHash = async function(passwd){
    //falta control de errores
    //let hash = passwordHash.generate(passwd);
    const hash = await bcrypt.hash(passwd,10);
    if(hash){
        return hash;
    }else{
        winston.log("error","generateHash: error generating hash");
        return false
    };
}

exports.createUserRow = async function(username,passwdHash, email){
    let nUser = await User.create({
        username:username,
        password_hash:passwdHash,
        email:email,
        verified:false
    })
    .catch(err=>{
        winston.log("error","createUserRow: " + err)
        return false
    })

    if(nUser){return nUser}else{
        winston.log("error","createUserRow: unknown error")
        return false
    }
}


exports.getUserRowByName = async function(username){
    let user = await User.findOne({where:{username:username}})
    .catch(err=>{
        winston.log("error","getUserRowByName: " + err)
        return -1
    })

    if(user){
        return user
    }else{
        winston.log("info","getUserRowByName: the user does not exist")
        return 0
    }
}

exports.getUserRow = async function(userId){
    let user = await User.findOne({where:{user_id:userId}})
    .catch(err=>{
        winston.log("error", "getUserRow: " + err)
        return -1
    })

    if(user){
        return user
    }else{
        winston.log("info","getUserRow: the user does not exist")
        return 0
    }
}

exports.deleteUserRow = async function(userId){
    let deleted = await User.destroy({where:{user_id:userId}})
    .catch((err)=>{
        winston.log("error","deleteUserRow: " + err)
        return false
    })

    if(deleted){
        return deleted
    }else{
        winston.log("info","deleteUserRow: the user does not exist")
        return false
    }
}

exports.deleteUserByName = async function(username){
    let deleted = await User.destroy({where:{username:username}})
    .catch((err)=>{
        winston.log("error","deleteUserRow: " + err)
        return false
    })

    if(deleted){
        return deleted
    }else{
        winston.log("info","deleteUserRow: the user does not exist")
        return false
    }
}

exports.updateUserRow = async function(userId,fields){
    let nUser = await User.update(fields,{where:{user_id:userId},
        returning:true,
        plain:true
    })
    .catch((err)=>{
        winston.log("error","updateUserRow: " + err)
        return -1
    })

    if(nUser){
        //delete dangerFields
        return nUser[1]
    }else{
        winston.log("info","updateUserRow: user does not exist")
        return 0
    }
}

//devuelve 0 si no hay problemas, devuelve los campos incorrectos si los hay
exports.validateUserFields = async function(fields){
    let invalidFields = []
    
    if(fields.password_hash){
        let msg = "tried to overwrite password"
        winston.log("info","validateUserFields: " + msg)
        invalidFields.push(fields.password_hash)
        return msg
    }

    if(fields.id){
        let msg = "tried to overwrite user id"
        winston.log("info","validateUserFields: "+msg)
        invalidFields.push(fields.id)
        return msg
    }

    if(fields.username){
        let existing = await User.findOne({where:{username:fields.username}})
        if(existing){
            let msg ="user with that name alredy exists" 
            winston.log("info","validateUserFields: " + msg)
            return msg
        }
    }

    if(fields.email){
        let existing = await User.findOne({where:{email:fields.email}})
        if(existing){
            let msg = "user with that email alredy exist"
            winston.log("info","validateUserFields: " + msg)
            return msg
        }
    }

    /*
    for(let i in fields){
        if( !(i in User.getAttributes())){
            invalidFields.push(i)
        }
    }*/

    for(let i in fields){
        if(! (User.getAttributes().includes(i))){
            invalidFields.push(i)
        }
    }

    if(invalidFields.length != 0){
        winston.log("info","validateUserFields: invalid fields where passed")
        return invalidFields
    }else{
        return undefined
    }
}

exports.filterUserFields = function(user){
    delete user.dataValues.password_hash
    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt

    return user
}

exports.createToken = async function(username){
    let token = await jwt.sign({
        data:username,
        exp: Math.floor(Date.now()/1000) + (60* 60)
    },word)

    if(token){
        return token
    }else{
        winston.log("error","createToken: error creating token")
        return false
    }
}

exports.verifyToken = async function(username, token){
    try{
        var decoded = jwt.verify(token,word)
    }catch(err){
        winston.log("error","verifyToken: " + err)
        return undefined
    }

    if(decoded.data == username){
        return true
    }else{
        winston.log("info","verifyToken: token was incorrect")
        return false
    }
}

exports.sendVerificationMail = async function(destination, userId, username){
    let url = "http://" + process.env.API_HOST + ":" + process.env.API_PORT + "/api/users/verify/" + userId 
    const message = {
        from:emailConf.user,
        to:destination,
        subject:username + "verify account",
        text: "Thanks for joining, please click this link to verify your account",
        html: '<a href="' + url + '">Click</a>', // html body         
    }

    const config = {
        host:"smtp.gmail.com",
        port:587,
        auth:{
            user:emailConf.user,
            pass:emailConf.pass
        }
    }

    let transport = nodemailer.createTransport(config)
    let info = await transport.sendMail(message)
    .catch((err)=>{
        winston.log("error","senEmail: " + err)
        return false
    })

    if(info){
        return true
    }else{
        winston.log("error","unknown error sending mail")
        return false
    }
}

exports.checkExistingData = async function(username, email){
    let duplicateNames = await User.findAll({where:{username:username}})
    if(duplicateNames.length != 0){
        winston.log("info","checkExistingData: a user with the same username alredy exists")
        return duplicateNames
    }

    let duplicateMails = await User.findAll({where:{email:email}})
    if(duplicateMails.length != 0){
        winston.log("info","checkExistingData: a user with the same email alredy exists")
        return duplicateMails
    }

    return undefined
}

exports.comparePassword = async function(password, hash){
    let result = await bcrypt.compare(password,hash)
    return result
}

exports.updateUserPassword = async function(userId, passwdHash){
    return true
}

exports.checkEmailFormat = function(email){
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email)
}

exports.updateUserPassword = async function(userId, nPass){
    let nPassHash = await exports.generateHash(nPass)
    console.log(nPassHash)
    if(nPassHash){
        let updatedUser = await User.update({password_hash:nPassHash},{where:{user_id:userId}})
        .catch((err)=>{
            winston.log("error","updateUserPassword: " + err)
            return undefined
        })

        if(updatedUser){
            return true
        }
    }
}


exports.deletePhoto = async function(location){
    let result = fs.unlink(location,(err =>{
        if(err){
            winston.log("error","deletePhoto: " + err);
            return undefined
        }else{
            winston.log("info","deletePhoto: Success deleting photo" )
            return true;
        }
    }))

    return result;
}


exports.authenticateUser = async function(userId, token, res){
    let user = await getUserRow(userId)
    if(!user){
        let msg = "User does not exist"
        res.status(400).json({msg:msg})
        return msg
    }

    let tokenRes = await verifyToken(user.username, token)
    if(!tokenRes){
        let msg = "Authentiation failed"
        res.status(401).json({msg:msg})
        return msg
    }

    return true
}



//check fields
//create jwt
//validate jwt
//change password
