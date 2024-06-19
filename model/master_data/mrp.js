const Sequelize = require("sequelize");

module.exports.mrp ={
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
    category:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    material_code:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    material_desc:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    mrp:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    mrp_type:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    availability_check:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    rounding_value:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    planned_delivery_time:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    good_receipt_procc:{
        type:Sequelize.BOOLEAN,
        allowNull: true,
    },
    total_replenishment:{
        type:Sequelize.STRING,
        allowNull: true
    },
    safety_stock:{
        type:Sequelize.STRING,
        allowNull: true
    },
    safety_time:{
        type:Sequelize.STRING,
        allowNull: true
    },
    procurement_type:{
        type:Sequelize.DATE,
        allowNull: true
    },
    minimum_lot_size:{
        type:Sequelize.DATE,
        allowNull: true
    },
    base_unit_of_measure:{
        type:Sequelize.DATE,
        allowNull: true
    }
}
