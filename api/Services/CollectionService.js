const winston           = require("../logger/logger")
const Collection        = require("../Models/Collection")
const CollectionEntry   = require("../Models/CollectionEntry")
const Entry             = require("../Models/MediaEntry")


exports.createCollectionRow = async function(name, description, userId){
    let col = await Collection.create({
        user_id:userId,
        name:name,
        description:description
    })
    .catch((err) =>{
        winston.log("error","createCollection: " + err)
        return undefined
    })

    return col
}

exports.deleteCollectionRow = async function(colId){
    let deleted = await Collection.destroy({where:{collection_id:colId}})
    .catch((err)=>{
        winston.log("error","deleteCollection: " + err)
        return undefined
    })

    return deleted
}

exports.checkCollectionFields = function(fields){
    let invalidFields = []
    let attributes = Collection.getAttributes()

    for(let i in fields){
        if(! (i in attributes)){
            invalidFields.push(i)
        }
    }

    if(invalidFields.length == 0){
        return undefined
    }

    return invalidFields
}

exports.updateCollectionRow = async function(colId, fields){
    let updated = await Collection.update(fields,{
        where:{collection_id:colId},
        returning:true,
        plain:true
    })
    .catch((err)=>{
        winston.log("error","updateCollection: " +  err)
        return undefined
    })

    return updated[1]
}

exports.getCollectionRow = async function(colId){
    let collection = await Collection.findOne({
        where:{collection_id:colId}
    })

    .catch((err)=>{
        winston.log("error","getCollectionRow: " + err)
        return undefined
    })

    return collection
}

exports.getCollectionRowByName = async function(name){
    let collection = await Collection.findOne({
        where:{name:name}
    })
    .catch((err)=>{
        winston.log("error","getCollectionRowByName: " + err)
        return undefined
    })

    return collection
}

exports.getUserCollections = async function(userId){
    let list = await Collection.findAll({
        where:{user_id:userId}
    })
    .catch((err)=>{
        winston.log("error","getUserCollections: " + err)
        return undefined
    })

    return list
}

/******************************************************************
 * COLLECTION ENTRIES
 ******************************************************************/

exports.createCollectionEntryRow = async function(colId, entryId){
    let entry = await CollectionEntry.create({
        col_id:colId,
        entry_id:entryId
    })
    .catch((err)=>{
        winston.log("error","createCollectionEntryRow: " + err)
        return undefined
    })

    return entry
}

exports.deleteCollectionEntryRow = async function(entryId){
    let deleted = await CollectionEntry.destroy({
        where:{col_entry_id:entryId}
    })
    .catch((err)=>{
        winston.log("error","deleteCollectionEntryRow: " + err)
        return undefined
    })

    return deleted
}

exports.getCollectionEntryRows = async function(colId){
    let list = await CollectionEntry.findAll({
        where:{col_id:colId},
        include:{
            model:Entry,
            as:'Entry',
            include:{
                model:Media,
                as:'Media'
            }
        }
    })
    .catch((err) =>{
        winston.log("error","getCollectionEntryRows: " + err)
        return undefined
    })

    return list
}