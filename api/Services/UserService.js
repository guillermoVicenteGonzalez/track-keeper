const winston   = require("../logger/logger")
const User     = require("../Models/UserModel")
const bcrypt    = require("bcrypt")
const jwt       = require("jsonwebtoken")

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

/*
exports.getUserRowByName = async function(username){

}

exports.getUserRow = async function(userId){

}*/