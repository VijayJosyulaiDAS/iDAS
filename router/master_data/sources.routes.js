const express = require('express')
const router = express.Router();

const m1_data = require('../../controller/master_data/m1.controller');
const bom_data = require('../../controller/master_data/bom.controller');
const pos_data = require('../../controller/master_data/current_pos.controller');
const mrp_data = require('../../controller/master_data/mrp.controller');
const production_data = require('../../controller/master_data/production.controller');
const stock_summary = require("../../controller/master_data/stock_summary.controller");
const ctReport_Data = require("../../controller/master_data/ct_report.controller");



router.get('/bom_data', bom_data.getBomData)
router.get('/m1_data', m1_data.getM1Data)
router.get('/pos_data', pos_data.getPOsData)
router.get('/mrp_data', mrp_data.getMRPData)
router.get('/production_data', production_data.getProductionData)
router.get('/ct_report', ctReport_Data.ctReport_Data)

// ============stock summary data ========================
router.get('/stock_summary', stock_summary.stock_summaryData)
router.post('/create_stock_summary', stock_summary.create_stock_summary)


module.exports = router;