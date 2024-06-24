const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");


let getUseCases = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_use_cases]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        const titles =  data.map((item) => item.title);
        const getCounts = async (useCaseId) => {
            const queryOpenCount = `SELECT COUNT(*) as openCount FROM [dbo].[tbl_final_suggestions] WHERE active = 1 AND use_case_id = '${useCaseId}' and best_alternative = 1`;
            const openCount = await sequelize.query(queryOpenCount, {
                type: sequelize.QueryTypes.SELECT
            });
            const queryCloseCount = `SELECT COUNT(*) as closeCount FROM [dbo].[tbl_final_suggestions] WHERE active = 0 AND use_case_id = '${useCaseId}'`;
            const closeCount = await sequelize.query(queryCloseCount, {
                type: sequelize.QueryTypes.SELECT
            });
            return { openCount: openCount[0].openCount, closeCount: closeCount[0].closeCount };
        };
        for (let useCase of data) {
            if (titles.includes(useCase.title)) {
                const counts = await getCounts(useCase.id);
                useCase.OpenCount = counts.openCount;
                useCase.CloseCount = counts.closeCount;
            }
        }
        res.status(200).send({ successful: true, data: data});
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
let updateUseCases = async (req, res) => {
    try {
        let data = req.body
        await util.model.use_cases.update(data, {
                where: {
                    id: data.use_case_id
                }
            })
        res.status(200).send({ successful: true, message: 'data inserted successfully' });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

module.exports = {
    getUseCases,
    createUseCases,
    updateUseCases
};
