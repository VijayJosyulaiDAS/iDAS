const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');


let getBomData = async (req, res) => {
    try {
        const query = `SELECT TOP(10000) * FROM [dbo].[tbl_bom]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({ successful: true, data: data});
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

module.exports = {
    getBomData
};
