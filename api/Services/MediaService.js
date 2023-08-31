const Media         = require("../Models/Media")
const Entry         = require("../Models/MediaEntry")
const winston       = require("../logger/logger")
const multer        = require("multer")
const fs            = require("fs")
const path          = require("path") 


exports.checkMediaType = function(type){
    return Media.getAttributes().includes(type)
}

exports.createMediaRow = async function(name, type, genre, desc,dur){
    let nMedia = await Media.create({
        name:name,
        type:type,
        genre:genre,
        description:desc,
        duration:duration
    })
    .catch((err)=>{
        winston.log("error","createMediaRow: " + err)
        return undefined
    })

    return nMedia
}

exports.deleteMediaRow = async function(mediaId){
    let delMedia = await Media.destroy({where:{media_id:medaId}})
    .catch((err)=>{
        winston.log("error","deleteMediaRow: " + err)
        return undefined
    })

    console.log(delMedia)
    return delMedia
}

//returns invalid fields => if(true) means there are invalid fields
exports.validateMediaFields = async function(){
    let invalidFields = []

    for(let i in fields){
        if(! (Media.getAttributes().includes(i))){
            invalidFields.push(i)
        }
    }

    if(fields.media_id){
        invalidFields.push(fields.media_id)
    }

    return invalidFields
}


exports.updateMediaRow = async function(mediaId, fields){
    let updatedMedia = await Media.update(fields,{where:{media_id:mediaId},
        returning:true,
        plain:true
    })
    .catch((err)=>{
        winston.log("error","updateMediaRow: " + err)
        return undefined
    })

    return updatedMedia
}

exports.getMediaById = async function(mediaId){
    let media = Media.findOne({where:{media_id:mediaId}})
    .catch((err) =>{
        winston.log("error","getMediaById: " + err)
        return undefined
    })

    return media
}

exports.getMediaByName = async function(name){
    let media = Media.findAll({where:{name:name}})
    .catch((err)=>{
        winston.log("error","getMediaByName: " + err)
        return undefined
    })

    return media
}


/********************************************************
 * MEDIA ENTRIES
 ********************************************************/

