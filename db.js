require("dotenv").config()
const { Sequelize } = require('sequelize');
const fs = require('fs');
// const rdsCa = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        dialect: "postgres",
        operatorsAliases:false,
        dialectOptions: {
            socketPath: process.env.DATABASE_HOST,
            ssl: {
                rejectUnauthorized: true,
                rejectUnauthorized: false,
                // ca: [rdsCa],
            },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        port:5432
    }
);


module.exports = sequelize