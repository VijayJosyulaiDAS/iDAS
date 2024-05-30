const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");

let getUser = async (req, res) => {
    try {

        const query = `
            SELECT * FROM [dbo].[tbl_user]
        `;

        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).send({ successful: true, data: data });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

let createuser = async (req, res) => {
    try {
        const {name, email, role} = req.body;
        await util.model.user.create(req.body)
        res.status(200).send({successful: true, message: 'done'});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};
let deleteUser = async (req, res) => {
    try {
        console.log(req.query.user_id)
        await util.model.user.destroy({
            where: {
                id: req.params.user_id
            }
        });
        res.status(200).send({successful: true, message: 'done'});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    getUser,
    createuser,
    deleteUser
};
