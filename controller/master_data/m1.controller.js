const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');


let getM1Data = async (req, res) => {
    try {
        const query = `SELECT TOP(200) [Reporting Country] as reporting_country, [Category] as category, [Brand] as brand,  [Customer Group] as customer_group, [SFU Version] as sfu_version, [APO Product] as apo_product, [Product Description] as product_description, 
                            [APO Location] as apo_location, [Overall] as overall, [Plant Codes] as plant_codes, [Distributors] as distributors, [Source DC] as source_dc, [date] as date FROM [dbo].[m-1]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    getM1Data
};
