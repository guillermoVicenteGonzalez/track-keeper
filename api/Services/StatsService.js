const UserService = require("../Services/UserService");
const Entry = require("../Models/MediaEntry");
const Media = require("../Models/Media");
const {Op} = require("sequelize")
const winston = require("../logger/logger")

exports.getEntryRowCount = async function(userId, type, date1, date2){
    var whereObj = {
        user_id:userId,
        state:'finished',
    }
    if(date1!= undefined && date2 != undefined){
        whereObj.finish_date = {[Op.between]:[date1,date2]}
    }
    
    let c = await Entry.count({
        where:whereObj,
        include:{
            model:Media,
            as:'Media',
            where:{type:type}
        }
    })
    .catch((err)=>{
        winston.log("error","getEntryCount " + err);
        return undefined
    });

    return c;
}

exports.getGenres = async function(userId,type,startDate, finishDate){

    var whereObj = {}
    var entryWhereObj = {user_id:userId, state:'finished'}
    if(type){
        whereObj.type=type
    }

    if(finishDate && startDate){
        entryWhereObj.finish_date = {[Op.between]:[startDate, finishDate],}
    }


    var genres = await Media.findAll({
        attributes:['genre'],
        where:whereObj,
        include:{
            model:Entry,
            as:'Entry',
            where:entryWhereObj
        }
    }).
    catch((err)=>{
        winston.log("info","getGenres: " + err);
        return undefined;
    })

    if(genres){
        var nGenres = genres.map((item)=>{
            return item.genre.toLowerCase();
        });
    }

    return nGenres;
}