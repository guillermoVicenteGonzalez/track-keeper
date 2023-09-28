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
    let year = req.body.year;
    let month = req.body.month;
    var date1 = undefined, date2 = undefined;

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

    //now, if there are both year an month, we compose the dates
    if(year != undefined && month != undefined){
        date1 = new Date(year, month,1,0,0);
        date2 = new Date(year, month + 1,1,0,0)
    }else if(year != undefined){
        date1 = new Date(year,1,1,0,0);
        date2 = new Date(year +1,1,1,0,0);
    }

    //then we get all the posible types
    let types = Media.getAttributes().type.values;
    let count ={};
    for(let i in types){
        let t = await StatsService.getEntryRowCount(userId,types[i],date1,date2);
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
    let type = req.body.type;
    var finishD;

    if(!userId || !auth){
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

    if(date != undefined && !(date instanceof Date)){
        finishD = new Date(date + 1,1,1,0,0)
        date = new Date(date,1,1,0,0);
    }


    //then we get an array of all the genres
    var genres = await StatsService.getGenres(userId,type,date, finishD);

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
        let count = 1;
        let j = Number(i + 1); //if not it is treated as a string??????
        //let j = 1;
        let name = genres[i]
        
        /*for(j; j<genres.length; j++){
            console.log(genres[i], genres[j]);
            if(genres[i] == genres[j]){
                console.log("iguales");
                count ++;
                genres.splice(j,1);
                console.log(genres);
            }
        }*/

        while(j<genres.length){
            console.log(genres[i], genres[j]);
            if(genres[i] == genres[j]){
                console.log("iguales");
                count ++;
                genres.splice(j,1);
                console.log(genres);
            }else{
                j++;
            }   
        }

        arr.push([name,count]);
    }

    //finally we have to sort them
    arr.sort((a,b)=>{
        return b[1] - a[1]
    })

    res.status(200).json({value:arr,genres:genres});
    return true;
}


exports.getEvolution = async function(req,res){
    let userId = req.params.user_id;
    let auth = req.headers.authorization;
    let year = req.body.year;
    let type = req.body.type;

    if(!userId || !auth){
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

    if(year != undefined){
        var value = await StatsService.getMonthlyEvolution(userId,year,type)
    }else{
        var value = await StatsService.getYearlyEvolution(userId,type)
    }

    if(!value){
        let msg = "Unable to get evolution";
        winston.log("info","getEvlution: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    res.status(200).json({value:value});
    return true
}

exports.getRecentActivity = async function(req,res){
    let userId = req.params.user_id;
    let auth = req.headers.authorization;

    if(!userId || !auth){
        let msg = "Missing parameters";
        winston.log("info","getRecentActivity: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    //first we authenticate the user
    let token = auth.split(' ')
    token = token[1]
    let authRes = await UserService.authenticateUser(userId, token, res)
    if(! (authRes instanceof User)){
        winston.log("info","getRecentActivity: " + authRes)
        return undefined
    }

    let media = await StatsService.recentMediaRows();
    if(!media){
        let msg = "Unable to get recent media";
        winston.log("info","getRecentActivity: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    let entries = await StatsService.recentEntryRows(userId);
    if(!entries){
        let msg = "Unable to get recently added entries"
        winston.log("info","getRecentActivity: " + msg);
        res.status(400).json({msg:msg});
        return undefined;
    }

    res.status(200).json({media:media, entries:entries});
    return true;
}


exports.test = async function(req,res){
    let value = await StatsService.getYearlyEvolution(1);
    res.status(200).json({value:value});
}
