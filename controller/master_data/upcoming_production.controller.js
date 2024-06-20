const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const lodash = require("lodash");
const formidable = require('formidable');
const XLSX = require('xlsx');


let get_upcoming_production = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_upcoming_production]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};
let upcoming_production = async (req, res) => {
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
            schedule_start_date_year: item['schedule_start_date - Year'] ? item['schedule_start_date - Year'].toString() : '',
            schedule_start_date_month: item['schedule_start_date - Month'] ? item['schedule_start_date - Month'].toString() : '',
            schedule_start_date_day: item['schedule_start_date - Day'] ? item['schedule_start_date - Day'].toString() : '',
            plant: item['Plant'] ? item['Plant'].toString() : '',
            line_code: item['Line Code'] ? item['Line Code'].toString() : '',
            prod_id: item['Prod id'] ? item['Prod id'].toString() : '',
            prod_name: item['Prod Name'] ? item['Prod Name'].toString() : '',
            plan_order_qty: item['Plan Order Qty'] ? item['Plan Order Qty'].toString() : '',
            plan_order_qty_boum: item['Plan Order Qty (BOUM)'] ? item['Plan Order Qty (BOUM)'].toString() : '',
            order_num: item['order_num'] ? item['order_num'].toString() : '',
        }));

        let chunks = lodash.chunk(finalData, 1000);
        await sequelize.query(`TRUNCATE TABLE [dbo].[tbl_upcoming_production]`, {
            type: sequelize.QueryTypes.DELETE,
        });
        for (let chunk of chunks) {
            await util.model.upcoming_production.bulkCreate(chunk);
        }
        res.status(200).send({successful: true, data: chunks});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    get_upcoming_production,
    upcoming_production
};
