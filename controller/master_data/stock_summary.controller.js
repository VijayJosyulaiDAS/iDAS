const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const {query} = require("express");


let stock_summaryData = async (req, res) => {
    try {
        const query = `SELECT * FROM [dbo].[tbl_stock_summary]`;
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
        const read2 = reader.readFile("/home/sidd/Downloads/STOCK SUMMARY (BUOM).xlsx")
        read2.SheetNames.forEach(sheet => {
            file = reader.utils.sheet_to_json(read2.Sheets[sheet])
        })
        for (let item of file){
           let obj = {
               plant: (item.Plant).toString(),
               material: (item.Material).toString(),
               material_desc: (item['Material Desc']).toString(),
               criticality: (item['Criticality']).toString(),
               qi: (item['QI']).toString(),
               blocked: (item['Blocked']).toString(),
               safety_stock: (item['Safety Stock']).toString(),
               sap_dfc: (item[' SAP DFC [MRP avail] ']).toString(),
               iwl_status: item['IWL Status'],
               moq: item['MOQ'],
               unrestricted: item['Unrestricted'],
               mrp_controller: item['MRP Controller'],
               material_type: item['Material Type'],
               unrestricted_new: item['Unrestricted_new'],
               qi_new: item['QI_new'],
               blocked_new: item['Blocked_new'],
           }
           const data = await util.model.stock_summary.create(obj);
        }
        // const query = `SELECT [Date] as date, [APO Product] as apo_product, [Produced] as produced, [insertion_date] as insertion_date FROM [dbo].[production_till_date]`;
        // const data = await sequelize.query(query, {
        //     type: sequelize.QueryTypes.SELECT,
        // });
        res.status(200).send({successful: true, data: file});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    stock_summaryData,
    create_stock_summary
};
