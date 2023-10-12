'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, "../db-config/config.js"))[env];
const db = {};
const { DB_POOL } = require("../utils/constants");

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: DB_POOL, // Optional - Used for Sequelize connection pool configuration
    define: {
      freezeTableName: true, // Enforcing the table name to be equal to the model name
    },
    logging: false,
    // logging: (msg) => console.log(msg),
  }
);

sequelize
	.authenticate()
	.then(() => {
		console.log('Database Connected.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
