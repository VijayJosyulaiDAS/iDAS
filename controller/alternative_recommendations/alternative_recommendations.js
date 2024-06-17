const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");

let getAlternativeRecommendations = async (req, res) => {
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

let getRecommendationById = async (req, res) => {
    try {
        let idQuery = (req.query.id).toString();
        let useCase = (req.query.useCaseId).toString();
        console.log(idQuery, useCase)
        const query = `SELECT 
        [Material] AS material_code, 
        [id] AS id, 
        [priority], 
        [Quantity] AS quantity, 
        [month_end_inv], 
        [Quantity] AS po_quantity_value,
        [Safety] AS safety, 
        [LeadTime] AS lead_time, 
        [material_needed] AS demand_value, 
        [inv_after_production], 
        CASE 
            WHEN [inv_after_production] < 0 THEN 'increase'
            ELSE NULL
        END AS demand_type,
        [amendment], 
        CASE 
            WHEN [amendment] = 'yes' THEN 'Urgent order for raw materials' 
            ELSE NULL 
        END AS description,
        CASE 
            WHEN [amendment] = 'yes' THEN 'amend' 
            ELSE NULL 
        END AS order_type,
        [Maximum stock level] AS maximum_stock_level, 
        [Rounding value] AS rounding_value, 
        [Minimum Lot Size] AS minimum_lot_size, 
        [Maximum Lot Size] AS maximum_lot_size, 
        [su-factor] AS su_factor, 
        [active],
        [user_desc],
        [recommendation_action],
        [action_owner],
        [status],
        [use_case_id],
        [best_alternative],
        [createdAt],
        [minimum_qty_order], 
        [maximum_qty_order]
    FROM 
        [dbo].[orders_amendment] where material = ${idQuery} or po_number = '${idQuery}' and best_alternative = 0 and active = 1`;
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
