const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');


let ctReport_Data = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_ct_report]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({ successful: true, data: data});
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

module.exports = {
    ctReport_Data
};