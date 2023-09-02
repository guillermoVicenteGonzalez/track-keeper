const Media         = require("../Models/Media")
const Entry         = require("../Models/MediaEntry")
const winston       = require("../logger/logger")


exports.checkMediaType = function(type){
    return Media.getAttributes().type.includes(type)
}

exports.createMediaRow = async function(name, type, genre, desc,dur){
    let nMedia = await Media.create({
        name:name,
        type:type,
        genre:genre,
        description:desc,
        duration:dur
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
exports.validateMediaFields = function(fields){
    let invalidFields = []
    var attributes = Media.getAttributes()
    //winston.log("info","validateMediaFields: " + attributes)

    for(let i in fields){
        if(! (i in attributes)){
            invalidFields.push(i)
        }
    }

    if(fields.media_id){
        invalidFields.push(fields.media_id)
    }

    if(invalidFields.length == 0){
        return undefined
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

    return updatedMedia[1]
}

exports.getMediaRowById = async function(mediaId){
    let media = await Media.findOne({where:{media_id:mediaId}})
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

exports.getMediaByGenre = async function(genre){
    let media = Media.findAll({where:{genre:genre}})
    .catch((err)=>{
        winston.log("error","getMediaByGenre: " + err)
        return undefined
    })

    return media
}

exports.getMediaByType = async function(type){
    let media = Media.findAll({where:{type:type}})
    .catch((err)=>{
        winston.log("error","getMediaByType: " + err)
        return undefined
    })

    return media 
}

exports.getAllMediaRows = async function(){
    let media = Media.findAll()
    .catch((err)=>{
        winston.log("error","getAllMedia: " + err)
        return undefined
    })

    return media
}

exports.deleteAllMediaRows = async function(){
    let deleted = await Media.destroy()
    .catch((err)=>{
        winston.log("error","deleteAllMedia: " + err)
        return undefined
    })

    return deleted
}


/********************************************************
 * MEDIA ENTRIES
 ********************************************************/

exports.checkValidState = function(state){
    //return Entry.getAttributes().state.includes(state)
    let validStates = Entry.getAttributes().state.values

    console.log(validStates.includes(state))
    console.log(state)
    return validStates.includes(state)
}

exports.checkDuplicateMediaEntry = async function(userId,mediaId){
    let duplicate = await Entry.findAll({where:{
        media_id:mediaId,
        user_id:userId
    }})
    .catch((err)=>{
        winston.log("error","checkDuplicateMediaEntry: " + err)
    })

    if(duplicate.length == 0){
        return undefined
    }
    return duplicate
}

exports.createMediaEntryRow = async function(userId, mediaId, review,state, startD, finishD){
    let nEntry = await Entry.create({
        user_id:userId,
        media_id:mediaId,
        review:review,
        state:state,
        start_date:startD,
        finish_date:finishD
    })
    .catch((err)=>{
        winston.log("error","createMediaEntryRow: " +err)
        return undefined
    })

    return nEntry
}

exports.getEntryById = async function(entryId){
    let entry = await Entry.findOne({
        where:{entry_id:entryId},
        include:{model:Media, as: 'Media'}
    })
    .catch((err)=>{
        winston.log("error","getEntryById: " + err)
        return undefined
    })

    return entry
}

exports.getUserEntries = async function(userId){
    let userEntries = await Entry.findAll({
        where:{user_id:userId},
        include:{model:Media, as:'Media'}
    })
    .catch((err)=>{
        winston.log("error","getUserEntries: " + err)
        return undefined
    })

    return userEntries
}

exports.getEntriesByState = async function(state, userId){
    let entries = await Entry.findAll({
        where:{state:state, user_id:userId},
        include:{model:Media, as: 'Media'}
    })
    .catch((err)=>{
        winston.log("error","getEntriesByState: " + err)
        return undefined
    })

    return entries
}

exports.getEntriesByGenre = async function(genre, userId){
    let entries = await Entry.findAll({
        where:{user_id:userId},
        include:{
            model:Media,
            as:'Media',
            where:{genre:genre}
        }
    })

    .catch((err)=>{
        winston.log("error","getEntriesByGenre: " + err)
        return undefined
    })

    return entries
}

exports.deleteEntryRow = async function(entryId){
    let deleted = await Entry.destroy({where:{entry_id:entryId}})
    .catch((err)=>{
        winston.log("error","deleteEntry: " + err)
        return undefined
    })

    return deleted
}

exports.validateEntryFields = function(fields){
    let invalidFields = []
    var attributes = Entry.getAttributes()

    for(let i in fields){
        console.log(i)
        if(! (i in attributes)){
            invalidFields.push(i)
        }
    }

    if(fields.media_id){
        invalidFields.push(fields.media_id)
    }

    if(fields.entry_id){
        invalidFields.push(fields.entry_id)
    }

    if(fields.user_id){
        invalidFields.push(fields.user_id)
    }

    if(invalidFields.length == 0){
        return 0
    }

    return invalidFields
}

exports.updateEntry = async function(fields, entryId){
    let updated = await Entry.update(fields,{where:{entry_id:entryId},
        returning:true,
        plain:true
    })
    .catch((err)=>{
        winston.log("error","updateEntry: " + err)
        return undefined
    })

    return updated[1]
}
