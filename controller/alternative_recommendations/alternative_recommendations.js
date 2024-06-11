const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");

let getAlternativeRecommendations = async (req, res) => {
    try {

        const query = `SELECT * FROM [dbo].[tbl_alternative_recommendations]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).send({ successful: true, data: data });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

let getRecommendationById = async (req, res) => {
    try {
        let recommendationId = (req.query.id).toString();
        const query = `SELECT * FROM [dbo].[tbl_alternative_recommendations] where recommendation_id = '${recommendationId}'`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({ successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

let createAlternativeRecommendations = async (req, res) => {
    try {
        let data = req.body
        await util.model.alternative_recommendations.bulkCreate(data)
        res.status(200).send({ successful: true, message: 'data inserted successfully' });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};


let updateAlternativeRecommendation = async (req, res) => {
    try {
        let recommendationId = (req.query.id).toString();
        let data = req.body
        console.log(data)
        await util.model.alternative_recommendations.update(data, {
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
    getAlternativeRecommendations,
    getRecommendationById,
    createAlternativeRecommendations,
    updateAlternativeRecommendation
};