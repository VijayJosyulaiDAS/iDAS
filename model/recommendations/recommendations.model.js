const Sequelize = require("sequelize");

module.exports.recommendations ={
    id:{
        type:Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull:false,
        unique : true,
        primaryKey:true,
    },
    priority:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    material_code:{
        type:Sequelize.STRING,
        allowNull:false
    },
    revenue_impact:{
        type:Sequelize.STRING,
        allowNull:false
    },
    unit_impact:{
        type:Sequelize.STRING,
        allowNull:false
    },
    impact_coverage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    confidence_score:{
        type:Sequelize.STRING,
        allowNull:false
    },
    source_location:{
        type:Sequelize.STRING,
        allowNull:false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    },
    use_case_id:{
        type:Sequelize.STRING,
        allowNull:false
    },
    due_date:{
        type:Sequelize.DATE,
        allowNull:false
    }
}
