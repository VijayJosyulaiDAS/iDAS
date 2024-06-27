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

        let query1 = `SELECT  [po_date],[material_code],[po_number]
      ,[due_date]
      ,[qty] AS quantity
      ,[transist_time] AS lead_time
      ,[adjusted_order] AS quantity
      ,[unrestricted] AS available_inventory_value
      ,[ordered_qty] AS po_quantity_value
      ,[rounding_value]
      ,[order_type]
      ,[id]
      ,[demand_type]
      ,[use_case_id]
      ,[user_desc]
      ,[description]
      ,[detail_desc]
      ,[active]
      ,[status]
      ,[recommendation_action]
      ,[action_owner]
      ,[created_at]
   FROM [dbo].[tbl_final_suggestions] WHERE active = 1`

        const data = await sequelize.query(query1, {
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).send({ successful: true, data: data });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

const getRecommendationByUseCases = async (req, res) => {
    try {
        let useCaseId = req.query.id.toString();
        let query1;
        let queryOpenCount;
        let queryCloseCount;

        if (useCaseId === 'total') {
            query1 = `
                SELECT [po_date], [material_code], [po_number], [due_date], [qty] AS quantity,
                       [uom], [safety_stock], [transist_time] AS lead_time, [adjusted_order] AS quantity,
                       [unrestricted] AS available_inventory_value, [ordered_qty] AS po_quantity_value,
                       [rounding_value], [order_type], [id], [demand_type], [use_case_id], [user_desc],
                       [description], [detail_desc], [active], [status], [recommendation_action],
                       [action_owner], [created_at]
                FROM [dbo].[tbl_final_suggestions]
                WHERE best_alternative = 1
            `;
            queryOpenCount = `
                SELECT COUNT(*) as openCount 
                FROM [dbo].[tbl_final_suggestions] 
                WHERE active = 1 AND best_alternative = 1
            `;
            queryCloseCount = `
                SELECT COUNT(*) as closeCount 
                FROM [dbo].[tbl_final_suggestions] 
                WHERE active = 0 AND best_alternative = 1
            `;
        } else {
            query1 = `
                SELECT [po_date], [material_code], [po_number], [due_date], [qty] AS quantity,
                       [uom], [safety_stock], [transist_time] AS lead_time, [adjusted_order] AS quantity,
                       [unrestricted] AS available_inventory_value, [ordered_qty] AS po_quantity_value,
                       [rounding_value], [order_type], [id], [demand_type], [use_case_id], [user_desc],
                       [description], [detail_desc], [active], [status], [recommendation_action],
                       [action_owner], [created_at]
                FROM [dbo].[tbl_final_suggestions]
                WHERE use_case_id = '${useCaseId}' AND best_alternative = 1
            `;
            queryOpenCount = `
                SELECT COUNT(*) as openCount 
                FROM [dbo].[tbl_final_suggestions] 
                WHERE active = 1 AND use_case_id = '${useCaseId}' AND best_alternative = 1
            `;
            queryCloseCount = `
                SELECT COUNT(*) as closeCount 
                FROM [dbo].[tbl_final_suggestions] 
                WHERE active = 0 AND use_case_id = '${useCaseId}' AND best_alternative = 1
            `;
        }

        const [result1, openCount, closeCount] = await Promise.all([
            sequelize.query(query1, { type: sequelize.QueryTypes.SELECT }),
            sequelize.query(queryOpenCount, { type: sequelize.QueryTypes.SELECT }),
            sequelize.query(queryCloseCount, { type: sequelize.QueryTypes.SELECT })
        ]);

        const combinedResult = {
            data: result1,
            openCount: openCount[0].openCount,
            closeCount: closeCount[0].closeCount
        };
        res.status(200).send({
            successful: true,
            data: combinedResult.data,
            open: combinedResult.openCount,
            close: combinedResult.closeCount
        });
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).send({ successful: false, message: 'Failed to fetch data.' });
    }
};


let get_impactData = async (req, res) => {
    try {
        let rpm_code = (req.query.id).toString();
        const query = `SELECT DISTINCT
    bom.*,
    m1.[Product Description]
FROM
    dbo.[tbl_bom_prod_mapping] AS bom
LEFT JOIN
    dbo.[m-1] AS m1 ON bom.[APO Product] = m1.[APO Product]
WHERE
    bom.[RPM Code] = '${rpm_code}';`

        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({ successful: true, data: data });
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
    UPDATE [dbo].[tbl_final_suggestions]
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
    get_impactData,
    createRecommendations
};
