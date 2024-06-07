const Sequelize = require("sequelize");

module.exports.alternative_recommendations ={
    id:{
        type:Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull:false,
        unique : true,
        primaryKey:true,
    },
    recommendation_desc:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    best_alternative:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    source:{
        type:Sequelize.STRING,
        allowNull:false
    },
    use_case_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    recommendation_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    original_qty:{
        type:Sequelize.STRING,
        allowNull:false
    },
    minimum_order_qty:{
        type:Sequelize.STRING,
        allowNull:false
    }
}
