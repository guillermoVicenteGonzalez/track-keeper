const UserService       = require("../Services/UserService")    
const winston           = require("../logger/logger")
const MediaService      = require("../Services/MediaService")
const User              = require("../Models/UserModel")
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
    if(! (authRes instanceof User)){
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


exports.createMedia = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let name = req.body.name
    let type = req.body.type
    let genre = req.body.genre
    let description = req.body.description
    let duration = req.body.duration

    if(!name || !type || !auth || !userId){
        let msg = "Missing parameters"
        winston.log("info","createMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token,res)
    if(! (authRes instanceof User)){
        winston.log("info","createMedia: " + authRes)
        return undefined
    }

    let pMedia = await MediaService.getMediaByName(name)
    if(pMedia.length > 0){
        let msg = "Media alredy exists with the same name"
        winston.log("info","createMedia: " + msg)
        res.status(409).json({msg:msg})
        return undefined
    }

    let nMedia = await MediaService.createMediaRow(name,type,genre,description,duration)
    if(!nMedia){
        let msg = "Unable to create new Media"
        winston.log("info","createMedia: " +  msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(201).json({value:nMedia})
    return undefined
}


exports.deleteAllMedia = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization

    if(!userId || !auth){
        let msg = "Missing parameters"
        winston.log("info","deleteAllMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","deleteAllMedia: " + authRes)
        return undefined
    }

    //authenticate returns user if correct
    if(!authRes.admin){
        let msg = "Permission denied"
        winston.log("info","deleteAllMedia: " + msg)
        res.status(403).json({msg:msg})
        return undefined
    }

    let deleted = await MediaService.deleteAllMediaRows()
    if(!deleted){
        let msg = "Unable to delete all media rows"
        winston.log("info","deleteAllMedia: " + msg)
        res.status(500).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:deleted})
    return true
}

exports.getMediaById = async function(req,res){
    let userId = req.params.user_id
    let mediaId = req.params.media_id
    let auth = req.headers.authorization

    if(!userId || !mediaId  || !auth){
        let msg = "Missing parameters"
        winston.log("info","getMediaById: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","getMediaById: auth " + authRes)
        return undefined
    }

    console.log("user authenticated")

    let media = await MediaService.getMediaRowById(mediaId)
    if(!media){
        let msg = "Unable to fetch media"
        winston.log("info","getMediaById: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:media})
    return true
}

exports.deleteMedia = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let mediaId = req.params.media_id

    if(!userId || !auth || !mediaId){
        let msg = "Missing parameters"
        winston.log("info","deleteMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","deleteMedia:" + authRes)
        return undefined
    }

    if(!authRes.admin){
        let msg = "Permission denied"
        winston.log("info","deleteMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let media = await MediaService.getMediaRowById(mediaId)
    if(!media){
        let msg = "Requested media does not exist"
        winston.log("info","deleteMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:media})
    return true
}

exports.updateMedia = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let mediaId = req.params.media_id
    let fields = req.body

    if(!userId || !auth || !mediaId){
        let msg = "Missing parameters"
        winston.log("info","updateMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","updateMedia:" + authRes)
        return undefined
    }

    let validate = MediaService.validateMediaFields(fields)
    if(validate){
        let msg = "invalid fields"
        winston.log("info","updateMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let updated = await MediaService.updateMediaRow(mediaId,fields)
    if(!updated){
        let msg = "Unable to update media"
        winston.log("info","updateMedia: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:updated})
    return true
}


/*******************************************************
 *  ENTRIES
 **********************************************+********/

exports.getEntries = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization

    if(!userId || !auth){
        let msg = "Missing parameters"
        winston.log("info","getUserEntries: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("getUserEntries: " + authRes)
        return undefined
    }

    let entries = await MediaService.getUserEntries(userId)
    if(!entries){
        let msg = "Unable to fetch entries"
        winston.log("info","getEntries: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:entries})
    return undefined
}

exports.createEntry = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let mediaId = req.body.media_id
    let state = req.body.state
    let startD = req.body.start_d //optional
    let finishD = req.body.finish_d //optional
    let review = req.body.review //optional

    if(!userId || !auth || !mediaId || !state ){
        let msg = "Missing parameters"
        winston.log("info","createEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","createEntry: " + authRes)
        return undefined
    }

    let media = await MediaService.getMediaRowById(mediaId)
    if(!media){
        let msg = "Requested media does not exist"
        winston.log("info","createEntry: " + msg)
        res.status(404).json({msg:msg})
        return undefined
    }

    let checkState = MediaService.checkValidState(state)
    if(!checkState){
        let msg = "Entry state has invalid format"
        winston.log("info","createEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let nEntry = await MediaService.createMediaEntryRow(userId,mediaId,review,state,startD,finishD)
    if(!nEntry){
        let msg = "Unable to create entry"
        winston.log("info","createEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:nEntry})
    return true
}