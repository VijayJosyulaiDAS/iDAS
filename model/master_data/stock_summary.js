const Sequelize = require("sequelize");

module.exports.stock_summary ={
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
    material:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    material_desc:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    criticality:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    unrestricted:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    qi:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    blocked:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    safety_stock:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    sap_dfc:{
        type:Sequelize.BOOLEAN,
        allowNull: true,
    },
    iwl_status:{
        type:Sequelize.STRING,
        allowNull: true
    },
    next_planned_reciept_date:{
        type:Sequelize.STRING,
        allowNull: true
    },
    next_po_number:{
        type:Sequelize.STRING,
        allowNull: true
    },
    next_po_qty:{
        type:Sequelize.DATE,
        allowNull: true
    },
    me_inv:{
        type:Sequelize.DATE,
        allowNull: true
    },
    me_inv_$m:{
        type:Sequelize.DATE,
        allowNull: true
    },
    moq:{
        type:Sequelize.STRING,
        allowNull: true
    },
    agreed_st_days:{
        type:Sequelize.STRING,
        allowNull: true
    },
    grpt:{
        type:Sequelize.STRING,
        allowNull: true
    },
    mrp_controller:{
        type:Sequelize.STRING,
        allowNull: true
    },
    material_type:{
        type:Sequelize.STRING,
        allowNull: true
    },
    unrestricted_new:{
        type:Sequelize.STRING,
        allowNull: true
    },
    qi_new:{
        type:Sequelize.STRING,
        allowNull: true
    },
    blocked_new:{
        type:Sequelize.STRING,
        allowNull: true
    }
}
