const Sequelize = require("sequelize");

module.exports.use_cases ={
    id:{
        type:Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull:false,
        uniqe : true,
        primaryKey:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    favorite:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
    last_used_time:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
}
