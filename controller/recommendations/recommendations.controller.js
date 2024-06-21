const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");

let getRecommendations = async (req, res) => {
    try {

        const query = `SELECT 
        [Material] AS material_code, 
        [id] AS id, 
        [Quantity] AS quantity, 
        [month_end_inv], 
        [priority], 
        [Quantity] AS po_quantity_value,
        [Safety] AS safety, 
        [LeadTime] AS lead_time, 
        [description] AS description, 
        [material_needed] AS demand_value, 
        [inv_after_production], 
        CASE 
            WHEN [inv_after_production] < 0 THEN 'increase'
            ELSE NULL
        END AS demand_type,
        [amendment],
        CASE 
            WHEN [amendment] = 'yes' THEN 'Amend' 
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
        [dbo].[orders_amendment] WHERE active = 1`;
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
//         const query = `WITH CTE AS (
//     SELECT
//         [Material] AS material_code,
//         [Quantity] AS quantity,
//         [month_end_inv],
//         [Quantity] AS po_quantity_value,
//         [Safety] AS safety,
//         [LeadTime] AS lead_time,
//         [material_needed] AS demand_value,
//         [inv_after_production],
//         CASE
//             WHEN [inv_after_production] < 0 THEN 'increase'
//             ELSE NULL
//         END AS demand_type,
//         [amendment],
//         CASE
//             WHEN [amendment] = 'yes' THEN 'Urgent order for raw materials'
//             ELSE NULL
//         END AS description,
//         CASE
//             WHEN [amendment] = 'yes' THEN 'amend'
//             ELSE NULL
//         END AS order_type,
//         [Maximum stock level] AS maximum_stock_level,
//         [Rounding value] AS rounding_value,
//         [Minimum Lot Size] AS minimum_lot_size,
//         [Maximum Lot Size] AS maximum_lot_size,
//         [su-factor] AS su_factor,
//         [active],
//         [user_desc],
//         [recommendation_action],
//         [action_owner],
//         [status],
//         [use_case_id],
//         [best_alternative],
//         [createdAt],
//         [minimum_qty_order],
//         [maximum_qty_order],
//         ROW_NUMBER() OVER (PARTITION BY [Material] ORDER BY [Material]) AS rn
//     FROM
//         [dbo].[orders_amendment] WHERE use_case_id = '${useCaseId}' and best_alternative = 1
// )
// SELECT
//     material_code,
//     quantity,
//     month_end_inv,
//     po_quantity_value,
//     safety,
//     lead_time,
//     demand_value,
//     inv_after_production,
//     demand_type,
//     amendment,
//     description,
//     order_type,
//     maximum_stock_level,
//     rounding_value,
//     minimum_lot_size,
//     maximum_lot_size,
//     su_factor,
//     active,
//     user_desc,
//     recommendation_action,
//     action_owner,
//     status,
//     use_case_id,
//     createdAt,
//     best_alternative,
//     minimum_qty_order,
//     maximum_qty_order
// FROM
//     CTE
// WHERE
//     rn = 1;
// `;
        const query = ` SELECT 
        [Material] AS material_code, 
        [id] AS id, 
        [Quantity] AS quantity, 
        [month_end_inv], 
        [priority], 
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
            WHEN [amendment] = 'yes' THEN 'Amend' 
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
        [dbo].[orders_amendment] WHERE use_case_id = '${useCaseId}' and best_alternative = 1
`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        const queryOpenCount = `SELECT COUNT(*) as openCount FROM [dbo].[orders_amendment] where active = 1 and use_case_id = '${useCaseId}' and best_alternative = 1`
        const openCount = await sequelize.query(queryOpenCount, {
            type: sequelize.QueryTypes.SELECT
        })
        const queryCloseCount = `SELECT COUNT(*) as closeCount FROM [dbo].[orders_amendment] where active = 0 and use_case_id = '${useCaseId}' and best_alternative = 1`
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
        let data = req.body;
        console.log(data)
        let query = `
    UPDATE [dbo].[orders_amendment]
    SET 
        use_case_id = :use_case_id,
        active = :active,
        action_owner = :action_owner,
        recommendation_action = :recommendation_action,
        user_desc = :user_desc
    WHERE 
        id = :recommendationId
`;

        await sequelize.query(query, {
            replacements: {
                use_case_id: data.use_case_id,
                active: data.active,
                action_owner: data.action_owner,
                recommendation_action: data.recommendation_action,
                user_desc: data.user_desc,
                recommendationId: recommendationId
            },
            type: sequelize.QueryTypes.UPDATE
        });

        // // Check if `data.best_alternative` is true
        // if (data?.best_alternative) {
        //     let data2 = {
        //         best_alternative: false,
        //         active: false
        //     }
        //     // If true, update other recommendations where active is true and po_number matches req.query.id
        //     await util.model.recommendations.update(data2, {
        //         where: {
        //             best_alternative: true,
        //             use_case_id: data.use_case_id,
        //             po_number: data.po_number
        //         }
        //     });
        // }
        // await util.model.recommendations.update(data, {
        //     where: {
        //         use_case_id: data.use_case_id,
        //         id: recommendationId
        //     }
        // })
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
