const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const lodash = require("lodash");
const formidable = require("formidable");
const XLSX = require("xlsx");


let get_yesterday_production = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_yesterday_production]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};
let yesterday_production = async (req, res) => {
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
                plant: item['Plant'] ? item['Plant'].toString() : '',
                confirmed_order_qty: item['Confirmed Order Qty'] ? item['Confirmed Order Qty'].toString() : '',
                plan_order_qty_boum: item['Plan Order Qty (BOUM)'] ? item['Plan Order Qty (BOUM)'].toString() : '',
                line_code: item['Line Code'] ? item['Line Code'].toString() : '',
                prod_id: item['Prod id'] ? item['Prod id'].toString() : '',
                prod_name: item['Prod Name'] ? item['Prod Name'].toString() : '',
                plan_order_qty: item['Plan Order Qty'] ? item['Plan Order Qty'].toString() : '',
                confirmed_order_qty_boum: item['Confirm Order Qty (BOUM)'] ? item['Confirm Order Qty (BOUM)'].toString() : '',
        }));

        let chunks = lodash.chunk(finalData, 1000);
        await sequelize.query(`TRUNCATE TABLE [dbo].[tbl_yesterday_production]`, {
            type: sequelize.QueryTypes.DELETE,
        });
        for(let chuck of chunks){
            await util.model.yesterday_production.bulkCreate(chuck);
        }
        res.status(200).send({successful: true, data: chunks});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    get_yesterday_production,
    yesterday_production
};
