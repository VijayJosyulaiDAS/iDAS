const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const {query} = require("express");
const lodash = require("lodash");
const _ = require('lodash');
const formidable = require("formidable");
const XLSX = require("xlsx");

let stock_summaryData = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_stock_summary] WHERE plant = '7724'`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

let create_stock_summary = async (req, res) => {
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
                plant: item.Plant ? item.Plant.toString() : '',
                material: item.Material ? item.Material.toString() : '',
                material_desc: item['Material Desc'] ? item['Material Desc'].toString() : '',
                criticality: item['Criticality'] ? item['Criticality'].toString() : '',
                qi: item['QI'] ? item['QI'].toString() : '',
                blocked: item['Blocked'] ? item['Blocked'].toString() : '',
                safety_stock: item['Safety Stock'] ? item['Safety Stock'].toString() : '',
                sap_dfc_mrp_avail: item[' SAP DFC [MRP avail] '] ? item[' SAP DFC [MRP avail] '].toString() : '',
                sap_dfc_plant_stock: item['SAP DFC [Plant Stock] '] ? item['SAP DFC [Plant Stock] '].toString() : '',
                iwl_status: item['IWL Status'] ? item['IWL Status'].toString() : '',
                moq: item['MOQ'] ? item['MOQ'].toString() : '',
                unrestricted: item['Unrestricted'] ? item['Unrestricted'].toString() : '',
                mrp_controller: item['MRP Controller'] ? item['MRP Controller'].toString() : '',
                material_type: item['Material Type'] ? item['Material Type'].toString() : '',
                unrestricted_new: item['Unrestricted_new'] ? item['Unrestricted_new'].toString() : '',
                qi_new: item['QI_new'] ? item['QI_new'].toString() : '',
                blocked_new: item['Blocked_new'] ? item['Blocked_new'].toString() : '',
        }));
        let chunks = lodash.chunk(finalData, 1000);
        await sequelize.query(`TRUNCATE TABLE [dbo].[tbl_stock_summary]`, {
            type: sequelize.QueryTypes.DELETE,
        });
        for(let chuck of chunks){
            await util.model.stock_summary.bulkCreate(chuck);
        }
        res.status(200).send({successful: true, data: chunks});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    stock_summaryData,
    create_stock_summary
};
