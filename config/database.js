const { Sequelize } = require('sequelize');

require('dotenv').config();

const db = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;