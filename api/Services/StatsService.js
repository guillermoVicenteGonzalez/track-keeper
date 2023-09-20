const UserService = require("../Services/UserService");
const Entry = require("../Models/MediaEntry");
const Media = require("../Models/Media");
const winston = require("../logger/logger")

exports.getEntryRowCount = async function(userId, type, filter){
    let c = await Entry.count({
        where:{
            user_id:userId,
            state:'finished',
        },
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