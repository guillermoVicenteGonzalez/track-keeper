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

    if(!userId || !auth){
        let msg = "Missing parameters";
        winston.log("info","getEntryCount: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }
    
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

exports.getFavouriteGenres = async function(req,res){
    let userId = req.params.user_id;
    let auth = req.headers.authorization;
    let date = req.body.date;
    let type = req.body.type

    if(!userId || !auth){
        console.log(userId, auth);
        let msg = "Missing parameters";
        winston.log("info","getFavouriteGenres: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    //first we authenticate the user
    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","createEntry: " + authRes)
        return undefined
    }



    //then we get an array of all the genres
    var genres = await StatsService.getGenres(userId,type,year);

    if(!genres){
        let msg = "Unable to get genres";
        winston.log("info","getFavouriteGenres: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }
    var arr = [];

    /**
     * now we compare each element of the array to the rest.
     * if it is equal, we increment the count in obj and slice it to decrease the number of iterations
     */
    for(let i in genres){
        //obj[genres[i]] = 1;
        let count = 1;
        let j //if not it is treated as a string??????
        for(j=1; j<genres.length; j++){
            if(genres[i] == genres[j]){
                //obj[genres[i]] ++;
                count ++;
                genres.splice(j,1);
            }
        }

        arr.push([genres[i],count]);
    }

    //finally we have to sort them
    arr.sort((a,b)=>{
        return b[1] - a[1]
    })

    res.status(200).json({value:arr});
    return true;
}

exports.getFavouriteGenresByType = async function(req,res){
    let userId = req.params.user_id;
    let auth = req.headers.authorization;
    let type = req.params.type;

    if(!userId || !auth || !type){
        let msg = "Missing parameters";
        winston.log("info","getFavouriteGenresByType: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    //first we authenticate the user
    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","createEntry: " + authRes)
        return undefined
    }

    //then we get an array of all the genres
    var genres = await StatsService.getGenres(userId,type);
    if(!genres){
        let msg = "Unable to get genres";
        winston.log("info","getFavouriteGenres: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }
    var obj = {};

    /**
     * now we compare each element of the array to the rest.
     * if it is equal, we increment the count in obj and slice it to decrease the number of iterations
     */
    for(let i in genres){
        obj[genres[i]] = 1;
        for(let j=i+1; j<genres.length; j++){
            if(genres[i] == genres[j]){
                obj[genres[i]] ++;
                genres.splice(j,1);
            }
        }
    }

    //finally we have to sort them
    

    res.status(200).json({value:obj});
    return true;
}

