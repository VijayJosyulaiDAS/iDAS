const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const {query} = require("express");
const lodash = require("lodash");
const formidable = require('formidable');
const XLSX = require('xlsx');

let p3mData = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        const parseForm = () => {
            return new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            });
        };
        const { fields, files } = await parseForm();
        if (!files || !files.file) {
            return res.status(400).send('No files were uploaded.');
        }
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        const workbook = XLSX.readFile(file.filepath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(sheet);
        let finalData = jsonData.map(item => ({
            posting_date: (item.posting_date).toString(),
            qty: item.qty.toString(),
            uom: item.uom.toString(),
            rm_code: item.rm_code.toString()
        }));

        let chunks = lodash.chunk(finalData, 1000);
        await sequelize.query(`TRUNCATE TABLE [dbo].[tbl_p3m]`, {
            type: sequelize.QueryTypes.DELETE,
        });
        for (let chunk of chunks) {
            await util.model.p3m.bulkCreate(chunk);
        }
        res.status(200).send({successful: true, data: chunks});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

let get_p3mData = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_p3m]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    p3mData,
    get_p3mData
}