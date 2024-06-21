const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const {query} = require("express");
const lodash = require("lodash");
const formidable = require('formidable');
const XLSX = require('xlsx');

let packed_mrpData = async (req, res) => {
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
                plant: (item.Plant).toString(),
                category: 'Hair Care',
                material_code: (item['Material Code']).toString(),
                material_desc: (item['Material Desc']).toString(),
                mrp: (item['MRP Controller']).toString(),
                mrp_type: (item['MRP Type']).toString(),
                availability_check: (item['Availability Check']).toString(),
                rounding_value: (item['Rounding Value']).toString(),
                planned_delivery_time: (item['Planned delivery tim']).toString(),
                good_receipt_procc: item['Goods receipt procc'],
                total_replenishment: item['Total replenishment'],
                safety_stock: item['Safety stock'],
                safety_time: item['Safety Time'],
                procurement_type: item['Procurement Type'],
                minimum_lot_size: item['Minimum Lot size'],
                base_unit_of_measure: item['Base unit of measure']
        }));

        let chunks = lodash.chunk(finalData, 1000);
        await sequelize.query(`TRUNCATE TABLE [dbo].[tbl_packed_mrp]`, {
            type: sequelize.QueryTypes.DELETE,
        });
        for (let chunk of chunks) {
            await util.model.packed_mrp.bulkCreate(chunk);
        }
        res.status(200).send({successful: true, data: chunks});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

let get_packed_MRPData = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_packed_mrp]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    packed_mrpData,
    get_packed_MRPData
}