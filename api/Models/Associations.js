const sequelize = require("../Database/database");
const User = require("../Models/UserModel")
const Media = require("../Models/Media")
const Entry = require("../Models/MediaEntry")
const Collection = require("../Models/Collection")
const CollectionEntry = require("../Models/CollectionEntry")
const { DataTypes } = require('sequelize');



exports.synchronize = async function(){
    await User;
    await Media;
    await Entry;

    console.log("starting sync");

    User.hasMany(Media,{
        foreignKey:{
            name:'user_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Media.belongsTo(User,{
        foreignKey:{
            name:'user_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    User.hasMany(Entry,{
        foreignKey:{
            name:'user_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Entry.belongsTo(User,{
        foreignKey:{
            name:'user_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Media.hasMany(Entry,{
        as:'Entry',
        foreignKey:{
            name:'media_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Entry.belongsTo(Media,{
        as:'Media',
        foreignKey:{
            name:'media_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Collection.hasMany(CollectionEntry,{
        as:'ColEntry',
        foreignKey:{
            name:'collection_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    CollectionEntry.belongsTo(Collection,{
        as:'Collection',
        foreignKey:{
            name:'collection_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Entry.hasMany(CollectionEntry,{
        as:'ColEntry',
        foreignKey:{
            name:'entry_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    CollectionEntry.belongsTo(Entry,{
        as:'Entry',
        foreignKey:{
            name:'entry_id',
            allowNull:false
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })

    
    User.hasMany(Collection,{
        as:'Collection',
        foreignKey:{
            name:'user_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    Collection.belongsTo(User,{
        as:'User',
        foreignKey:{
            name:'user_id',
            allowNull:false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })



    //si lo pongo aparece RoleId en Organizations y no hace falta.
    //Role.hasOne(Organization); 
/*
    User.hasMany(Role,{
        foreignKey:{
            name:'userId',
            allowNull: false
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    });


    
    //esto crea roleId en User y realmente no hace falta.
    //Tampoco molesta y probablmenete sea util pero hace mas complejas las funciones
    //esto es porque hay que actualizar la tabla users.
    //Role.hasOne(User);

    //Examenes
    Exam.hasMany(Question,{
        foreignKey:{
            name:'exam_id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    });

    Exam.hasMany(Result,{
        foreignKey:{
            name:'exam_id',
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    });

    User.hasMany(Result,{
        foreignKey:{
            name:'user_id',
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })

    User.hasMany(Answer,{
        foreignKey:{
            name:'user_id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    });

    Exam.hasMany(Answer,{
        foreignKey:{
            name:'exam_id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    });
*/
    sequelize.sync({alter:true});
    console.log("Synchronizing finished");
}