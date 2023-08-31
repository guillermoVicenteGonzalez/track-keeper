const UserService       = require("../Services/UserService")    
const winston           = require("../logger/logger")
const MediaService      = require("../Services/MediaService")
const multer            = require("multer")
const fs                = require("fs")
const path              = require("path")

/**
 * - crear media
 * - borrar media (admin)
 * - actualizar media (permisos?)
 * - conseguir media especifica
 * - conseguir toda la media
 */

exports.getAllMedia = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization

    if(!userId || !auth){
        let msg = "Missing parameters"
        winston.log("info","getAllMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    /*
    let user = await UserService.getUserRow(userId)
    if(!user){
        let msg = "User does not exist"
        winston.log("info","getAllMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let tokenRes = await UserService.verifyToken(user.username, token)
    if(!tokenRes){
        let msg = "The token was either incorrect or expired"
        winston.log("info","getUserData: " +msg)
        res.status(401).json({msg:msg})
        return false
    }*/

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(authRes != true){
        winston.log("info","getAllMedia: " + authRes)
        return undefined
    }

    let list = await MediaService.getAllMediaRows()
    if(!list){
        let msg = "Unable to fetch all media"
        winston.log("info","getAllMedia: " + msg)
        res.status(500).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:list})
    return true
}
