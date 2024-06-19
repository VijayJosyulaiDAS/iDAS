const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');
const reader = require("xlsx");
const {query} = require("express");

let mrpData = async (req, res) => {
    try {
        const read2 = reader.readFile("./SAP_MRP_HairCare.XLSX")
        read2.SheetNames.forEach(sheet => {
            file = reader.utils.sheet_to_json(read2.Sheets[sheet])
        })
        for (let item of file){
            let obj = {
                plant: (item.Plant).toString(),
                category: 'Hair Care',
                material_code: (item['Material Code']).toString(),
                material_desc: (item['Material Desc']).toString(),
                mrp: (item['MRP']).toString(),
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
            }
            const data = await util.model.sap_mrp.create(obj);
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

let getMRPData = async (req, res) => {
    try {
        const query = `SELECT [Material] as material, [Maximum stock level] as material_stock_level, [Rounding value] as rounding_value, [Minimum Lot Size] as minimum_lot_size, [Maximum Lot Size] as maximum_lot_size, [insertion_date] FROM [dbo].[mrp]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({successful: true, data: data});
    } catch (e) {
        res.status(500).send({successful: false, error: e});
    }
};

module.exports = {
    mrpData,
    getMRPData
}