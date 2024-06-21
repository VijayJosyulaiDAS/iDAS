const Sequelize = require("sequelize");

module.exports.p3m ={
    id:{
        type:Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull:false,
        unique : true,
        primaryKey:true,
    },
    posting_date:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    qty:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    uom:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    rm_code:{
        type:Sequelize.STRING,
        allowNull: true,
    }
}
