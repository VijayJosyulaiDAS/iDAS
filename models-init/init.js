const util = require("../util");
const user = require("../model/user/user.model")
const { sequelize } = require('../connection/sql_connection');
const {use_cases} = require("../model/use_cases/use_case.model");
const {recommendations} = require("../model/recommendations/recommendations.model");
const {alternative_recommendations} = require("../model/alternative_recommendations/alternative_recommendations");


let utils = async function (sequelize) {
    try{
        // ============Define table =====================//

        util.model.user =  sequelize.define("tbl_user", user.user, {freezeTableName : true})
        util.model.use_cases =  sequelize.define("tbl_use_cases", use_cases, {freezeTableName : true})
        util.model.recommendations =  sequelize.define("tbl_recommendations", recommendations, {freezeTableName : true})
        util.model.alternative_recommendations =  sequelize.define("tbl_alternative_recommendations", alternative_recommendations, {freezeTableName : true})


        // =====Table Sync After Association =========//

        await util.model.user.sync()
        await util.model.use_cases.sync()
        await util.model.recommendations.sync()
        await util.model.alternative_recommendations.sync()

        util.sequelize = await sequelize;
    }catch (e) {
        console.log("Table Sync error",e)
    }
}

module.exports = {utils};