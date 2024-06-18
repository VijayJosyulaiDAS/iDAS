const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');
const {where} = require("sequelize");

let getUser = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_user]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({ successful: true, data: data });
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

let createUser = async (req, res) => {
    try {
        await util.model.User.create(req.body)
        res.status(200).send({successful: true, message: 'done'});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};
let updateUser = async (req, res) => {
    try {
        await util.model.User.update(req.body, {
            where: {
                email: req.body.email,
            }
        })
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
    createUser,
    updateUser,
    deleteUser
};
