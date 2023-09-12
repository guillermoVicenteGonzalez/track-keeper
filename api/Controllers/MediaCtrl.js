const UserService       = require("../Services/UserService")    
const winston           = require("../logger/logger")
const MediaService      = require("../Services/MediaService")
const User              = require("../Models/UserModel")
const multer            = require("multer")
const fs                = require("fs")
const path              = require("path")

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./storage/covers")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage}).single("file")
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


//falta borrar la foto
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

exports.uploadMediaCover = async function(req,res){
    let userId = req.params.user_id;
    let mediaId = req.params.media_id;
    let auth = req.headers.authorization;

    let token = auth.split(' ');
    token = token[1];
    let user = await UserService.authenticateUser(userId,token,res)
    if(!user){
        let msg = "Authentication failed";
        winston.log("info","uploadMediaCover: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    let media = await MediaService.getMediaRowById(mediaId)
    if(!media){
        let msg = "Media does not exist";
        winston.log("info","uploadMediaCover: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    upload(req,res,async (err)=>{
        if(err){
            winston.log("error","uploadMediaCover: Multer errror-> " + err);
            let msg = "Unable to upload cover";
            winston.log("info","uploadMediaCover: " + msg);
            res.status(500).json({msg:msg})
            return undefined
        }else{
            var newImg = req.file;
            if(!newImg){
                let msg = "File cannot be empty";
                winston.log("info","uploadMediaCover: " + msg);
                res.status(400).json({msg:msg});
                return undefined;
            }

            /**
             * Antes hay que verificar que exista el fichero
             * Si existe, borro el anterior
             * Solo lo borro si tienen distinto nombre
             * ya que si tienen el mismo se sobreescribe
             */
            if(media.cover && media.cover.filename != newImg.filename){
                let result = MediaService.deleteMediaCover(media.cover.path)
            }

            let nMedia = await MediaService.updateMediaRow(mediaId,{cover:newImg})
            .then(function(response){
                res.status(200).json({msg:"succesfully uploaded cover"})
            })
            .catch((err)=>{
                winston.log("info","uploadMediaCover: " + err);
                res.status(400).json({msg:err})
                return undefined
            })
        }
    })
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
        winston.log("info","getUserEntries: " + authRes)
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

    let duplicate = await MediaService.checkDuplicateMediaEntry(userId, mediaId)
    if(duplicate){
        let msg = "You alredy have a entry for that media"
        winston.log("info","createEntry: " + msg)
        res.status(400).json({msg:msg})
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

exports.deleteEntry = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let entryId = req.params.entry_id

    if(!userId || !auth || !entryId){
        let msg = "Missing parameters"
        winston.log("info","deleteEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","deleteEntry: " + authRes)
        return undefined
    }

    let entry = await MediaService.getEntryById(entryId)
    if(!entry){
        let msg = "The requested entry does not exist"
        winston.log("info","deleteEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let deleted = await MediaService.deleteEntryRow(entryId)
    if(!deleted){
        let msg = "Unable to delete entry"
        winston.log("info","deleteEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:deleted})
    return undefined
}

exports.updateEntry = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let entryId = req.params.entry_id
    let fields = req.body

    if(!userId || !auth || !entryId || !fields){
        let msg = "Missing parameters"
        winston.log("info","updateEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","updateEntry: " + authRes)
        return undefined
    }

    let entry = await MediaService.getEntryById(entryId)
    if(!entry){
        let msg = "The requested entry does not exist"
        winston.log("info","updateEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let vFields = MediaService.validateEntryFields(fields)
    console.log(vFields)
    if(vFields){
        let msg = "One or more fields to update where invalid"
        winston.log("info","updateEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let updated = await MediaService.updateEntry(fields,entryId)
    if(!updated){
        let msg = "Unable to update entry"
        winston.log("info","updateENtry: " + msg)
        res.status(500).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:updated})
    return true
}

exports.getEntry = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let entryId = req.params.entry_id

    if(!userId || !auth || !entryId){
        let msg = "Missing parameters"
        winston.log("info","getEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","getEntry: " + authRes)
        return undefined
    }

    let entry = await MediaService.getEntryById(entryId)
    if(!entry){
        let msg = "The requested entry does not exist"
        winston.log("info","getEntry: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:entry})
    return true
}

//get filtered entries (state etc)

exports.getEntriesByState = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let state = req.params.state

    if(!userId || !auth || !state){
        let msg = "Missing parameters"
        winston.log("info","getEntriesByState: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","getEntriesByState: " + authRes)
        return undefined
    }

    let validState = MediaService.checkValidState(state)
    if(!validState){
        let msg = "State format is invalid"
        winston.log("info","getEntriesByState: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let list = await MediaService.getEntriesByState(state,userId)
    if(!list){
        let msg = "Unable to get list of entries"
        winston.log("info","getEntriesByState: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:list})
    return undefined
}

exports.getEntriesByGenre = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let genre = req.params.genre

    if(!userId || !auth || !genre){
        let msg = "Missing parameters"
        winston.log("info","getEntriesByGenre: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","getEntriesByGenre: " + authRes)
        return undefined
    }


    let list = await MediaService.getEntriesByGenre(genre,userId)
    if(!list){
        let msg = "Unable to get list of entries"
        winston.log("info","getEntriesByGenre: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:list})
    return undefined
}

exports.getEntriesByType = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let type = req.params.type

    if(!userId || !auth || !type){
        let msg = "Missing parameters"
        winston.log("info","getEntriesByType: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","getEntriesByType: " + authRes)
        return undefined
    }

    let validType = MediaService.checkMediaType(type)
    if(!validType){
        let msg = "Type format is invalid"
        winston.log("info","getEntriesByType: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let list = await MediaService.getEntriesByType(type,userId)
    if(!list){
        let msg = "Unable to get list of entries"
        winston.log("info","getEntriesByType: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:list})
    return undefined    
}


/**
 * Rewatch show:
 *  no se puede hacer dos entries con el mismo media id
 *  hay que hacer un metodo especifico "rewatch" que haga eso.
 */
//upload media photo
//get media photo
