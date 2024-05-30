const Sequelize = require("sequelize");

module.exports.user ={
    id:{
        type:Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull:false,
        uniqe : true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role:{
        type:Sequelize.STRING,
        allowNull:false
    }
}
