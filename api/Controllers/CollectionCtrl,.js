const winston           = require("../logger/logger")
const UserService       = require("../Services/UserService")    
const MediaService      = require("../Services/MediaService")
const CollectionService = require("../Services/CollectionService")
const User              = require("../Models/UserModel")



exports.createCollection = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let name = req.body.name
    let desc = req.body.description

    if(!userId || !auth || !name){
        let msg = "Missing parameters"
        winston.log("info","createCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","createCollection: " + authRes)
        return undefined
    }    

    let rep = await CollectionService.getCollectionRowByName(name)
    console.log(rep)
    if(rep){
        let msg = "A collection with that name alredy exists"
        winston.log("info","createCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let nCol = await CollectionService.createCollectionRow(name,desc,userId)
    if(!nCol){
        let msg = "Unable to create Collection"
        winston.log("info","createCollection: " + msg)
        res.status(500).json({msg:msg})
        return undefined
    }

    res.status(201).json({value:nCol})
    return undefined
}


exports.deleteCollection = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let colId = req.params.collection_id

    if(!userId || !auth || !colId){
        let msg = "Missing parameters"
        winston.log("info","deleteCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","deleteCollection: " + authRes)
        return undefined
    }
    
    let exists = await CollectionService.getCollectionRow(colId)
    if(!exists){
        let msg = "The requested collection does not exist"
        winston.log("info","deleteCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let deleted = await CollectionService.deleteCollectionRow(colId)
    if(!deleted){
        let msg = "Unable to delete collection"
        winston.log("info","deleteCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:deleted})
    return true
}

exports.updateCollection = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let colId = req.params.collection_id
    let fields = req.body

    if(!userId || !auth || !colId){
        let msg = "Missing parameters"
        winston.log("info","updateCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","updateCollection: " + authRes)
        return undefined
    }
    
    let exists = await CollectionService.getCollectionRow(colId)
    if(!exists){
        let msg = "The requested collection does not exist"
        winston.log("info","updateCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }  

    let invalid = await CollectionService.checkCollectionFields(fields)
    if(invalid){
        let msg = "Invalid parameter format"
        winston.log("info","updateCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    if(fields.name){
        let rep = await CollectionService.getCollectionRowByName(fields.name)
        if(rep){
            let msg = "There alredy exists a collection with that name"
            winston.log("info","updateCollection: " + msg)
            res.status(400).json({msg:msg})
            return undefined
        }
    }

    let updated = await CollectionService.updateCollectionRow(colId,fields)
    if(!updated){
        let msg = "Unable to update Collection"
        winston.log("info","updateCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:updated})
    return true
}

exports.getUserCollections = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization

    if(!userId || !auth ){
        let msg = "Missing parameters"
        winston.log("info","getUserCollections: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","getUserCollections: " + authRes)
        return undefined
    }

    let collections = await CollectionService.getUserCollectionRows(userId)
    if(!collections){
        let msg = "Unable to obtain user collections"
        winston.log("info","getUserCollections: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:collections})
    return true
}

/********************************************************
 * COLLECTION ENTRIES
 *******************************************************/

exports.getCollectionEntries = async function(req,res){
    let userId = req.params.user_id
    let auth = req.headers.authorization
    let colId = req.params.collection_id

    if(!userId || !auth || !colId){
        let msg = "Missing parameters"
        winston.log("info","getCollectionEntries: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId,token,res)
    if(! (authRes instanceof User)){
        winston.log("info","getCollectionEntries: " + authRes)
        return undefined
    } 
    
    let exists = await CollectionService.getCollectionRow(colId)
    if(!exists){
        let msg = "Requested collection does not exist"
        winston.log("info","getCollectionEntries: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let list = await CollectionService.getCollectionEntryRows(colId)
    if(!list){
        let msg = "Unable to get collection contents"
        winston.log("info","getCollectionEntries: " + msg)
        res.status(500).json({msg:msg})
        return undefined
    }

    res.status(200).json({value:list})
    return true
}