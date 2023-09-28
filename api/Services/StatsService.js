const UserService = require("../Services/UserService");
const Entry = require("../Models/MediaEntry");
const Media = require("../Models/Media");
const {Op, where} = require("sequelize")
const winston = require("../logger/logger");
const sequelize = require("../Database/database");

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
            return item.genre.toLowerCase().trim();
        });
    }

    return nGenres;
}

exports.getYearlyEvolution = async function(userId, type){
    let minDate;
    let maxDate;
    var values = []
    let includeObj = {}
    var whereObj = {}

    minDate = await Entry.min('finish_date')
    maxDate = await Entry.max('finish_date')
    minDate = new Date(minDate);
    maxDate = new Date(maxDate)


    let minYear = minDate.getFullYear();
    let maxYear = maxDate.getFullYear();


    if(type != undefined){
        /*includeObj = {
            include:{
                model:Media,
                as:'Media',
                where:{type:type}
            },
//            attributes:{exclude:['Media']}
        }*/

        includeObj={
            model:Media,
            as:'Media',
            where:{type:type}
        }
        whereObj={type:type}
    }

    for(let i = minYear; i<=maxYear; i++){
        let date1 = new Date(i,0,1,0,0);
        let date2 = new Date(i+1,0,1,0,0);
        
        let count = await Entry.count({
            where:{finish_date:{[Op.between]:[date1,date2]}, user_id:userId},
            include:{
                model:Media,
                as:'Media',
                where:whereObj
            }
        })

        values.push([i,count]);
    }

    return values;
}

exports.getMonthlyEvolution = async function(userId, year, type){
    console.log(type);
    var values = []
    var whereObj = {}
    var months = ['January','February','March','April',
    'May','June','July','August','September','October','November','December']

    if(type != undefined){
        whereObj = {type:type}
    }

    for(let i=0;i<=12;i++){
        let date1 = new Date(year,i,1,1,0);
        let date2 = new Date(year,i+1,1,1,0);

        let count = await Entry.count({
            where:{finish_date:{[Op.between]:[date1,date2]}, user_id:userId},
            include:{
                model:Media,
                as:'Media',
                where:whereObj
            }
        })

        values.push([months[i],count]);
    }

    return values;
}

exports.recentMediaRows = async function(){
    let list = await Media.findAll({
        limit:10,
        group:'media_id',
        order:sequelize.literal('max("createdAt") DESC'),
        attributes:{exclude:['cover']}

    })    
    .catch((err)=>{
        winston.log("error","recentMediaRows: " + err);
        return undefined;
    });

    return list;
}

exports.recentEntryRows = async function(userId){
    let list = await Entry.findAll({
        where:{
            user_id:userId
        },
        group:"entry_id",
        order:sequelize.literal('max("finish_date") DESC'),
        limit:10,
        include:{
            model:Media,
            as:'Media',
            attributes:{exclude:['cover','createdAt']},
        },
        group:['Media.media_id','entry_id']

    })
    .catch((err)=>{
        winston.log("error","recentEntryRows: " + err);
        return undefined;
    });

    return list;
}
