const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');


let getProductionData = async (req, res) => {
    try {
        const query = `SELECT TOP(200) [Date] as date, [APO Product] as apo_product, [Produced] as produced, [insertion_date] as insertion_date FROM [dbo].[production_till_date]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    getProductionData
};
