const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Database port (default is 5432)
    dialect: 'postgres',
    
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the Loan model
db.Loan = require('./loan')(sequelize, DataTypes);

module.exports = db;
