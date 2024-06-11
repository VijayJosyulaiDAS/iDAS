const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');


let getUseCases = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_use_cases]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        const queryOpenCount = `SELECT COUNT(*) as openCount FROM [dbo].[tbl_recommendations] where active = 1`

        const openCount = await sequelize.query(queryOpenCount, {
            type: sequelize.QueryTypes.SELECT
        })
        const queryCloseCount = `SELECT COUNT(*) as closeCount FROM [dbo].[tbl_recommendations] where active = 0`

        const closeCount = await sequelize.query(queryCloseCount, {
            type: sequelize.QueryTypes.SELECT
        })
        res.status(200).send({ successful: true, data: data, open: openCount[0].openCount, close: closeCount[0].closeCount });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

let createUseCases = async (req, res) => {
    try {
        let data = req.body
        await util.model.use_cases.bulkCreate(data)
        res.status(200).send({ successful: true, message: 'data inserted successfully' });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

module.exports = {
    getUseCases,
    createUseCases
};
