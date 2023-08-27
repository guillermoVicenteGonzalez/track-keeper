const winston       = require("../logger/logger")
const User          = require("../Models/UserModel")
const bcrypt        = require("bcrypt")
const jwt           = require("jsonwebtoken")
const word          = 'secret'
const nodemailer    = require("nodemailer")
const emailConf     = require("../emailConf.json")
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
    let user = await User.findOne({where:{id:userId}})
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
    let deleted = await User.destroy({where:{id:userId}})
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
    let nUser = await User.update(fields,{where:{id:userId},
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

exports.validateUserFields = async function(fields){
    let invalidFields = []
    
    if(fields.password_hash){
        winston.log("info","validateUserFields: tried to overwrite password hash")
        invalidFields.push(fields.password_hash)
    }

    if(fields.id){
        winston.log("info","validateUserFields: tried to overwrite user id")
        invalidFields.push(fields.id)
    }

    for(let i in fields){
        if( !(i in User.getAttributes())){
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

exports.filterUserFields = async function(user){
    delete user.password_hash
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

exports.verifyToken = async function(usernname, token){
    try{
        var decoded = jwt.verify(token,word)
        console.log(decoded.data, username)
    }catch(err){
        winston.log("error","verifyToken: " + err)
        return undefined
    }

    if(decoded.data == usernname){
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


exports.updateUserPassword = async function(userId, passwdHash){
    return true
}
//check fields
//create jwt
//validate jwt
//change password
