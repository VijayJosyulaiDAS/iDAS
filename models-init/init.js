const util = require("../util");
const user = require("../model/user/user.model")
const { sequelize } = require('../connection/sql_connection');
const {use_cases} = require("../model/use_cases/use_case.model");
const {recommendations} = require("../model/recommendations/recommendations.model");
const {alternative_recommendations} = require("../model/alternative_recommendations/alternative_recommendations");
const {stock_summary} = require("../model/master_data/stock_summary");
const {mrp} = require("../model/master_data/mrp");


let utils = async function (sequelize) {
    try{
        // ============Define table =====================//

        util.model.User =  sequelize.define("tbl_user", user.user, {freezeTableName : true})
        util.model.use_cases =  sequelize.define("tbl_use_cases", use_cases, {freezeTableName : true})
        util.model.recommendations =  sequelize.define("tbl_recommendations", recommendations, {freezeTableName : true})
        util.model.alternative_recommendations =  sequelize.define("tbl_alternative_recommendations", alternative_recommendations, {freezeTableName : true})
        util.model.stock_summary =  sequelize.define("tbl_stock_summary", stock_summary, {freezeTableName : true})
        util.model.mrp =  sequelize.define("tbl_mrp", mrp, {freezeTableName : true})


        // =====Table Sync After Association =========//

        await util.model.User.sync()
        await util.model.use_cases.sync()
        await util.model.recommendations.sync()
        await util.model.alternative_recommendations.sync()
        await util.model.mrp.sync()

        // =====================Master Table=======================
        await util.model.stock_summary.sync({force: true})

        util.sequelize = await sequelize;
    }catch (e) {
        console.log("Table Sync error",e)
    }
}

module.exports = {utils};