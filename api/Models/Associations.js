const sequelize = require("../Database/database");
const User = require("../Models/UserModel")
const { DataTypes } = require('sequelize');


exports.synchronize = async function(){
    await User;

    console.log("starting sync");


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
    console.log("Synchronizing");
    sequelize.sync({alter:true});
}