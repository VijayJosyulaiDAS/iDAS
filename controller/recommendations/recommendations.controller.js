const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");

let getRecommendations = async (req, res) => {
    try {

        const query = `SELECT * FROM [dbo].[tbl_recommendations]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).send({ successful: true, data: data });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

let getRecommendationByUseCases = async (req, res) => {
    try {
        let useCaseId = (req.query.id).toString();
        const query = `SELECT * FROM [dbo].[tbl_recommendations] where use_case_id = '${useCaseId}'`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        const queryOpenCount = `SELECT COUNT(*) as openCount FROM [dbo].[tbl_recommendations] where active = 1 and use_case_id = '${useCaseId}'`
        const openCount = await sequelize.query(queryOpenCount, {
            type: sequelize.QueryTypes.SELECT
        })
        const queryCloseCount = `SELECT COUNT(*) as closeCount FROM [dbo].[tbl_recommendations] where active = 0 and use_case_id = '${useCaseId}'`
        const closeCount = await sequelize.query(queryCloseCount, {
            type: sequelize.QueryTypes.SELECT
        })
        res.status(200).send({ successful: true, data: data, open: openCount[0].openCount,close: closeCount[0].closeCount });
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

let createRecommendations = async (req, res) => {
    try {
        let data = req.body
        await util.model.recommendations.bulkCreate(data)
        res.status(200).send({ successful: true, message: 'data inserted successfully' });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};


let updateRecommendation = async (req, res) => {
    try {
        let recommendationId = (req.query.id).toString();
        let data = req.body
        console.log(data)
        await util.model.recommendations.update(data, {
            where: {
                use_case_id: data.use_case_id,
                id: recommendationId
            }
        })
        res.status(200).send({successful: true, message: 'done'});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    getRecommendations,
    getRecommendationByUseCases,
    updateRecommendation,
    createRecommendations
};
