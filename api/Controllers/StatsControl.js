const StatsService = require("../Services/StatsService")
const UserService = require("../Services/UserService")
const Media = require("../Models/Media")
const User = require("../Models/UserModel")
const winston = require("../logger/logger")

/**
 * Tengo que devolver:
 *  los tipos (Videogame, FIlm, etc)
 *  la cuenta (en el mismo orden)
 *  un filtro?
 */
exports.getEntryCount = async function(req,res){
    let userId = req.params.user_id;
    let auth = req.headers.authorization;
    
    //first we authenticate the user
    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","createEntry: " + authRes)
        return undefined
    }


    //then we get all the posible types
    let types = Media.getAttributes().type.values;
    let count ={};
    for(let i in types){
        let t = await StatsService.getEntryRowCount(userId,types[i]);
        if(t == undefined){
            let msg = "An error ocurred trying to count the number of: " +types[i] +"s";
            winston.log("info","getEntryCount: " + msg);
            res.status(500).json({msg:msg});
            return undefined;
        }
        count[types[i]] = t;
    }

    //if we get here, we have an object with the labels and the counts
    res.status(200).json({value:count});
    return undefined
}