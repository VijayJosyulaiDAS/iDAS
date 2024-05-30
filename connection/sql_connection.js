const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.config')[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        options: {
            validateBulkLoadParameters: true,
            trustServerCertificate: true,
            useUTC: false,
            timezone: process.env.TZ,
            requestTimeout: 300000,
            connectTimeout: 60000
        }
    },
    timezone: process.env.TZ,
    pool: {
        max: 100,
        min: 0,
        idle: 100000,
        acquire:9000000
    },
    logging: false,
});

sequelize.authenticate().then(function (err) {
    if (err) console.log(`Unable to connect to the ${config.dialect} database:`, err);
    console.log(`${config.database}` + ' Connection has been established successfully.');
});

module.exports.sequelize = sequelize;

