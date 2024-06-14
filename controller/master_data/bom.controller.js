const { sequelize } = require('../../connection/sql_connection');
const util = require('../../util');


let getBomData = async (req, res) => {
    try {
        const query = `SELECT [Material] as material, [Material Description] as material_description, [Valid From] as valid_from, [Confirmed Quantity] as confirmed_quantity
      ,[Valid to] as valid_to, [Plant] as plant, [Item Number] as item_number, [Item Category] as item_category, [Component] as component, [Material Description.1] as material_description_1,
                                [Component quantity] as component_quantity, [Component unit] as component_unit FROM [dbo].[bom]`;
        const data = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).send({ successful: true, data: data});
    } catch (e) {
        res.status(500).send({ successful: false, error: e });
    }
};

module.exports = {
    getBomData
};
