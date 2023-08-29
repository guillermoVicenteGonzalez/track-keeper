const winston         = require("../logger/logger")
const UserService     = require("../Services/UserService")
const User            = require("../Models/UserModel")
const multer          = require("multer");
const fs              = require("fs");
const path            = require("path")


var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./storage/profile")
    },
    filename:function (req,file,cb){
        cb(null, file.originalname)
    }
})
/*
var logoStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./storage/logo")
    },
    filename:function (req,file,cb){
        cb(null, file.originalname)
    }
})*/
//var upload = multer({dest:'./storage'}).single("file");
const upload = multer({storage:storage}).single("file");
//const uploadLogo = multer({storage:logoStorage}).single("file")

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

exports.getUserData = async function(req,res){
    let userId = req.params.user_id
    let authorization = req.headers.authorization

    if(!userId || !authorization){
        let msg = "missing parameters"
        winston.log("info","getUserData: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let user = await UserService.getUserRow(userId)
    if(!user){
        let msg = "unable to find user"
        winston.log("info","getUserData: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let token = authorization.split(' ')
    token = token[1]
    if(!token){
        let msg = "Authorization header format was wrong"
        winston.log("info","getUserData: " + msg)
        res.status(401).json({msg:msg})
        return false
    }

    let tokenRes = await UserService.verifyToken(user.username,token)
    if(!tokenRes){
        let msg = "The token was either incorrect or expired"
        winston.log("info","getUserData: " +msg)
        res.status(401).json({msg:msg})
        return false
    }

    if(!user.verified){
        let msg = "User is not verified. Check your mail "
        winston.log("info","getUserData: " + msg)
        res.status(401).json({msg:msg})
        return false
    }

    res.status(200).json({user:user})
    return true
}

exports.verifyUser = async function(req,res){
    let userId = req.params.user_id

    let user = await UserService.getUserRow(userId)
    if(!user){
        let msg = "User does not exist"
        winston.log("info","verifyUser: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    if(user.verified){
        let msg = "User was alredy verified"
        winston.log("info","verifyUser: " + msg)
        res.status(409).json({msg:msg})
        return false
    }

    let updatedUser = await UserService.updateUserRow(userId,{verified:true})
    if(!updatedUser){
        let msg = "Unable to verify user."
        winston.log("info","verifyUser: " + msg)
        res.status(500).json({msg:msg})
        return false
    }

    res.status(200).json({msg:"user verified succesfully"})
    return true
}

exports.deleteUser = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization

    if(!userId || !auth){
        let msg = "Missing parameters"
        winston.log("info","deleteUser: " +msg)
        res.status(400).json({msg:msg})
        return false
    }

    let user = await UserService.getUserRow(userId)
    if(!user){
        let msg = "User does not exist"
        winston.log("info","deleteUser: " + msg)
        res.status(404).json({msg:msg})
        return false
    }

    let token = auth.split(' ')
    token = token[1]
    let tokenRes = await UserService.verifyToken(user.username, token)
    if(!tokenRes){
        let msg = "Authorization failed. The token is either invalid or expired"
        winston.log("info","deleteUser: " + msg)
        res.status(401).json({msg:msg})
        return false
    }

    let deleted = await UserService.deleteUserRow(userId)
    if(!deleted){
        let msg = "Unable to delete user."
        winston.log("info","deleteUser: " + msg)
        res.stauts(500).json({msg:msg})
        return false
    }

    res.status(200).json({user:user})
    return false
}

exports.updateUser = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let fields = req.body

    if(!userId || !auth || !fields){
        let msg = "missing parameters"
        winston.log("info","updateUser: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let user = await UserService.getUserRow(userId)
    if(!user){
        let msg = "User does not exist"
        winston.log("info","updateUser: " + msg)
        res.status(404).json({msg:msg})
        return false
    }

    let token = auth.split(' ')
    token = token[1]
    let tokenRes = await UserService.verifyToken(user.username,token)
    if(!tokenRes){
        let msg = "Authorization failed. The token is either invalid or expired"
        winston.log("info","updateUser: " +msg)
        res.status(401).json({msg:msg})
        return false
    }

    console.log(fields)
    let invalidFields = await UserService.validateUserFields(fields)
    if(invalidFields){
        let msg = "invalid fields where passed: " + invalidFields
        winston.log("info","updateUser: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    console.log(req.body)
    let updatedUser = await UserService.updateUserRow(userId,fields)
    if(!updatedUser){
        let msg = "Unable to update user"
        winston.log("info","updateUser: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    updatedUser = UserService.filterUserFields(updatedUser)
    res.status(200).json({user:updatedUser})
    return true
}

//update password
exports.updatePassword = async function(req,res){
    let pPass = req.body.previous_password
    let nPass = req.body.new_password
    let userId = req.params.user_id

    if(!pPass || !nPass || !userId){
        let msg = "Missing parameters"
        winston.log("info","updatePassword: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    let user  = await UserService.getUserRow(userId)
    if(!user){
        let msg = "User does not exist"
        winston.log("info","updatePassword: " + msg)
        res.status(404).json({msg:msg})
        return false
    }

    let passRes = await UserService.comparePassword(pPass,user.password_hash)
    if(!passRes){
        let msg = "Incorrect password"
        winston.log("info","updatePassword: " + msg)
        res.status(400).json({msg:msg})
        return false
    }

    if(pPass == nPass){
        let msg = "Previous and new passwords are the same"
        winston.log("info","updatePassword: " + msg)
        res.status(400).json({msg:msg})
        return false
    }
    
    let updateRes = await UserService.updateUserPassword(userId, nPass)
    if(!updateRes){
        let msg = "Unable to update user password"
        winston.log("info","updatePassword: " + msg)
        res.status(500).json({msg:msg})
        return false
    }

    res.status(200).json({msg:"password updated succesfully"})
    return true
}

exports.uploadPhoto = async function(req,res){
    //parseo parametros
    let userId = req.params.userId;
    if(userId == undefined || userId == "undefined"){
        let msg = "userId undefined";
        console.log(msg);
        res.status(400).json({success:false, message:msg});
        return undefined;
    }

    //verifico que existe el usuario.
    let user = await UserService.getUserRow(userId);
    if(!user){
        let msg = "user with id: " + userId + " does not exist";
        console.log(msg);
        res.status(400).json({success:false, message:msg});
        return undefined;
    }


    //modifico la tabla
    upload(req, res, async (err)=>{
        if(err){
            console.log(err);
            let msg = "Multer error"
            res.status(400).json({success:false,message:msg});
            return undefined;
        }else{
            var newImg = req.file;
            if(!newImg){
                let msg = "file cannot be empty";
                console.log(msg); 
                res.status(400).json({success:false, message:msg});
                return undefined;
            }

            //antes hay que verificar que exista el fichero.
            //borro el fichero anterior
            //solo borro si tiene nombre distinto
            //si tiene el mismo nombre sobreescribe
            if(user.image && user.image.filename != newImg.filename){
                let result = UserService.deletePhoto(user.image.path);
            }

            //ahora actualizo con el nuevo fichero
            let nUser = await UserService.updateUserRow(userId,{image:newImg})
            .then(function(response){
                res.status(200).json({success:true, user:response[0]});
            })
            .catch((err)=>{
                res.status(400).json({success:false});
            });
        }
    })
}

exports.getPhoto = async function(req,res){
    //console.log(req.params.userId);
    let userId = req.params.user_id;

    if(userId == "undefined" || userId == undefined){
        res.status(400).json({success:false});
        return undefined;
    }


    let user = await UserService.getUserRow(userId);
    if(user){
        //console.log(user.dataValues);
        if(user.image != undefined){
            winston.log("info",user.image.filename);
            let fullPath = path.resolve('.') + "/storage/profile/" + user.image.filename;
            if(fullPath){res.status(200).sendFile(fullPath);}
            return false;
        }else{
            let msg = "user image has not ben set";
            console.log(msg);
            res.status(204).send(undefined);
        }
        //path del root del proyecto + storage + nombre imagen.
        //user.image contiene el path relativo. a sendFile hay que darle el absoluto
    }else{
        let msg = "User with id: " + userId + " could not be found";
        res.status(400).json({success:false,message:msg});
        return undefined;
    }
}
//reset password

//upload photo

//update photo


