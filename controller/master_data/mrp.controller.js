const {sequelize} = require('../../connection/sql_connection');
const util = require('../../util');


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
    getMRPData
};
