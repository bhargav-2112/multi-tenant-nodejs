const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
/**
 * This is auto-generated config file for sequelize-cli. 
 * all the variables will be taken from the `.env. file 
 * 
 * WHICH CONFIG TO RUN SEQUELIZE-CLI COMMANDS WITH WILL BE 
 * DECIDED BY `NODE_ENV` IN `.ENV` FILE.
 */
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    dialect: "mysql",
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    dialect: "mysql",
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: "mysql",
  },
};
