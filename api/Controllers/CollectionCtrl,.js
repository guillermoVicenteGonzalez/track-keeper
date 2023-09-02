const winston           = require("../logger/logger")
const UserService       = require("../Services/UserService")    
const MediaService      = require("../Services/MediaService")
const CollectionService =  require("../Services/CollectionService")



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
    if(!rep){
        let msg = "A collection with that name alredy exists"
        winston.log("info","createCollection: " + msg)
        res.status(400).json({msg:msg})
        return undefined
    }

    let nCol = await CollectionService.createCollectionRow(name,desc)
    if(!nCol){
        let msg = "Unable to create Collection"
        winston.log("info","createCollection: " + msg)
        res.status(500).json({msg:msg})
        return undefined
    }

    res.status(201).json({value:nCol})
    return undefined
}

/*
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
}
*/