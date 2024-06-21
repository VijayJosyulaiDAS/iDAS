const util = require("../util");
const user = require("../model/user/user.model")
const { sequelize } = require('../connection/sql_connection');
const {use_cases} = require("../model/use_cases/use_case.model");
const {recommendations} = require("../model/recommendations/recommendations.model");
const {alternative_recommendations} = require("../model/alternative_recommendations/alternative_recommendations");
const {stock_summary} = require("../model/master_data/stock_summary");
const {mrp} = require("../model/master_data/mrp");
const {packed_mrp} = require("../model/master_data/packed_mrp");
const {upcoming_production} = require("../model/master_data/upcoming_production");
const {yesterday_production} = require("../model/master_data/yesterday_production");
const {p3m} = require("../model/master_data/p3m");


let utils = async function (sequelize) {
    try{
        // ============Define table =====================//

        util.model.User =  sequelize.define("tbl_user", user.user, {freezeTableName : true})
        util.model.use_cases =  sequelize.define("tbl_use_cases", use_cases, {freezeTableName : true})
        util.model.recommendations =  sequelize.define("tbl_recommendations", recommendations, {freezeTableName : true})
        util.model.alternative_recommendations =  sequelize.define("tbl_alternative_recommendations", alternative_recommendations, {freezeTableName : true})

        // ======================Master table define====================
        util.model.stock_summary =  sequelize.define("tbl_stock_summary", stock_summary, {freezeTableName : true})
        util.model.mrp =  sequelize.define("tbl_mrp", mrp, {freezeTableName : true})
        util.model.packed_mrp =  sequelize.define("tbl_packed_mrp", packed_mrp, {freezeTableName : true})
        util.model.upcoming_production =  sequelize.define("tbl_upcoming_production", upcoming_production, {freezeTableName : true})
        util.model.yesterday_production =  sequelize.define("tbl_yesterday_production", yesterday_production, {freezeTableName : true})
        util.model.p3m =  sequelize.define("tbl_p3m", p3m, {freezeTableName : true})


        // =====Table Sync After Association =========//

        await util.model.User.sync()
        await util.model.use_cases.sync()
        await util.model.recommendations.sync()
        await util.model.alternative_recommendations.sync()

        // =====================Master Table=======================
        await util.model.stock_summary.sync()
        await util.model.mrp.sync()
        await util.model.packed_mrp.sync()
        await util.model.upcoming_production.sync()
        await util.model.yesterday_production.sync()
        await util.model.p3m.sync()

        util.sequelize = await sequelize;
    }catch (e) {
        console.log("Table Sync error",e)
    }
}

module.exports = {utils};