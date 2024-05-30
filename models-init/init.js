const util = require("../util");
const user = require("../model/user/user.model")
const { sequelize } = require('../connection/sql_connection');


let utils = async function (sequelize) {
    try{
        // ============Define table =====================//

        util.model.user =  sequelize.define("tbl_user", user.user, {freezeTableName : true})


        // =====Table Sync After Association =========//

        await util.model.user.sync()

        util.sequelize = await sequelize;
    }catch (e) {
        console.log("Table Sync error",e)
    }
}

module.exports = {utils};