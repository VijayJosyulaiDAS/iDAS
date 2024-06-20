const Sequelize = require("sequelize");

module.exports.upcoming_production ={
    id:{
        type:Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull:false,
        unique : true,
        primaryKey:true,
    },
    plant:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    schedule_start_date_year:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    schedule_start_date_month:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    schedule_start_date_day:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    line_code:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    prod_id:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    prod_name:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    plan_order_qty:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    plan_order_qty_boum:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    order_num:{
        type:Sequelize.STRING,
        allowNull: true,
    }
}
